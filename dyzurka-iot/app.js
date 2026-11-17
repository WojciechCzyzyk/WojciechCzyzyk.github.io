let currentUser = null;
let wardState = null;
let activePatientId = null;
let draggedPatientId = null;
let isDragging = false;

function nowStamp() {
  const d = new Date();
  const pad = n => String(n).padStart(2, "0");
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

async function login() {
  const uKey = document.getElementById("login-user").value;
  const pin = document.getElementById("login-pin").value.trim();
  const user = USERS[uKey];
  if (!user || user.pin !== pin) return alert("Błędny kod PIN!");

  currentUser = user;
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("ward-screen").classList.remove("hidden");
  document.getElementById("current-user-badge").textContent = `${user.name} (${user.label})`;
  document.getElementById("admit-panel").classList.toggle("hidden", user.role === "opiekun");
  await refreshBoard();
}

function logout() { location.reload(); }

async function refreshBoard() {
  wardState = await WardDB.load();
  renderRooms();
  renderLogs();
  ["new-room", "transfer-room"].forEach(id => {
    const sel = document.getElementById(id);
    if (sel) sel.innerHTML = wardState.rooms.map(r => `<option value="${r}">${r}</option>`).join("");
  });
}

function canAcceptPatient(room) {
  const cfg = ROOM_CONFIG[room] || { standard: 3, max: 4 };
  const count = wardState.patients.filter(p => p.room === room).length;
  return count < cfg.max;
}

function renumberBeds(room) {
  const cfg = ROOM_CONFIG[room] || { standard: 3, max: 4 };
  const roomPats = wardState.patients.filter(p => p.room === room);
  roomPats.forEach((p, idx) => {
    const pos = idx + 1;
    p.bed = pos > cfg.standard ? `Dostawka ${pos}` : `Łóżko ${pos}`;
  });
}

function onDragStart(ev, patId) {
  if (currentUser.role === "opiekun") return ev.preventDefault();
  isDragging = true;
  draggedPatientId = patId;
  ev.dataTransfer.setData("text/plain", patId);
}

function onDragEnd() { setTimeout(() => { isDragging = false; }, 120); }

async function onDropTarget(ev, targetRoom, targetPatId = null) {
  ev.preventDefault();
  ev.stopPropagation();
  const patId = draggedPatientId || ev.dataTransfer.getData("text/plain");
  draggedPatientId = null;
  setTimeout(() => { isDragging = false; }, 120);
  if (!patId || currentUser.role === "opiekun" || patId === targetPatId) return;

  const pat = wardState.patients.find(p => p.id === patId);
  if (!pat) return;

  const oldRoom = pat.room;
  const oldLoc = `${pat.room} / ${pat.bed}`;

  if (oldRoom !== targetRoom && !canAcceptPatient(targetRoom)) {
    const cfg = ROOM_CONFIG[targetRoom];
    return alert(`⛔ Blokada miejsc (Poka-Yoke): ${targetRoom} ma maksymalny limit ${cfg.max} łóżek!`);
  }

  // Wyciągamy pacjenta z obecnej pozycji i wstawiamy w docelowe miejsce
  wardState.patients = wardState.patients.filter(p => p.id !== patId);
  pat.room = targetRoom;

  if (targetPatId) {
    const targetIdx = wardState.patients.findIndex(p => p.id === targetPatId);
    if (targetIdx !== -1) {
      wardState.patients.splice(targetIdx, 0, pat);
    } else {
      wardState.patients.push(pat);
    }
  } else {
    wardState.patients.push(pat);
  }

  renumberBeds(oldRoom);
  if (oldRoom !== targetRoom) renumberBeds(targetRoom);

  const actionMsg = oldRoom === targetRoom
    ? `${currentUser.name} zamienił kolejność łóżek w ${targetRoom} (${pat.name} ➔ ${pat.bed}).`
    : `${currentUser.name} przeniósł ${pat.name} z ${oldLoc} do ${targetRoom} (${pat.bed}).`;

  pat.history.push({ date: nowStamp(), type: "ruch", author: currentUser.name, comment: `🔄 ${actionMsg}` });
  wardState.logs.unshift({ time: nowStamp(), text: actionMsg, alert: false });
  await WardDB.save(wardState);
  await refreshBoard();
}

function renderRooms() {
  const canDrag = currentUser.role !== "opiekun";
  document.getElementById("rooms-container").innerHTML = wardState.rooms.map(room => {
    const cfg = ROOM_CONFIG[room] || { standard: 3, max: 4 };
    const pats = wardState.patients.filter(p => p.room === room);
    const isFull = pats.length >= cfg.max;
    const isExtra = pats.length > cfg.standard;

    const cards = pats.map(p => {
      const m = p.history.filter(h => h.type === "pomiar");
      const v = m.length ? m[m.length - 1] : null;
      const st = !v ? "" : (v.temp >= 38 || v.sys >= 150 || v.dia >= 95 || v.pulse >= 100) ? "status-alert" : (v.temp >= 37.3 || v.sys >= 138) ? "status-warn" : "status-ok";
      return `
        <div class="bed-card ${st}" draggable="${canDrag}" ondragstart="onDragStart(event, '${p.id}')" ondragend="onDragEnd()" ondragover="event.preventDefault()" ondrop="onDropTarget(event, '${room}', '${p.id}')" ondblclick="openPatientModal('${p.id}')" title="2x klik: Karta | Przeciągnij na pacjenta lub salę: zmień łóżko" style="cursor:${canDrag ? "grab" : "pointer"};">
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <strong style="color:var(--accent);">${p.bed} • ${p.name}</strong>
          </div>
          ${v ? `<div class="vitals-grid">
            <div class="vital-item"><div class="vital-num">${v.sys}/${v.dia}</div><div class="vital-lbl">RR</div></div>
            <div class="vital-item"><div class="vital-num">${v.pulse}</div><div class="vital-lbl">Puls</div></div>
            <div class="vital-item"><div class="vital-num">${v.temp}°</div><div class="vital-lbl">Temp</div></div>
          </div>` : `<div style="font-size:0.75rem; color:var(--muted);">Brak pomiarów</div>`}
          ${p.alertNote ? `<div class="note-box">${p.alertNote}</div>` : ""}
        </div>`;
    }).join("") || `<div style="font-size:0.75rem; color:var(--muted); padding:6px;">Wolne (${cfg.standard}-os.)</div>`;

    return `
      <div class="room-section ${isFull ? "room-full" : ""}" ondragover="event.preventDefault()" ondrop="onDropTarget(event, '${room}', null)">
        <div class="room-header">
          <span>🚪 ${room.replace("Sala ", "")}</span>
          <span style="font-size:0.72rem; color:${isFull ? "var(--amber)" : "var(--muted)"};">${pats.length}/${cfg.standard}${isExtra ? " +dost." : ""}</span>
        </div>
        <div class="beds-row">${cards}</div>
      </div>`;
  }).join("");
}

function renderLogs() {
  document.getElementById("logs-container").innerHTML = wardState.logs.map(l =>
    `<div class="log-item ${l.alert ? "alert" : ""}"><div class="log-time">${l.time}</div><div>${l.text}</div></div>`
  ).join("");
}

function toggleAdmitForm() { document.getElementById("admit-form").classList.toggle("hidden"); }

async function admitPatient() {
  const name = document.getElementById("new-name").value.trim();
  const room = document.getElementById("new-room").value;
  const alertNote = document.getElementById("new-alert").value.trim();
  if (!name) return alert("Wpisz inicjały pacjenta!");
  if (!canAcceptPatient(room)) {
    const cfg = ROOM_CONFIG[room];
    return alert(`⛔ Blokada miejsc (Poka-Yoke): ${room} ma maksymalny limit ${cfg.max} łóżek!`);
  }
  const cfg = ROOM_CONFIG[room] || { standard: 3, max: 4 };
  const count = wardState.patients.filter(p => p.room === room).length + 1;
  const bed = document.getElementById("new-bed").value.trim() || (count > cfg.standard ? `Dostawka ${count}` : `Łóżko ${count}`);
  const num = Math.floor(100 + Math.random() * 900);

  wardState.patients.push({ id: `PAT-${num}`, qr: `QR-${room.replace(/\s+/g, "")}-${num}`, name, room, bed, alertNote, medications: "Oczekuje na zlecenie lekarskie", history: [] });
  wardState.logs.unshift({ time: nowStamp(), text: `${currentUser.name} przyjął ${name} (${room} / ${bed}).`, alert: false });
  await WardDB.save(wardState);
  document.getElementById("new-name").value = "";
  await refreshBoard();
}

function openPatientModal(patId) {
  activePatientId = patId;
  const pat = wardState.patients.find(p => p.id === patId);
  if (!pat) return;
  document.getElementById("modal-pat-name").textContent = pat.name;
  document.getElementById("modal-pat-loc").textContent = `${pat.room} • ${pat.bed} • Opaska: ${pat.qr}`;

  const medsInput = document.getElementById("modal-meds-input");
  medsInput.value = pat.medications || "";
  medsInput.disabled = currentUser.role !== "lekarz";
  document.getElementById("btn-save-meds").classList.toggle("hidden", currentUser.role !== "lekarz");

  document.getElementById("caregiver-actions").classList.toggle("hidden", currentUser.role !== "opiekun");
  document.getElementById("transfer-box").classList.toggle("hidden", currentUser.role === "opiekun");

  document.getElementById("modal-history-list").innerHTML = [...pat.history].reverse().map(h => `
    <div class="log-item ${h.type === "pomiar" && (h.temp >= 38 || h.sys >= 150) ? "alert" : ""}">
      <div class="log-time">${h.date} • <strong>${h.author}</strong></div>
      ${h.type === "pomiar" ? `<div><strong>Pomiar:</strong> RR ${h.sys}/${h.dia} mmHg | Puls ${h.pulse} bpm | Temp ${h.temp}°C</div>` : ""}
      ${h.comment ? `<div>${h.comment}</div>` : ""}
    </div>`).join("") || `<div style="color:var(--muted);">Brak zapisów.</div>`;

  renderChart(pat);
  document.getElementById("patient-modal").classList.remove("hidden");
}

function closeModal() { document.getElementById("patient-modal").classList.add("hidden"); }

async function saveMedications() {
  if (currentUser.role !== "lekarz") return;
  const pat = wardState.patients.find(p => p.id === activePatientId);
  pat.medications = document.getElementById("modal-meds-input").value.trim();
  pat.history.push({ date: nowStamp(), type: "zlecenie", author: currentUser.name, comment: `💊 Zlecenie leków: ${pat.medications}` });
  wardState.logs.unshift({ time: nowStamp(), text: `${currentUser.name} zmienił zlecenia dla ${pat.name}.`, alert: false });
  await WardDB.save(wardState);
  openPatientModal(pat.id);
  renderLogs();
}

async function logCareAction(txt) {
  const pat = wardState.patients.find(p => p.id === activePatientId);
  pat.history.push({ date: nowStamp(), type: "opieka", author: currentUser.name, comment: `🤝 ${txt}` });
  wardState.logs.unshift({ time: nowStamp(), text: `${currentUser.name} (${pat.room}): ${txt}.`, alert: false });
  await WardDB.save(wardState);
  openPatientModal(pat.id);
  renderLogs();
}

async function transferPatient() {
  const pat = wardState.patients.find(p => p.id === activePatientId);
  const nr = document.getElementById("transfer-room").value;
  if (pat.room !== nr && !canAcceptPatient(nr)) {
    const cfg = ROOM_CONFIG[nr];
    return alert(`⛔ Blokada miejsc (Poka-Yoke): ${nr} ma maksymalny limit ${cfg.max} łóżek!`);
  }
  const nb = document.getElementById("transfer-bed").value.trim() || "Łóżko 1";
  const old = `${pat.room} / ${pat.bed}`;
  pat.room = nr; pat.bed = nb;
  pat.history.push({ date: nowStamp(), type: "ruch", author: currentUser.name, comment: `🔄 Przeniesiono z ${old} do ${nr} / ${nb}.` });
  wardState.logs.unshift({ time: nowStamp(), text: `${currentUser.name} przeniósł ${pat.name} do ${nr} / ${nb}.`, alert: false });
  await WardDB.save(wardState);
  closeModal();
  await refreshBoard();
}

async function dischargePatient() {
  const pat = wardState.patients.find(p => p.id === activePatientId);
  if (!confirm(`Wypisać pacjenta ${pat.name}?`)) return;
  const oldRoom = pat.room;
  wardState.patients = wardState.patients.filter(p => p.id !== activePatientId);
  renumberBeds(oldRoom);
  wardState.logs.unshift({ time: nowStamp(), text: `🚪 ${currentUser.name} wypisał ${pat.name}.`, alert: false });
  await WardDB.save(wardState);
  closeModal();
  await refreshBoard();
}


function renderChart(pat) {
  const canvas = document.getElementById("vitalsChart");
  const pts = pat.history.filter(h => h.type === "pomiar");
  if (!pts.length) {
    canvas.outerHTML = `<div id="vitalsChart" style="color:var(--muted); padding:12px;">Brak pomiarów do wykreślenia.</div>`;
    return;
  }
  const w = 760, h = 160, pad = 35, maxVal = 180, minVal = 40;
  const xStep = pts.length > 1 ? (w - pad * 2) / (pts.length - 1) : 0;
  const getY = val => h - pad - ((Math.min(maxVal, Math.max(minVal, val)) - minVal) / (maxVal - minVal)) * (h - pad * 2);

  const sysPts = pts.map((p, i) => `${pad + i * xStep},${getY(p.sys)}`).join(" ");
  const diaPts = pts.map((p, i) => `${pad + i * xStep},${getY(p.dia)}`).join(" ");
  const pulsePts = pts.map((p, i) => `${pad + i * xStep},${getY(p.pulse)}`).join(" ");

  const labels = pts.map((p, i) => `<text x="${pad + i * xStep}" y="${h - 8}" fill="#94a3b8" font-size="10" text-anchor="middle">${p.date}</text>`).join("");
  const dots = pts.map((p, i) => `
    <circle cx="${pad + i * xStep}" cy="${getY(p.sys)}" r="4" fill="#ef4444"/><text x="${pad + i * xStep}" y="${getY(p.sys) - 7}" fill="#ef4444" font-size="10" text-anchor="middle">${p.sys}</text>
    <circle cx="${pad + i * xStep}" cy="${getY(p.dia)}" r="4" fill="#38bdf8"/><text x="${pad + i * xStep}" y="${getY(p.dia) + 14}" fill="#38bdf8" font-size="10" text-anchor="middle">${p.dia}</text>
  `).join("");

  canvas.outerHTML = `
    <svg id="vitalsChart" viewBox="0 0 ${w} ${h}" style="width:100%; height:auto; display:block;">
      <line x1="${pad}" y1="${getY(140)}" x2="${w - pad}" y2="${getY(140)}" stroke="#ef4444" stroke-dasharray="4" stroke-opacity="0.4"/>
      <polyline fill="none" stroke="#ef4444" stroke-width="2.5" points="${sysPts}"/>
      <polyline fill="none" stroke="#38bdf8" stroke-width="2.5" points="${diaPts}"/>
      <polyline fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="3" points="${pulsePts}"/>
      ${dots}${labels}
    </svg>
    <div style="font-size:0.75rem; color:var(--muted); margin-top:4px;">🔴 SYS (mmHg) &nbsp;|&nbsp; 🔵 DIA (mmHg) &nbsp;|&nbsp; 🟢 Puls (bpm) &nbsp;|&nbsp; Linia: próg 140 mmHg</div>`;
}

function generateShiftReport() {
  const lines = [`=== 🤖 RAPORT ZMIANY AI (${nowStamp()}) ===`, `Autor: ${currentUser.name}\n`];
  wardState.patients.forEach(p => {
    const m = p.history.filter(h => h.type === "pomiar");
    const v = m.length ? m[m.length - 1] : null;
    const st = v ? `RR ${v.sys}/${v.dia}, Puls ${v.pulse}, Temp ${v.temp}°C (${v.date}, ${v.author})` : "Brak pomiarów";
    const warn = (v && (v.temp >= 38 || v.sys >= 150)) ? " ⚠️ PILNA UWAGA LEKARZA!" : " ✅ Stabilny";
    lines.push(`• ${p.room} / ${p.bed} — ${p.name}:${warn}\n  Pomiar: ${st}\n  Leki: ${p.medications || "brak"}\n`);
  });
  document.getElementById("report-content").textContent = lines.join("\n");
  document.getElementById("report-modal").classList.remove("hidden");
}

async function resetDemoData() {
  if (!confirm("Przywrócić dane startowe?")) return;
  localStorage.removeItem("apex_ward_db_v3");
  await refreshBoard();
}

setInterval(() => { if (currentUser && !isDragging) refreshBoard(); }, 4000);

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

async function initLoginList() {
  wardState = await WardDB.load();
  const sel = document.getElementById("login-user");
  if (!sel || !wardState.users) return;
  sel.innerHTML = Object.entries(wardState.users)
    .map(([key, u]) => `<option value="${key}">${u.name} (${u.label})</option>`)
    .join("");
}

window.addEventListener("DOMContentLoaded", initLoginList);

async function login() {
  if (!wardState) wardState = await WardDB.load();
  const uKey = document.getElementById("login-user").value;
  const pin = document.getElementById("login-pin").value.trim();
  const usersMap = wardState.users || USERS;
  const user = usersMap[uKey];
  if (!user || user.pin !== pin) return alert("Błędny kod PIN!");

  currentUser = user;
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("ward-screen").classList.remove("hidden");
  document.getElementById("current-user-badge").textContent = `${user.name} (${user.label})`;
  document.getElementById("admit-panel").classList.toggle("hidden", user.role === "opiekun");
  const staffBtn = document.getElementById("btn-staff-modal");
  if (staffBtn) staffBtn.classList.toggle("hidden", user.role === "opiekun");
  const roundsBtn = document.getElementById("btn-rounds-modal");
  if (roundsBtn) roundsBtn.classList.toggle("hidden", user.role !== "lekarz");

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
  const num = Math.floor(100 + Math.random() * 900);
  wardState.patients.push({
    id: `PAT-${num}`,
    qr: `QR-${room.replace(/\s+/g, "")}-${num}`,
    name,
    room,
    bed: "Łóżko 1",
    alertNote,
    medications: "Oczekuje na zlecenie lekarskie",
    history: []
  });
  renumberBeds(room);
  const addedPat = wardState.patients[wardState.patients.length - 1];
  wardState.logs.unshift({ time: nowStamp(), text: `${currentUser.name} przyjął ${name} (${room} / ${addedPat.bed}).`, alert: false });
  await WardDB.save(wardState);
  document.getElementById("new-name").value = "";
  document.getElementById("new-alert").value = "";
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

  renderPatientTasksInModal(pat);
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
  addTaskToPatient(pat, pat.medications, currentUser.name);
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
  const oldRoom = pat.room;
  const old = `${pat.room} / ${pat.bed}`;
  pat.room = nr;
  renumberBeds(oldRoom);
  if (oldRoom !== nr) renumberBeds(nr);

  pat.history.push({ date: nowStamp(), type: "ruch", author: currentUser.name, comment: `🔄 Przeniesiono z ${old} do ${nr} / ${pat.bed}.` });
  wardState.logs.unshift({ time: nowStamp(), text: `${currentUser.name} przeniósł ${pat.name} do ${nr} / ${pat.bed}.`, alert: false });
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

function openStaffModal() {
  if (currentUser.role === "opiekun") return;
  renderStaffList();
  document.getElementById("staff-modal").classList.remove("hidden");
}

function renderStaffList() {
  const box = document.getElementById("staff-list-box");
  const usersMap = wardState.users || {};
  box.innerHTML = Object.entries(usersMap).map(([key, u]) => `
    <div class="log-item" style="display:flex; justify-content:space-between; align-items:center;">
      <div><strong>${u.name}</strong> • <span style="color:var(--accent);">${u.label}</span> <span style="color:var(--muted); font-size:0.78rem;">(PIN: ${u.pin})</span></div>
      ${["lekarz", "dyzurka", "opiekun"].includes(key) ? `<span style="font-size:0.75rem; color:var(--muted);">Konto bazowe</span>` : `<button class="btn btn-sm btn-red" onclick="removeStaffMember('${key}')">Usuń</button>`}
    </div>`).join("");
}

async function addStaffMember() {
  const name = document.getElementById("staff-name").value.trim();
  const role = document.getElementById("staff-role").value;
  const pin = document.getElementById("staff-pin").value.trim();
  if (!name || pin.length < 4) return alert("Wpisz imię/tytuł oraz 4-cyfrowy kod PIN!");

  const roleLabels = { lekarz: "Lekarz Dyżurny", pielegniarka: "Pielęgniarka", opiekun: "Opiekun Medyczny" };
  const key = `staff_${Date.now()}`;
  if (!wardState.users) wardState.users = { ...USERS };
  wardState.users[key] = { pin, name, role, label: roleLabels[role] };

  wardState.logs.unshift({ time: nowStamp(), text: `👥 ${currentUser.name} dodał pracownika: ${name} (${roleLabels[role]}).`, alert: false });
  await WardDB.save(wardState);
  document.getElementById("staff-name").value = "";
  document.getElementById("staff-pin").value = "";
  renderStaffList();
  renderLogs();
}

async function removeStaffMember(key) {
  if (!confirm("Usunąć to konto pracownika?")) return;
  const removed = wardState.users[key];
  delete wardState.users[key];
  wardState.logs.unshift({ time: nowStamp(), text: `👥 ${currentUser.name} usunął konto: ${removed ? removed.name : key}.`, alert: false });
  await WardDB.save(wardState);
  renderStaffList();
  renderLogs();
}
function openRoundsModal() {
  if (currentUser.role !== "lekarz") return;
  const docSel = document.getElementById("rounds-doctor-select");
  const doctors = Object.values(wardState.users || USERS).filter(u => u.role === "lekarz");
  docSel.innerHTML = doctors.map(d => `<option value="${d.name}" ${d.name === currentUser.name ? "selected" : ""}>👨‍⚕️ ${d.name}</option>`).join("");

  const listBox = document.getElementById("rounds-patients-list");
  listBox.innerHTML = wardState.patients.map(p => {
    const m = p.history.filter(h => h.type === "pomiar");
    const v = m.length ? m[m.length - 1] : null;
    const vitalsTxt = v ? `RR: ${v.sys}/${v.dia} | Puls: ${v.pulse} | Temp: ${v.temp}°C` : "Brak pomiarów";
    return `
      <div style="background:var(--card); border:1px solid var(--border); border-radius:10px; padding:12px; display:grid; grid-template-columns: 220px 1fr auto; gap:10px; align-items:center;">
        <div>
          <strong style="color:var(--accent);">${p.room} • ${p.bed}</strong><br>
          <span style="font-weight:700;">${p.name}</span><br>
          <span style="font-size:0.75rem; color:var(--muted);">${vitalsTxt}</span>
        </div>
        <div>
          <label style="font-size:0.75rem;">Leki, uwagi i zalecenia po obchodzie:</label>
          <input id="round-meds-${p.id}" value="${(p.medications || "").replace(/"/g, "&quot;")}" placeholder="Wpisz ordynację leków i uwagi...">
        </div>
        <button class="btn btn-green btn-sm" style="margin-top:16px;" onclick="saveRoundNote('${p.id}')">💾 Zapisz</button>
      </div>`;
  }).join("") || `<div style="color:var(--muted);">Brak pacjentów na oddziale.</div>`;

  document.getElementById("rounds-modal").classList.remove("hidden");
}

async function saveRoundNote(patId) {
  const pat = wardState.patients.find(p => p.id === patId);
  if (!pat) return;
  const docName = document.getElementById("rounds-doctor-select").value || currentUser.name;
  const newMeds = document.getElementById(`round-meds-${patId}`).value.trim();

  pat.medications = newMeds;
  pat.history.push({ date: nowStamp(), type: "zlecenie", author: docName, comment: `🩺 Obchód lekarski (${docName}): ${newMeds}` });
  wardState.logs.unshift({ time: nowStamp(), text: `🩺 ${docName} zapisał zalecenia po obchodzie dla ${pat.name} (${pat.room}).`, alert: false });

  addTaskToPatient(pat, newMeds, docName);
  await WardDB.save(wardState);
  renderLogs();
  alert(`✅ Zapisano zalecenia dla ${pat.name} (podpis: ${docName})`);
}


setInterval(() => { if (currentUser && !isDragging) refreshBoard(); }, 4000);

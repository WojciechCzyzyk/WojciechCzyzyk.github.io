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


function formatVitalsLine(v) {
  if (!v) return "";
  const parts = [];
  if (Number(v.sys) > 0 && Number(v.dia) > 0) parts.push(`RR <strong>${v.sys}/${v.dia}</strong> mmHg`);
  if (Number(v.pulse) > 0) parts.push(`Puls <strong>${v.pulse}</strong> bpm`);
  if (Number(v.temp) > 0) parts.push(`Temp <strong>${v.temp}°C</strong>`);
  return parts.join(", ");
}

function getLatestNonZeroVitals(historyList) {
  const m = historyList.filter(h => h.type === "pomiar");
  if (!m.length) return null;
  const pick = (key) => {
    for (let i = m.length - 1; i >= 0; i--) {
      if (Number(m[i][key]) > 0) return m[i][key];
    }
    return 0;
  };
  const sys = pick("sys"), dia = pick("dia"), pulse = pick("pulse"), temp = pick("temp");
  if (!sys && !dia && !pulse && !temp) return null;
  return { sys, dia, pulse, temp, date: m[m.length - 1].date };
}


async function initLoginList() {
  WardDB.trackVisit("Otwarcie strony logowania (Tablica)");
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
  WardDB.trackVisit("Logowanie na Tablicę", `${user.name} (${user.label})`);

 
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

  const noteArea = document.getElementById("modal-general-note");
  if (noteArea) {
    noteArea.value = pat.generalNote || "";
    noteArea.disabled = currentUser.role === "opiekun";
  }
  const saveNoteBtn = document.getElementById("btn-save-general-note");
  if (saveNoteBtn) saveNoteBtn.classList.toggle("hidden", currentUser.role === "opiekun");


  
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

function closeModal() {
  flushTaskTimers();
  document.getElementById("patient-modal").classList.add("hidden");
}


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

async function saveGeneralNote() {
  if (currentUser.role === "opiekun") return;
  const pat = wardState.patients.find(p => p.id === activePatientId);
  if (!pat) return;
  pat.generalNote = document.getElementById("modal-general-note").value.trim();
  pat.history.push({ date: nowStamp(), type: "notatka", author: currentUser.name, comment: `📝 Zaktualizowano opis ogólny pacjenta.` });
  wardState.logs.unshift({ time: nowStamp(), text: `📝 ${currentUser.name} zaktualizował opis ogólny dla ${pat.name} (${pat.room}).`, alert: false });
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

let selectedShiftTeam = new Set();

function renderReportTeamChips() {
  const box = document.getElementById("rep-team-chips");
  if (!box) return;
  if (selectedShiftTeam.size === 0 && currentUser) selectedShiftTeam.add(currentUser.name);

  const allUsers = Object.values(wardState.users || USERS);
  box.innerHTML = allUsers.map(u => {
    const active = selectedShiftTeam.has(u.name);
    return `
      <button type="button" onclick="toggleShiftMember('${u.name.replace(/'/g, "\\'")}')"
        style="cursor:pointer; padding:5px 10px; border-radius:999px; font-size:0.78rem; font-weight:700; border:1px solid ${active ? "var(--green)" : "var(--border)"}; background:${active ? "rgba(16,185,129,0.2)" : "var(--panel)"}; color:${active ? "#34d399" : "var(--muted)"};">
        ${active ? "✓ " : "+ "}${u.name} (${u.label})
      </button>`;
  }).join("");
}

function toggleShiftMember(name) {
  if (selectedShiftTeam.has(name)) selectedShiftTeam.delete(name);
  else selectedShiftTeam.add(name);
  generateShiftReport();
}

function generateShiftReport() {
  renderReportTeamChips();
  const teamList = selectedShiftTeam.size ? [...selectedShiftTeam].join(", ") : currentUser.name;

  const headerHtml = `
    <div style="border-bottom:1px solid var(--border); padding-bottom:10px; margin-bottom:14px;">
      <strong style="font-size:1.05rem; color:var(--accent);">📋 RAPORT ZDANIA DYŻURU — PRZEKAZANIE ZMIANY (${nowStamp()})</strong><br>
      <div style="margin-top:4px; font-size:0.85rem;">
        <span>Osoba zdająca i drukująca raport: <strong style="color:var(--green);">${currentUser.name}</strong></span><br>
        <span>Skład zespołu kończącego zmianę: <strong>${teamList}</strong> • Liczba pacjentów: <strong>${wardState.patients.length}</strong></span>
      </div>
    </div>`;

  const cardsHtml = wardState.patients.map(p => {
    const m = p.history.filter(h => h.type === "pomiar");
    const v = m.length ? m[m.length - 1] : null;
    const isAlert = v && (v.temp >= 38 || v.sys >= 150 || v.dia >= 95);
    const vitalsStr = v ? `RR ${v.sys}/${v.dia} mmHg | Puls ${v.pulse} bpm | Temp ${v.temp}°C (${v.date})` : "Brak pomiarów na dyżurze";

    const tasks = ensureTasks(p);
    const doneTasks = tasks.filter(t => t.status === "done").map(t => `<li>🟢 ${t.text} <span style="color:var(--muted);">(${t.updatedBy || "wykonano"})</span></li>`);
    const careEvents = p.history.filter(h => h.type === "opieka" || h.type === "ruch").slice(-3).map(h => `<li>${h.comment} <span style="color:var(--muted);">(${h.date}, ${h.author})</span></li>`);
    const doneHtml = [...doneTasks, ...careEvents].join("") || `<li style="color:var(--muted);">Brak odnotowanych zabiegów na tym dyżurze</li>`;

    const todoTasks = tasks.filter(t => t.status !== "done").map(t => {
      const tag = t.status === "progress" ? "🟡 W trakcie" : "🔴 Do zrobienia";
      return `<li><strong>${tag}:</strong> ${t.text}</li>`;
    }).join("") || `<li style="color:var(--muted);">Wszystkie bieżące zlecenia wykonane</li>`;

    return `
      <div style="background:var(--card); border:1px solid ${isAlert ? "var(--red)" : "var(--border)"}; border-radius:10px; padding:12px; margin-bottom:12px; page-break-inside:avoid;">
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:8px;">
          <strong style="color:var(--accent); font-size:0.98rem;">${p.room} • ${p.bed} — ${p.name}</strong>
          <span style="font-weight:700; color:${isAlert ? "var(--red)" : "var(--green)"};">${isAlert ? "⚠️ PILNA OBSERWACJA" : "✅ Stan stabilny"}</span>
        </div>
        <div style="font-size:0.82rem; margin-bottom:8px;"><strong>Ostatnie parametry:</strong> ${vitalsStr} ${p.alertNote ? `| <span style="color:#fbbf24;">⚠️ ${p.alertNote}</span>` : ""}</div>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
          <div>
            <strong style="color:var(--green); font-size:0.82rem;">✅ CO ZROBIONO NA DYŻURZE:</strong>
            <ul style="margin:4px 0 0 16px; padding:0; font-size:0.8rem;">${doneHtml}</ul>
          </div>
          <div>
            <strong style="color:#fbbf24; font-size:0.82rem;">📌 DO ZROBIENIA (DLA KOLEJNEJ ZMIANY):</strong>
            <ul style="margin:4px 0 0 16px; padding:0; font-size:0.8rem;">${todoTasks}</ul>
          </div>
        </div>
      </div>`;
  }).join("");

  document.getElementById("report-content").innerHTML = headerHtml + cardsHtml;
  document.getElementById("report-modal").classList.remove("hidden");
}


function printShiftReport() {
  const content = document.getElementById("report-content").innerHTML;
  const win = window.open("", "_blank", "width=850,height=900");
  win.document.write(`
    <html><head><title>Raport Zdania Dyżuru — Smart Ward Board</title>
    <style>
      body { font-family: Arial, sans-serif; color: #0f172a; padding: 20px; }
      div { border-color: #cbd5e1 !important; background: #fff !important; color: #0f172a !important; }
      strong { color: #0f172a !important; }
    </style></head><body>${content}</body></html>`);
  win.document.close();
  win.focus();
  win.print();
}

async function copyReportToHIS() {
  const box = document.getElementById("report-content");
  if (!box) return;
  const plainText = box.innerText.replace(/\n{3,}/g, "\n\n").trim();
  try {
    await navigator.clipboard.writeText(plainText);
    alert("✅ Skopiowano czysty raport do schowka! Możesz go teraz wkleić (Ctrl + V) bezpośrednio do głównego systemu HIS.");
  } catch (e) {
    alert("Zaznacz tekst w oknie raportu i wciśnij Ctrl + C.");
  }
}

function printShiftReport() {
  const content = document.getElementById("report-content").innerHTML;
  const win = window.open("", "_blank", "width=850,height=900");
  win.document.write(`
    <html><head><title>Raport Zdania Dyżuru — Smart Ward Board</title>
    <style>
      body { font-family: Arial, sans-serif; color: #0f172a; padding: 20px; }
      div { border-color: #cbd5e1 !important; background: #fff !important; color: #0f172a !important; }
      strong { color: #0f172a !important; }
    </style></head><body>${content}</body></html>`);
  win.document.close();
  win.focus();
  win.print();
}


async function resetDemoData() {
  if (!confirm("Przywrócić dane startowe w całej bazie?")) return;
  localStorage.removeItem("apex_ward_db_v3");
  await WardDB.save(WardDB.getDefaultData());
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
         
          ${buildProcedureSelectHtml("round-meds-" + p.id)}
          <input id="round-meds-${p.id}" value="${(p.medications || "").replace(/"/g, "&quot;")}" placeholder="Wpisz ordynację leków i uwagi...">
          
          <input id="round-note-${p.id}" value="${(p.generalNote || "").replace(/"/g, "&quot;")}" placeholder="Opis ogólny / rozpoznanie / stan z obchodu (nie trafia do leków)..." style="margin-top:6px; border-color:#38bdf8;">

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

  const newNote = document.getElementById(`round-note-${patId}`)?.value.trim() || "";
  pat.generalNote = newNote;


  pat.medications = newMeds;
  pat.history.push({ date: nowStamp(), type: "zlecenie", author: docName, comment: `🩺 Obchód lekarski (${docName}): ${newMeds}` });
  wardState.logs.unshift({ time: nowStamp(), text: `🩺 ${docName} zapisał zalecenia po obchodzie dla ${pat.name} (${pat.room}).`, alert: false });

  addTaskToPatient(pat, newMeds, docName);
  learnNewProcedure(newMeds);
  
  await WardDB.save(wardState);
  renderLogs();
  alert(`✅ Zapisano zalecenia dla ${pat.name} (podpis: ${docName})`);
}

function ensureTasks(pat) {
  if (!Array.isArray(pat.tasks)) {
    pat.tasks = pat.medications && !pat.medications.startsWith("Oczekuje")
      ? [{ id: `TSK-${pat.id}-0`, text: pat.medications, status: "todo", author: "Lekarz", updatedBy: "" }]
      : [];
  }
  return pat.tasks;
}

function addTaskToPatient(pat, text, author) {
  if (!text) return;
  const tasks = ensureTasks(pat);
  tasks.unshift({ id: `TSK-${Date.now()}`, text, status: "todo", author, updatedBy: "" });
}

function getTaskBadge(status) {
  if (status === "done") return { label: "🟢 Zrobione", bg: "rgba(16,185,129,0.2)", border: "#10b981", color: "#34d399" };
  if (status === "progress") return { label: "🟡 W przygotowaniu", bg: "rgba(245,158,11,0.2)", border: "#f59e0b", color: "#fbbf24" };
  return { label: "🔴 Do zrobienia", bg: "rgba(239,68,68,0.2)", border: "#ef4444", color: "#f87171" };
}

const taskTimers = {};

async function flushTaskTimers() {
  const pending = Object.values(taskTimers).map(t => t.flushNow());
  await Promise.all(pending);
}

async function closeTasksModal() {
  await flushTaskTimers();
  document.getElementById("tasks-modal").classList.add("hidden");
}


function cycleTaskStatus(patId, taskId, fromBoard = false) {
  if (currentUser.role === "opiekun") return alert("Brak uprawnień do zmiany statusu zleceń lekarskich.");
  const pat = wardState.patients.find(p => p.id === patId);
  if (!pat) return;
  const task = ensureTasks(pat).find(t => t.id === taskId);
  if (!task) return;

  const nextMap = { todo: "progress", progress: "done", done: "todo" };
  task.status = nextMap[task.status] || "todo";
  task.updatedBy = `${currentUser.name} (${nowStamp()})`;

  if (fromBoard) openTasksModal();
  else openPatientModal(patId);

  const timerKey = `${patId}_${taskId}`;
  if (taskTimers[timerKey]) clearTimeout(taskTimers[timerKey].id);

  const commitChange = async () => {
    delete taskTimers[timerKey];
    const stInfo = getTaskBadge(task.status);
    const msg = `📋 Zadanie [${task.text}] ➔ ${stInfo.label}`;
    pat.history.push({ date: nowStamp(), type: "zlecenie", author: currentUser.name, comment: msg });
    wardState.logs.unshift({ time: nowStamp(), text: `${currentUser.name} (${pat.room} / ${pat.name}): ${msg}`, alert: false });
    await WardDB.save(wardState);
    renderLogs();
    if (!document.getElementById("patient-modal").classList.contains("hidden") && activePatientId === patId) {
      openPatientModal(patId);
    }
  };

  taskTimers[timerKey] = {
    id: setTimeout(commitChange, 5000),
    
flushNow: async () => { clearTimeout(taskTimers[timerKey].id); await commitChange(); }

  };
}


async function addCustomTask(patId, fromBoard = false) {
  const input = document.getElementById(`new-task-${patId}`);
  const txt = input ? input.value.trim() : "";
  if (!txt) return;
  const pat = wardState.patients.find(p => p.id === patId);
  addTaskToPatient(pat, txt, currentUser.name);

  const learned = learnNewProcedure(txt);
  if (learned) {
    wardState.logs.unshift({ time: nowStamp(), text: `🧠 Słownik AI: Zapamiętano nowy szablon „${learned}” na liście szybkiego wyboru.`, alert: false });
  }

  wardState.logs.unshift({ time: nowStamp(), text: `📌 ${currentUser.name} dodał zadanie dla ${pat.name}: ${txt}`, alert: false });
  await WardDB.save(wardState);
  renderLogs();
  if (fromBoard) openTasksModal();
  else openPatientModal(patId);
}


function renderPatientTasksInModal(pat) {
  const box = document.getElementById("modal-tasks-box");
  if (!box) return;
  const tasks = ensureTasks(pat);
  const itemsHtml = tasks.map(t => {
    const b = getTaskBadge(t.status);
    return `
      <div onclick="cycleTaskStatus('${pat.id}', '${t.id}', false)" title="Kliknij, aby zmienić status Kanban" style="cursor:pointer; background:${b.bg}; border:1px solid ${b.border}; border-radius:8px; padding:8px 10px; display:flex; justify-content:space-between; align-items:center; gap:8px;">
        <div>
          <strong style="color:#f8fafc; font-size:0.86rem;">${t.text}</strong>
          <div style="font-size:0.72rem; color:var(--muted);">Zlecił: ${t.author}${t.updatedBy ? ` • Zmiana: ${t.updatedBy}` : ""}</div>
        </div>
        <span style="color:${b.color}; font-weight:800; font-size:0.78rem; white-space:nowrap;">${b.label}</span>
      </div>`;
  }).join("") || `<div style="font-size:0.8rem; color:var(--muted);">Brak przypisanych zadań.</div>`;

  box.innerHTML = `
    <label style="color:#fbbf24; font-weight:700; margin-bottom:8px;">📌 Zadania i Zlecenia Pacjenta (kliknij kafelek, aby przełączyć status):</label>
    <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:8px;">${itemsHtml}</div>
    ${buildProcedureSelectHtml("new-task-" + pat.id)}
    <div style="display:flex; gap:6px;">
      <input id="new-task-${pat.id}" placeholder="Dopisz dawkę lub nowe zadanie...">
      <button class="btn btn-sm" onclick="addCustomTask('${pat.id}', false)">➕ Dodaj</button>
    </div>`;
}

let currentTasksFilter = "all";

function setTasksFilter(filterVal) {
  currentTasksFilter = filterVal;
  document.querySelectorAll("#tasks-filter-bar button").forEach(btn => {
    const isActive = btn.dataset.filter === filterVal;
    btn.classList.toggle("btn-outline", !isActive);
  });
  openTasksModal();
}

function openTasksModal() {
  const listBox = document.getElementById("tasks-board-list");
  const filteredPatients = wardState.patients.filter(p => {
    if (currentTasksFilter === "all") return true;
    return ensureTasks(p).some(t => t.status === currentTasksFilter);
  });

  listBox.innerHTML = filteredPatients.map(p => {
    const tasks = ensureTasks(p).filter(t => currentTasksFilter === "all" || t.status === currentTasksFilter);
    const pills = tasks.map(t => {
      const b = getTaskBadge(t.status);
      return `
        <div onclick="cycleTaskStatus('${p.id}', '${t.id}', true)" style="cursor:pointer; background:${b.bg}; border:1px solid ${b.border}; border-radius:8px; padding:6px 10px; display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:5px;">
          <span style="font-size:0.84rem; color:#f8fafc;">${t.text}</span>
          <span style="color:${b.color}; font-weight:800; font-size:0.75rem; white-space:nowrap;">${b.label}</span>
        </div>`;
    }).join("") || `<div style="font-size:0.78rem; color:var(--muted); margin-bottom:6px;">Brak aktywnych zadań</div>`;

    return `
      <div style="background:var(--card); border:1px solid var(--border); border-radius:10px; padding:12px; display:grid; grid-template-columns: 200px 1fr; gap:12px; align-items:start;">
        <div>
          <strong style="color:var(--accent);">${p.room} • ${p.bed}</strong><br>
          <span style="font-weight:700;">${p.name}</span><br>
          <span style="font-size:0.74rem; color:var(--muted);">${p.alertNote || ""}</span>
        </div>
        <div>
          ${pills}
          ${buildProcedureSelectHtml("new-task-" + p.id)}
          <div style="display:flex; gap:6px; margin-top:6px;">
            <input id="new-task-${p.id}" placeholder="Dopisz dawkę lub nowe zadanie..." style="padding:6px 8px; font-size:0.82rem;">
            <button class="btn btn-sm" onclick="addCustomTask('${p.id}', true)">➕ Dodaj</button>
          </div>
        </div>
      </div>`;
  }).join("") || `<div style="color:var(--muted); padding:10px;">Brak zadań spełniających wybrany filtr.</div>`;

  document.getElementById("tasks-modal").classList.remove("hidden");
}




const BASE_PROCEDURES = [
  "💧 Kroplówka NaCl 0.9%",
  "💧 Kroplówka PWE",
  "💊 Paracetamol",
  "💊 Pyralgina",
  "💉 Założenie / wymiana wenflonu",
  "🩹 Pielęgnacja portu / wkłucia",
  "🩸 Pobranie krwi (morfologia / CRP)",
  "🌡️ Kontrola temp. i RR",
  "⚖️ Bilans płynów (dobowy)"
];

function getProceduresList() {
  if (!Array.isArray(wardState.procedures) || wardState.procedures.length === 0) {
    wardState.procedures = [...BASE_PROCEDURES];
  }
  return wardState.procedures;
}

function extractBaseProcedureName(rawText) {
  let base = rawText
    .replace(/^[\p{Emoji}\s]+/gu, "")
    .replace(/\(.*?\)/g, "")
    .replace(/\b\d+([.,]\d+)?\s*(mg|g|ml|mcg|ug|j\.m\.|jm|%|x\d+|raz|razy|h|godz|dni)\b/gi, "")
    .replace(/\b(i\.v\.|iv|p\.o\.|po|s\.c\.|sc|i\.m\.|im|rano|wieczorem|w południe|doraźnie|na noc|co \d+h)\b/gi, "")
    .replace(/[,;+\-/]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
  const words = base.split(" ").filter(w => w.length > 1 && !/^\d+$/.test(w));
  return words.slice(0, 3).join(" ").trim();
}

function learnNewProcedure(text) {
  const clean = text.trim();
  if (!clean || clean.length < 3 || clean.startsWith("Oczekuje")) return null;
  const baseName = extractBaseProcedureName(clean);
  if (!baseName || baseName.length < 3) return null;

  const list = getProceduresList();
  const exists = list.some(item => {
    const existingBase = extractBaseProcedureName(item).toLowerCase();
    return existingBase === baseName.toLowerCase() || existingBase.includes(baseName.toLowerCase());
  });

  if (!exists) {
    const formattedEntry = `💊 ${baseName.charAt(0).toUpperCase() + baseName.slice(1)}`;
    list.unshift(formattedEntry);
    return formattedEntry;
  }
  return null;
}

function insertProcedureToInput(selectEl, inputId) {
  const val = selectEl.value;
  if (!val) return;
  const inp = document.getElementById(inputId);
  if (!inp) return;
  inp.value = inp.value.trim() ? `${inp.value.trim()}, ${val}` : `${val} `;
  inp.focus();
  selectEl.selectedIndex = 0;
}

function buildProcedureSelectHtml(inputId) {
  const opts = getProceduresList().map(p => `<option value="${p.replace(/"/g, "&quot;")}">${p}</option>`).join("");
  return `
    <select onchange="insertProcedureToInput(this, '${inputId}')" style="margin-bottom:6px; border-color:var(--accent); font-size:0.82rem;">
      <option value="">⚡ Wybierz gotowy zabieg / lek z listy...</option>
      ${opts}
    </select>`;
}


setInterval(() => {
  const anyModalOpen = ["patient-modal", "report-modal", "staff-modal", "rounds-modal", "tasks-modal"]
    .some(id => !document.getElementById(id)?.classList.contains("hidden"));
  const admitOpen = !document.getElementById("admit-form")?.classList.contains("hidden");
  if (currentUser && !isDragging && !anyModalOpen && !admitOpen && Object.keys(taskTimers).length === 0) {
    refreshBoard();
  }
}, 4000);

function printBedQrBadge() {
  const pat = wardState.patients.find(p => p.id === activePatientId);
  if (!pat) return;
  const qrHost = ["api", "qrserver", "com"].join(".");
  const qrImgUrl = `https://${qrHost}/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(pat.qr)}`;
  const win = window.open("", "_blank", "width=520,height=680");
  win.document.write(`
    <html><head><title>Plakietka QR Łóżka — ${pat.name}</title>
    <style>
      body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 95vh; margin: 0; background: #fff; color: #0f172a; }
      .badge { border: 3px solid #0f172a; border-radius: 16px; padding: 28px 32px; text-align: center; width: 340px; }
      .loc { font-size: 22px; font-weight: 800; color: #0284c7; margin-bottom: 6px; }
      .name { font-size: 26px; font-weight: 900; margin-bottom: 16px; }
      .qr { margin: 12px auto; border: 1px solid #cbd5e1; padding: 10px; border-radius: 12px; display: inline-block; }
      .code { font-family: monospace; font-size: 15px; font-weight: 700; letter-spacing: 1px; margin-top: 8px; }
      .note { margin-top: 14px; padding: 8px 12px; background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; font-size: 13px; font-weight: 700; }
      .foot { margin-top: 16px; font-size: 11px; color: #64748b; }
    </style></head><body>
      <div class="badge">
        <div class="loc">${pat.room} • ${pat.bed}</div>
        <div class="name">${pat.name}</div>
        <div class="qr"><img src="${qrImgUrl}" width="200" height="200" alt="QR"></div>
        <div class="code">${pat.qr}</div>
        ${pat.alertNote ? `<div class="note">⚠️ ${pat.alertNote}</div>` : ""}
        <div class="foot">Smart Ward Board • APEX Edge-to-AI (RODO-safe)</div>
      </div>
      <script>window.onload = () => { setTimeout(() => window.print(), 350); };<\/script>
    </body></html>`);
  win.document.close();
}

function generatePatientDayReport() {
  const pat = wardState.patients.find(p => p.id === activePatientId);
  if (!pat) return;
  document.getElementById("patient-modal").classList.add("hidden");
  
  const vitals = pat.history.filter(h => h.type === "pomiar");
  const events = pat.history.filter(h => h.type !== "pomiar");
  const tasks = ensureTasks(pat);

  const vitalsRows = vitals.map(v => `<li><strong>${v.date}</strong> (${v.author}): RR <strong>${v.sys}/${v.dia}</strong> mmHg, Puls <strong>${v.pulse}</strong> bpm, Temp <strong>${v.temp}°C</strong> ${v.comment ? `— <em>${v.comment}</em>` : ""}</li>`).join("")
    || `<li style="color:var(--muted);">Brak pomiarów parametrów życiowych w ciągu doby.</li>`;

  const tasksRows = tasks.map(t => {
    const b = getTaskBadge(t.status);
    return `<li><strong>${b.label}:</strong> ${t.text} <span style="color:var(--muted);">(zlecił: ${t.author}${t.updatedBy ? `, zmiana: ${t.updatedBy}` : ""})</span></li>`;
  }).join("") || `<li style="color:var(--muted);">Brak przypisanych zleceń.</li>`;

  const eventsRows = events.map(e => `<li><strong>${e.date}</strong> (${e.author}): ${e.comment}</li>`).join("")
    || `<li style="color:var(--muted);">Brak dodatkowych zdarzeń pielęgniarskich.</li>`;

  document.getElementById("report-content").innerHTML = `
    <div style="border-bottom:1px solid var(--border); padding-bottom:10px; margin-bottom:14px;">
      <strong style="font-size:1.05rem; color:var(--accent);">📄 INDYWIDUALNY RAPORT DNIA PACJENTA (${nowStamp()})</strong><br>
      <div style="margin-top:4px; font-size:0.86rem;">
        Pacjent: <strong>${pat.name}</strong> • Lokalizacja: <strong>${pat.room} / ${pat.bed}</strong> • Opaska: <code>${pat.qr}</code><br>
        Sporządził: <strong style="color:var(--green);">${currentUser.name}</strong> ${pat.alertNote ? `• <span style="color:#fbbf24;">⚠️ ${pat.alertNote}</span>` : ""}
      </div>
    </div>
    <div style="background:var(--card); border:1px solid var(--border); border-radius:10px; padding:12px; margin-bottom:10px;">
      <strong style="color:#38bdf8;">💓 Chronologia pomiarów z doby:</strong>
      <ul style="margin:6px 0 0 18px; font-size:0.83rem;">${vitalsRows}</ul>
    </div>
    <div style="background:var(--card); border:1px solid var(--border); border-radius:10px; padding:12px; margin-bottom:10px;">
      <strong style="color:#fbbf24;">📌 Realizacja zleceń i leków (Kanban):</strong>
      <ul style="margin:6px 0 0 18px; font-size:0.83rem;">${tasksRows}</ul>
    </div>
    <div style="background:var(--card); border:1px solid var(--border); border-radius:10px; padding:12px;">
      <strong style="color:var(--green);">🕒 Pozostałe zdarzenia, opieka i ruch pacjenta:</strong>
      <ul style="margin:6px 0 0 18px; font-size:0.83rem;">${eventsRows}</ul>
    </div>`;

  document.getElementById("report-modal").classList.remove("hidden");
}

function generateDailyWardReport() {
  renderReportTeamChips();
  const teamList = selectedShiftTeam.size ? [...selectedShiftTeam].join(", ") : currentUser.name;

  // Automatyczna analiza AI wyjątkowych sytuacji z całego dnia na oddziale
  const aiHighlights = [];
  wardState.patients.forEach(p => {
    const vitals = p.history.filter(h => h.type === "pomiar");
    const lastV = vitals.length ? vitals[vitals.length - 1] : null;
    if (lastV) {
      if (lastV.temp >= 38.0) aiHighlights.push(`🔥 <strong>Gorączka (${lastV.temp}°C):</strong> ${p.name} (${p.room}/${p.bed}) o godz. ${lastV.date}.`);
      if (lastV.sys >= 150 || lastV.dia >= 95) aiHighlights.push(`💓 <strong>Podwyższone ciśnienie (${lastV.sys}/${lastV.dia} mmHg):</strong> ${p.name} (${p.room}/${p.bed}) o godz. ${lastV.date}.`);
      if (lastV.pulse >= 100) aiHighlights.push(`⚡ <strong>Tachykardia (${lastV.pulse} bpm):</strong> ${p.name} (${p.room}/${p.bed}).`);
      if (vitals.length >= 2) {
        const prevV = vitals[vitals.length - 2];
        if (lastV.sys - prevV.sys >= 15) aiHighlights.push(`📈 <strong>Nagły skok RR (+${lastV.sys - prevV.sys} mmHg):</strong> ${p.name} (${p.room}/${p.bed}).`);
      }
    }
    const pendingTasks = ensureTasks(p).filter(t => t.status !== "done");
    if (pendingTasks.length > 0) {
      aiHighlights.push(`⏳ <strong>Niezakończone zlecenia (${pendingTasks.length}):</strong> ${p.name} (${p.room}) — ${pendingTasks.map(t => t.text).join(", ")}.`);
    }
    const transfers = p.history.filter(h => h.type === "ruch");
    if (transfers.length > 0) {
      aiHighlights.push(`🔄 <strong>Zmiana sali/łóżka:</strong> ${p.name} — ${transfers[transfers.length - 1].comment.replace(/^🔄\s*/, "")}`);
    }
  });

  const aiSummaryHtml = `
    <div style="background:rgba(139,92,246,0.12); border:1px solid #8b5cf6; border-radius:10px; padding:12px; margin-bottom:14px;">
      <strong style="color:#c4b5fd; font-size:0.92rem;">🤖 PODSUMOWANIE AI — WYJĄTKOWE SYTUACJE DO PRZEKAZANIA ZMIANIE:</strong>
      <ul style="margin:6px 0 0 18px; font-size:0.82rem; line-height:1.45;">
        ${aiHighlights.length ? aiHighlights.map(item => `<li>${item}</li>`).join("") : `<li>✅ Brak incydentów krytycznych — przebieg dnia stabilny u wszystkich pacjentów.</li>`}
      </ul>
    </div>`;

  const patientsBreakdown = wardState.patients.map(p => {
    const vitals = p.history.filter(h => h.type === "pomiar");
    const tasks = ensureTasks(p);
    const otherEvents = p.history.filter(h => h.type !== "pomiar");

    const vitalsTxt = vitals.length
      ? vitals.map(v => `${v.date}: <strong>${v.sys}/${v.dia}</strong>, P:${v.pulse}, T:${v.temp}°C`).join(" &nbsp;|&nbsp; ")
      : "Brak pomiarów";

    const tasksTxt = tasks.length
      ? tasks.map(t => `${getTaskBadge(t.status).label} ${t.text}`).join("<br>")
      : `<span style="color:var(--muted);">Brak zleceń</span>`;

    const eventsTxt = otherEvents.length
      ? otherEvents.slice(-4).map(e => `• ${e.date} (${e.author}): ${e.comment}`).join("<br>")
      : `<span style="color:var(--muted);">Brak wpisów dodatkowych</span>`;

    return `
      <div style="background:var(--card); border:1px solid var(--border); border-radius:10px; padding:11px; margin-bottom:10px; page-break-inside:avoid;">
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding-bottom:5px; margin-bottom:6px;">
          <strong style="color:var(--accent);">${p.room} • ${p.bed} — ${p.name}</strong>
          <span style="font-size:0.78rem; color:#fbbf24;">${p.alertNote ? `⚠️ ${p.alertNote}` : ""}</span>
        </div>
        <div style="font-size:0.8rem; margin-bottom:6px;"><strong>💓 Pomiary dnia:</strong> ${vitalsTxt}</div>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; font-size:0.79rem;">
          <div><strong>📌 Status zadań:</strong><br>${tasksTxt}</div>
          <div><strong>🕒 Przebieg dnia / zdarzenia:</strong><br>${eventsTxt}</div>
        </div>
      </div>`;
  }).join("");

  document.getElementById("report-content").innerHTML = `
    <div style="border-bottom:1px solid var(--border); padding-bottom:10px; margin-bottom:12px;">
      <strong style="font-size:1.05rem; color:var(--green);">📊 ZBIORCZY RAPORT DNIA ODDZIAŁU — PRZEKAZANIE DYŻURU (${nowStamp()})</strong><br>
      <div style="margin-top:4px; font-size:0.84rem;">
        Sporządził: <strong style="color:var(--green);">${currentUser.name}</strong> • Zespół zmiany: <strong>${teamList}</strong> • Pacjentów: <strong>${wardState.patients.length}</strong>
      </div>
    </div>
    ${aiSummaryHtml}
    ${patientsBreakdown}`;

  document.getElementById("report-modal").classList.remove("hidden");
}



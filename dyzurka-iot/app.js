let currentUser = null;
let wardState = null;
let activePatientId = null;
let chartInstance = null;

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
  sessionStorage.setItem("ward_user", uKey);
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("ward-screen").classList.remove("hidden");
  document.getElementById("current-user-badge").textContent = `${user.name} (${user.label})`;
  document.getElementById("admit-panel").classList.toggle("hidden", user.role === "opiekun");
  await refreshBoard();
}

function logout() {
  sessionStorage.removeItem("ward_user");
  location.reload();
}

async function refreshBoard() {
  wardState = await WardDB.load();
  renderRooms();
  renderLogs();
  ["new-room", "transfer-room"].forEach(id => {
    const sel = document.getElementById(id);
    if (sel) sel.innerHTML = wardState.rooms.map(r => `<option value="${r}">${r}</option>`).join("");
  });
}
function getLatestVitals(pat) {
  const m = pat.history.filter(h => h.type === "pomiar");
  return m.length ? m[m.length - 1] : null;
}

function getStatusClass(v) {
  if (!v) return "";
  if (v.temp >= 38.0 || v.sys >= 150 || v.dia >= 95 || v.pulse >= 100) return "status-alert";
  if (v.temp >= 37.3 || v.sys >= 138 || v.dia >= 88) return "status-warn";
  return "status-ok";
}

function renderRooms() {
  const container = document.getElementById("rooms-container");
  container.innerHTML = wardState.rooms.map(room => {
    const pats = wardState.patients.filter(p => p.room === room);
    const cards = pats.length ? pats.map(p => {
      const v = getLatestVitals(p);
      return `
        <div class="bed-card ${getStatusClass(v)}" onclick="openPatientModal('${p.id}')">
          <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
            <strong style="color:var(--accent);">${p.bed} • ${p.name}</strong>
            <span style="font-size:0.72rem; color:var(--muted);">${p.qr}</span>
          </div>
          ${v ? `<div class="vitals-grid">
            <div class="vital-item"><div class="vital-num">${v.sys}/${v.dia}</div><div class="vital-lbl">RR</div></div>
            <div class="vital-item"><div class="vital-num">${v.pulse}</div><div class="vital-lbl">Puls</div></div>
            <div class="vital-item"><div class="vital-num">${v.temp}°C</div><div class="vital-lbl">Temp</div></div>
          </div>` : `<div style="font-size:0.8rem; color:var(--muted);">Brak pomiarów</div>`}
          ${p.alertNote ? `<div class="note-box">${p.alertNote}</div>` : ""}
        </div>`;
    }).join("") : `<div style="font-size:0.82rem; color:var(--muted);">Wolne łóżka</div>`;
    return `<div class="room-section"><div class="room-header"><span>🚪 ${room}</span><span>Pacjentów: ${pats.length}</span></div><div class="beds-row">${cards}</div></div>`;
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
  const bed = document.getElementById("new-bed").value.trim() || "Łóżko 1";
  const alertNote = document.getElementById("new-alert").value.trim();
  if (!name) return alert("Wpisz inicjały pacjenta!");
  const num = Math.floor(100 + Math.random() * 900);
  wardState.patients.push({ id: `PAT-${num}`, qr: `QR-${room.replace(/\s+/g, "")}-${num}`, name, room, bed, alertNote, medications: "Oczekuje na zlecenie", history: [] });
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
  wardState.patients = wardState.patients.filter(p => p.id !== activePatientId);
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
  const w = 760, h = 160, pad = 35;
  const maxVal = 180, minVal = 40;
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
    <div style="font-size:0.75rem; color:var(--muted); margin-top:4px;">🔴 Ciśnienie Skurczowe (SYS) &nbsp;|&nbsp; 🔵 Ciśnienie Rozkurczowe (DIA) &nbsp;|&nbsp; 🟢 Puls (bpm) &nbsp;|&nbsp; Przerywana linia: próg 140 mmHg</div>`;
}


function generateShiftReport() {
  const lines = [`=== 🤖 RAPORT ZMIANY AI (${nowStamp()}) ===`, `Autor: ${currentUser.name}\n`];
  wardState.patients.forEach(p => {
    const v = getLatestVitals(p);
    const st = v ? `RR ${v.sys}/${v.dia}, Puls ${v.pulse}, Temp ${v.temp}°C (${v.date}, ${v.author})` : "Brak pomiarów";
    const warn = (v && (v.temp >= 38 || v.sys >= 150)) ? " ⚠️ PILNA UWAGA LEKARZA!" : " ✅ Stabilny";
    lines.push(`• ${p.room} / ${p.bed} — ${p.name}:${warn}\n  Pomiar: ${st}\n  Leki: ${p.medications || "brak"}\n`);
  });
  document.getElementById("report-content").textContent = lines.join("\n");
  document.getElementById("report-modal").classList.remove("hidden");
}

async function resetDemoData() {
  if (!confirm("Przywrócić dane startowe?")) return;
  localStorage.removeItem("apex_ward_db_v2");
  await refreshBoard();
}

setInterval(() => { if (currentUser) refreshBoard(); }, 4000);

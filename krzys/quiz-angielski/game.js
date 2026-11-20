const questions = [
  {
    pl: "Wstaję o godzinie siódmej.",
    en: "I get up _______.",
    options: ["at seven o'clock", "in seven o'clock", "on seven o'clock"],
    correct: 0,
    tip: "Przed dokładną godziną zawsze stawiamy przyimek AT (at seven o'clock)."
  },
  {
    pl: "Jem śniadanie rano.",
    en: "I eat breakfast _______.",
    options: ["at morning", "in the morning", "on the morning"],
    correct: 1,
    tip: "Rano, po południu i wieczorem mówimy z IN THE: in the morning!"
  },
  {
    pl: "Idę do szkoły o wpół do dziewiątej (8:30).",
    en: "I go to school _______.",
    options: ["in half past eight", "at half past eight", "on half past eight"],
    correct: 1,
    tip: "8:30 to 'half past eight', a przed godziną używamy AT!"
  },
  {
    pl: "Odrabiam lekcje po południu.",
    en: "I do my homework _______.",
    options: ["in the afternoon", "at the afternoon", "in night"],
    correct: 0,
    tip: "Po południu to 'in the afternoon' (tak samo jak in the morning)."
  },
  {
    pl: "Gram w gry o godzinie czwartej (16:00).",
    en: "I play computer games _______.",
    options: ["in four o'clock", "at four o'clock", "to four o'clock"],
    correct: 1,
    tip: "Pełna godzina = AT + godzina + o'clock (at four o'clock)."
  },
  {
    pl: "Oglądam bajki wieczorem.",
    en: "I watch cartoons _______.",
    options: ["at the evening", "on evening", "in the evening"],
    correct: 2,
    tip: "Wieczorem mówimy 'in the evening'."
  },
  {
    pl: "Idę spać o godzinie dziewiątej (21:00).",
    en: "I go to bed _______.",
    options: ["at nine o'clock", "in nine o'clock", "at the nine"],
    correct: 0,
    tip: "Przed każdą godziną stawiamy AT (at nine o'clock)."
  },
  {
    pl: "Koty polują w nocy!",
    en: "Cats hunt _______!",
    options: ["in the night", "at night", "on night"],
    correct: 1,
    tip: "Uwaga wyjątek! Choć rano/wieczorem ma 'in the', w nocy mówimy krótko: AT NIGHT!"
  },
  {
    pl: "Myję zęby o wpół do ósmej (7:30).",
    en: "I brush my teeth _______.",
    options: ["at half past seven", "in half past seven", "at seven half"],
    correct: 0,
    tip: "Wpół do ósmej to 'half past seven', a przed godziną dajemy AT."
  },
  {
    pl: "Karmię kota rano.",
    en: "I feed my cat _______.",
    options: ["at morning", "in the morning", "at the morning"],
    correct: 1,
    tip: "Brawo! Rano to zawsze 'in the morning'."
  }
];

const qNumEl = document.getElementById("qNum");
const qTotalEl = document.getElementById("qTotal");
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const plHintEl = document.getElementById("plHint");
const enSentenceEl = document.getElementById("enSentence");
const optionsGrid = document.getElementById("optionsGrid");
const feedbackBox = document.getElementById("feedbackBox");
const nextBtn = document.getElementById("nextBtn");

let bestScore = parseInt(localStorage.getItem("ys_english_time_best") || "0", 10);
bestEl.textContent = bestScore;
qTotalEl.textContent = questions.length;

let currentIdx = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  answered = false;
  feedbackBox.className = "feedback";
  feedbackBox.textContent = "";
  nextBtn.className = "btn-next";

  if (currentIdx >= questions.length) {
    showSummary();
    return;
  }

  const q = questions[currentIdx];
  qNumEl.textContent = currentIdx + 1;
  plHintEl.textContent = `🇵🇱 ${q.pl}`;
  enSentenceEl.textContent = `🇬🇧 ${q.en}`;

  optionsGrid.innerHTML = "";
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = `${["A", "B", "C"][idx]}. ${opt}`;
    btn.addEventListener("click", () => handleAnswer(idx, btn));
    optionsGrid.appendChild(btn);
  });
}

function handleAnswer(selectedIdx, clickedBtn) {
  if (answered) return;
  answered = true;

  const q = questions[currentIdx];
  const allBtns = optionsGrid.querySelectorAll(".option-btn");
  allBtns.forEach(b => (b.disabled = true));

  if (selectedIdx === q.correct) {
    score += 10;
    scoreEl.textContent = score;
    clickedBtn.classList.add("correct");
    feedbackBox.className = "feedback show ok";
    feedbackBox.textContent = `✅ Super, Ys! (+10 pkt) — ${q.tip}`;

    if (score > bestScore) {
      bestScore = score;
      bestEl.textContent = bestScore;
      localStorage.setItem("ys_english_time_best", bestScore);
    }
  } else {
    clickedBtn.classList.add("wrong");
    allBtns[q.correct].classList.add("correct");
    feedbackBox.className = "feedback show err";
    feedbackBox.textContent = `❌ Prawie! Poprawnie: "${q.options[q.correct]}". ${q.tip}`;
  }

  nextBtn.textContent =
    currentIdx + 1 < questions.length ? "Następne pytanie →" : "🏆 Zobacz wynik końcowy!";
  nextBtn.className = "btn-next show";
}

function showSummary() {
  plHintEl.textContent = "🎉 Audyt języka angielskiego zakończony!";
  enSentenceEl.textContent = `Twój wynik: ${score} / ${questions.length * 10} pkt (+100 XP)`;
  optionsGrid.innerHTML = "";
  feedbackBox.className = "feedback show ok";
  feedbackBox.textContent =
    score >= 80
      ? "🏆 Świetna robota, Junior QA Testerze! Znasz już perfekcyjnie różnicę między AT a IN THE!"
      : "⭐ Dobry trening! Zagraj jeszcze raz, żeby wbić 100/100 punktów!";

  nextBtn.textContent = "🔄 Zagraj jeszcze raz";
  nextBtn.className = "btn-next show";
  nextBtn.onclick = () => {
    currentIdx = 0;
    score = 0;
    scoreEl.textContent = 0;
    nextBtn.onclick = nextStep;
    renderQuestion();
  };
}

function nextStep() {
  currentIdx++;
  renderQuestion();
}

nextBtn.addEventListener("click", nextStep);
renderQuestion();

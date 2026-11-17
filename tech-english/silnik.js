let currentIndex = 0;
let score = 0;
let answered = false;

const progressEl = document.getElementById('progress-text');
const questionEl = document.getElementById('question-text');
const optionsEl = document.getElementById('options-container');
const feedbackEl = document.getElementById('feedback-box');
const nextBtn = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');

function loadQuestion() {
  answered = false;
  const q = quizData[currentIndex];
  progressEl.textContent = `Pytanie ${currentIndex + 1} / ${quizData.length}`;
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  feedbackEl.style.display = 'none';
  nextBtn.style.display = 'none';

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(idx, btn);
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(selectedIndex, btnEl) {
  if (answered) return;
  answered = true;
  const q = quizData[currentIndex];
  const allBtns = optionsEl.querySelectorAll('.option-btn');

  allBtns.forEach((b, i) => {
    b.disabled = true;
    if (i === q.correct) b.classList.add('correct');
  });

  if (selectedIndex === q.correct) {
    score++;
  } else {
    btnEl.classList.add('wrong');
  }

  feedbackEl.innerHTML = `<strong>💡 Wyjaśnienie inżynierskie:</strong> ${q.explanation}`;
  feedbackEl.style.display = 'block';
  nextBtn.textContent = currentIndex === quizData.length - 1 ? 'Zobacz wynik końcowy →' : 'Następne pytanie →';
  nextBtn.style.display = 'inline-block';
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizContainer.style.display = 'none';
  resultContainer.style.display = 'block';
  const pct = Math.round((score / quizData.length) * 100);
  document.getElementById('final-score').textContent = `${score} / ${quizData.length} (${pct}%)`;
  const commentEl = document.getElementById('final-comment');

  if (pct >= 80) {
    commentEl.textContent = '🎯 Cel KPI (min. 80%) osiągnięty! Słownictwo techniczne z Sesji #1–#4 opanowane na poziomie produkcyjnym.';
  } else {
    commentEl.textContent = '⚠️ Wynik poniżej progu 80% KPI. Przeczytaj wyjaśnienia inżynierskie i powtórz moduł dla utrwalenia słownictwa.';
  }
}

loadQuestion();


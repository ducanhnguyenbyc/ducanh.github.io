let current = 0;
let score = 0;
let wrongAnswers = [];

function showQuestion() {
  const quiz = document.getElementById("quiz");
  const q = questions[current];
  quiz.innerHTML = `
    <div class="question">Câu ${current + 1}: ${q.question}</div>
    <div class="options">
      ${q.options.map(opt => `
        <label><input type="radio" name="option" value="${opt}"> ${opt}</label>
      `).join('')}
    </div>
    <button onclick="submitAnswer()">Trả lời</button>
  `;
}

function submitAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Vui lòng chọn một đáp án!");
    return;
  }
  const answer = selected.value;
  const correct = questions[current].answer;

  if (answer === correct) {
    score++;
  } else {
    wrongAnswers.push({
      question: questions[current].question,
      chosen: answer,
      correct: correct
    });
  }
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const quiz = document.getElementById("quiz");
  const result = document.getElementById("result");
  quiz.innerHTML = "";
  result.innerHTML = `<div>Bạn đúng ${score}/${questions.length} câu.</div>`;
  if (wrongAnswers.length > 0) {
    result.innerHTML += `<div class='wrong'><br><strong>Câu sai:</strong><br></div>`;
    wrongAnswers.forEach(q => {
      result.innerHTML += `
        <div>❌ ${q.question}<br>
        👉 Bạn chọn: <span class='wrong'>${q.chosen}</span><br>
        ✅ Đáp án đúng: <span class='correct'>${q.correct}</span></div><br>
      `;
    });
  }
}

document.addEventListener("DOMContentLoaded", showQuestion);

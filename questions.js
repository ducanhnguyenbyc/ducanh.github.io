const questions = [
    {
      question: "Máy bay nào có thời gian hoạt động dài nhất?",
      options: ["B-1B Lancer", "MQ-9 Reaper", "F-22 Raptor", "F/A-18 Super Hornet"],
      answer: "MQ-9 Reaper"
    },
    {
      question: "F-35 Lightning II là loại máy bay gì?",
      options: ["Ném bom", "Tiêm kích đa nhiệm tàng hình", "Trinh sát điện tử", "Tuần tra biển"],
      answer: "Tiêm kích đa nhiệm tàng hình"
    },
    {
      question: "Máy bay nào có sải cánh lớn nhất?",
      options: ["F-15 Eagle", "MQ-4C Triton", "B-1B Lancer", "E-2C Hawkeye"],
      answer: "MQ-4C Triton"
    },
    {
      question: "RC-135 Rivet Joint thuộc loại gì?",
      options: ["Trinh sát điện tử", "Tiêm kích", "Ném bom", "Tuần tra biển"],
      answer: "Trinh sát điện tử"
    },
    {
      question: "F-22 Raptor có trần bay khoảng bao nhiêu?",
      options: ["12.000 m", "15.000 m", "20.000 m", "25.000 m"],
      answer: "20.000 m"
    },
    {
      question: "X-47B là máy bay gì?",
      options: ["UAV thử nghiệm", "Máy bay tiêm kích", "Ném bom tàng hình", "Cảnh báo sớm"],
      answer: "UAV thử nghiệm"
    }
    // TODO: Thêm 194 câu nữa
  ];
  let current = 0;
let score = 0;
let wrongAnswers = [];

function showQuestion() {
  const quiz = document.getElementById("quiz");
  const q = questions[current];
  quiz.innerHTML = `
    <div class="question">Câu ${current + 1}: ${q.question}</div>
    <div class="options">
      ${q.options.map((opt, idx) => `
        <label><input type="radio" name="option" value="${opt}"> ${opt}</label>
      `).join('')}
    </div>
    <button onclick="submitAnswer()">Trả lời</button>
    <div id="feedback"></div>
  `;
}

function submitAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  const feedback = document.getElementById("feedback");
  if (!selected) {
    alert("Vui lòng chọn một đáp án!");
    return;
  }
  const answer = selected.value;
  const correct = questions[current].answer;

  if (answer === correct) {
    score++;
    feedback.innerHTML = `<div class='correct'>✅ Chính xác! Đáp án: ${correct}</div>`;
  } else {
    wrongAnswers.push({
      question: questions[current].question,
      chosen: answer,
      correct: correct
    });
    feedback.innerHTML = `<div class='wrong'>❌ Sai. Bạn chọn: ${answer}<br>✅ Đáp án đúng: ${correct}</div>`;
  }

  const button = document.querySelector('button');
  button.textContent = "Câu tiếp theo";
  button.onclick = nextQuestion;
}

function nextQuestion() {
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

let timer;
let timeLeft = 60;
let isTestRunning = false;

function startTest() {
  if (isTestRunning) return;

  const inputArea = document.getElementById('input-area');
  const resultDiv = document.getElementById('result');
  const startButton = document.getElementById('startButton');

  isTestRunning = true;
  inputArea.disabled = false;
  inputArea.value = '';
  inputArea.focus();
  timeLeft = 60;
  document.getElementById('timer').textContent = "Time: 60s";
  resultDiv.textContent = '';
  startButton.disabled = true;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endTest();
    }
  }, 1000);
}

function endTest() {
  const inputArea = document.getElementById('input-area');
  const startButton = document.getElementById('startButton');

  clearInterval(timer);
  inputArea.disabled = true;
  startButton.disabled = false;
  isTestRunning = false;
  showResults();
}

function showResults() {
  const input = document.getElementById('input-area').value;
  const charCount = input.length;
  const wordCount = input.trim().split(/\s+/).filter(word => word.length > 0).length;
  const wpm = Math.round(wordCount);

  let result = `You typed ${charCount} characters and ${wordCount} words (${wpm} WPM).\n`;
  if (charCount >= 133) {
    result += "✅ You meet the 8000 key depressions/hour requirement!";
  } else {
    result += "❌ You need more practice to meet the required speed.";
  }

  document.getElementById('result').textContent = result;
}

// Cleanup on page unload
window.addEventListener('unload', () => {
  if (timer) {
    clearInterval(timer);
  }
});
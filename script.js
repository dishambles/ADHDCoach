// Thought of the Day Fetch
async function fetchThought() {
  try {
    const res = await fetch('https://api.quotable.io/random');
    const data = await res.json();
    document.getElementById('thought').innerText = data.content;
  } catch {
    document.getElementById('thought').innerText = "Stay focused and positive!";
  }
}
fetchThought();

// Pomodoro Timer with Runs
let timer, runsLeft, timeLeft;
const timerDisplay = document.getElementById('timer-display');
const runsInput = document.getElementById('runs');
const runsLeftDisplay = document.getElementById('runs-left');

function updateTimer() {
  let min = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  let sec = (timeLeft % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${min}:${sec}`;
  runsLeftDisplay.textContent = `Runs Left: ${runsLeft}`;
}

document.getElementById('start-timer').onclick = function() {
  clearInterval(timer);
  runsLeft = parseInt(runsInput.value);
  if (runsLeft < 1) runsLeft = 1;
  timeLeft = 25 * 60;
  updateTimer();

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimer();
    } else {
      runsLeft--;
      if (runsLeft > 0) {
        timeLeft = 25 * 60;
      } else {
        clearInterval(timer);
        alert("Great job! All sessions complete.");
      }
    }
  }, 1000);
};

document.getElementById('reset-timer').onclick = function() {
  clearInterval(timer);
  timeLeft = 25 * 60;
  runsLeft = parseInt(runsInput.value);
  updateTimer();
};

// Chatbox functionality (API key placeholder)
document.getElementById('chatbox-submit').onclick = async function() {
  const input = document.getElementById('chatbox-input').value;
  document.getElementById('chatbox-response').innerText = 'Thinking...';
  try {
    const res = await fetch('https://api-inference.huggingface.co/models/mistralai', {
      method: 'POST',
      headers: {'Authorization': 'Bearer YOUR_API_KEY'},
      body: JSON.stringify({inputs: input})
    });
    const data = await res.json();
    document.getElementById('chatbox-response').innerText = data.generated_text;
  } catch {
    document.getElementById('chatbox-response').innerText = 'Error fetching response.';
  }
};

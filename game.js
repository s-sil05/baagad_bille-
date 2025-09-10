const dialogueText = document.getElementById('dialogue-text');
const inputArea = document.getElementById('input-area');
const playerNameInput = document.getElementById('player-name-input');
const startButton = document.getElementById('start-button');
const choicesContainer = document.getElementById('choices-container');

let playerName = '';

startButton.addEventListener('click', () => {
  const name = playerNameInput.value.trim();
  if (name.length === 0) {
    alert('Please enter your detective name.');
    return;
  }
  playerName = name;
  startGame();
});

function startGame() {
  // Hide name input area
  inputArea.style.display = 'none';

  // Initial story text
  updateDialogue(`Detective ${playerName}, the neon-lit city awaits...\nYour story begins now.`);

  // Initial choices
  showChoices([
    "Investigate the abandoned warehouse",
    "Meet Lena, your informant",
    "Check in with Detective Harris"
  ]);
}

function updateDialogue(text) {
  dialogueText.textContent = text;
}

function showChoices(choices) {
  // Clear old choices
  choicesContainer.innerHTML = '';

  choices.forEach(choiceText => {
    const btn = document.createElement('button');
    btn.className = 'choice-button';
    btn.textContent = choiceText;

    btn.addEventListener('click', () => {
      // For now, just show chosen option, replace later to call backend API
      updateDialogue(`You chose: ${choiceText}\n\n(Loading next story segment...)`);
      choicesContainer.innerHTML = '';

      // Simulate AI response delay and update next story segment
      setTimeout(() => {
        updateDialogue(`(AI-generated story part for "${choiceText}" will appear here)`);
        // Show placeholder new choices
        showChoices([
          "Option 1",
          "Option 2",
          "Option 3"
        ]);
      }, 1500);
    });

    choicesContainer.appendChild(btn);
  });
}

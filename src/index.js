import './index.css';

// Game ID
const gameId = 'Af3SPW0U28yG92UyBksL';

// API URL
const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

// Function to display error message
const displayErrorMessage = (message) => {
  const errorMessage = document.querySelector('.error-message');
  errorMessage.textContent = message;
};

// Refresh scores
const refreshScores = async () => {
  try {
    const response = await fetch(`${apiUrl}/games/${gameId}/scores`);
    const data = await response.json();

    // Update the score list
    const scoreList = document.querySelector('.scorelist');
    scoreList.innerHTML = '';

    data.result.forEach((score) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${score.user}:${score.score}`;
      scoreList.appendChild(listItem);
    });
  } catch (error) {
    displayErrorMessage('Error refreshing scores');
  }
};

// Submit score
const submitScore = async () => {
  const playerInput = document.querySelector('.player');
  const scoreInput = document.querySelector('.score');

  const player = playerInput.value;
  const score = parseInt(scoreInput.value, 10);

  // Validate input
  if (!player || Number.isNaN(score)) {
    displayErrorMessage('Invalid input');
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/games/${gameId}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: player,
        score,
      }),
    });

    if (response.ok) {
      playerInput.value = '';
      scoreInput.value = '';
      refreshScores();
    } else {
      displayErrorMessage('Failed to submit score');
    }
  } catch (error) {
    displayErrorMessage('Error submitting score');
  }
};

// Refresh button click event
document.querySelector('.refreshButton').addEventListener('click', () => {
  refreshScores();
});

// Submit button click event
document.querySelector('.submitbutton').addEventListener('click', (event) => {
  event.preventDefault();
  submitScore();
});

// Initial scores refresh
refreshScores();
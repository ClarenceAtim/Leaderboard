
import './index.css';

// Game ID
const gameId = 'Af3SPW0U28yG92UyBksL';

// API URL
const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

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
    console.error('Error refreshing scores:', error);
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
    console.error('Invalid input');
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
      console.error('Failed to submit score');
    }
  } catch (error) {
    console.error('Error submitting score:', error);
  }
};

// Refresh button click event
document.querySelector('.refeshButton').addEventListener('click', () => {
  refreshScores();
});

// Submit button click event
document.querySelector('.submitbutton').addEventListener('click', (event) => {
  event.preventDefault();
  submitScore();
});

// Initial scores refresh
refreshScores();
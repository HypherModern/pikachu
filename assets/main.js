const images = [
  'assets/images/pieces1.png', 'assets/images/pieces1.png',
  'assets/images/pieces2.png', 'assets/images/pieces2.png',
  'assets/images/pieces3.png', 'assets/images/pieces3.png',
  'assets/images/pieces4.png', 'assets/images/pieces4.png',
  'assets/images/pieces5.png', 'assets/images/pieces5.png',
  'assets/images/pieces6.png', 'assets/images/pieces6.png'
];

let gameBoard = document.getElementById('game-board');
let flippedCards = [];
let matchedCount = 0;
let moves = 0;
let score = 0;
let boardLocked = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  shuffle(images);
  images.forEach((image, index) => {
      let card = document.createElement('div');
      card.classList.add('card');
      card.dataset.image = image;

      let img = document.createElement('img');
      img.src = image;

      card.appendChild(img);
      gameBoard.appendChild(card);

      card.addEventListener('click', () => flipCard(card));
  });
}

function flipCard(card) {
  if (boardLocked || card.classList.contains('flipped') || card.classList.contains('matched')) {
      return;
  }

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
      checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.image === card2.dataset.image) {
      boardLocked = true;
      setTimeout(() => {
          card1.classList.add('matched');
          card2.classList.add('matched');
          matchedCount += 2;
          score += 10; // Increase score by 10 for each match
          document.querySelector('.score').textContent = score;

          boardLocked = false;

          if (matchedCount === images.length) {
              setTimeout(() => alert('You win!'), 500);
          }
      }, 500); // Delay of 500ms before matched cards disappear
  } else {
      boardLocked = true;
      setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          boardLocked = false;
      }, 500); // Delay of 500ms for non-matching cards to flip back
  }

  moves += 1; // Increment moves count
  document.querySelector('.moves').textContent = moves;
  flippedCards = [];
}

function resetGame() {
  gameBoard.innerHTML = ''; // Clear the board
  flippedCards = [];
  matchedCount = 0;
  moves = 0;
  score = 0;
  document.querySelector('.moves').textContent = moves;
  document.querySelector('.score').textContent = score;
  createBoard(); // Recreate the board
}
function showMessage(buttonName){
  alert(`Bạn đang bấm vào nút ${buttonName}`);
}
document.getElementById("Reset").addEventListener("click", function(){
  showMessage("Reset");
});

createBoard();

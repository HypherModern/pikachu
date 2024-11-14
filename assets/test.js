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
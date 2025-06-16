const colors = ["red", "blue", "green", "yellow"];
let sequence = [];
let playerInput = [];
let isStarted = false;
let currentLevel = 0;

$(document).on("keydown", () => {
  if (!isStarted) {
    $("#level-title").text("Level " + currentLevel);
    generateStep();
    isStarted = true;
  }
});

$(".btn").on("click", function () {
  const selectedColor = $(this).attr("id");
  playerInput.push(selectedColor);
  triggerSound(selectedColor);
  flashButton(selectedColor);
  validateInput(playerInput.length - 1);
});

function validateInput(index) {
  if (sequence[index] === playerInput[index]) {
    if (playerInput.length === sequence.length) {
      setTimeout(() => {
        generateStep();
      }, 1000);
    }
  } else {
    triggerSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    resetGame();
  }
}

function generateStep() {
  playerInput = [];
  currentLevel++;
  $("#level-title").text("Level " + currentLevel);
  const randomIndex = Math.floor(Math.random() * 4);
  const nextColor = colors[randomIndex];
  sequence.push(nextColor);
  $("#" + nextColor).fadeIn(100).fadeOut(100).fadeIn(100);
  triggerSound(nextColor);
}

function flashButton(color) {
  $("#" + color).addClass("pressed");
  setTimeout(() => {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function triggerSound(name) {
  const sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function resetGame() {
  currentLevel = 0;
  sequence = [];
  isStarted = false;
}

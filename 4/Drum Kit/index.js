const drums = document.querySelectorAll(".drum");

drums.forEach(drum => {
  drum.addEventListener("click", () => {
    const key = drum.innerHTML;
    playSound(key);
    animateButton(key);
  });
});

document.addEventListener("keydown", e => {
  playSound(e.key);
  animateButton(e.key);
});

function playSound(char) {
  let audio;
  switch (char) {
    case "w":
      audio = new Audio("sounds/tom-1.mp3");
      break;
    case "a":
      audio = new Audio("sounds/tom-2.mp3");
      break;
    case "s":
      audio = new Audio("sounds/tom-3.mp3");
      break;
    case "d":
      audio = new Audio("sounds/tom-4.mp3");
      break;
    case "j":
      audio = new Audio("sounds/snare.mp3");
      break;
    case "k":
      audio = new Audio("sounds/crash.mp3");
      break;
    case "l":
      audio = new Audio("sounds/kick-bass.mp3");
      break;
    default:
      return;
  }
  audio.play();
}

function animateButton(key) {
  const btn = document.querySelector("." + key);
  if (!btn) return;
  btn.classList.add("pressed");
  setTimeout(() => {
    btn.classList.remove("pressed");
  }, 100);
}

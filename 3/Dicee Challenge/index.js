let num1 = Math.floor(Math.random() * 6) + 1;
let src1 = "images/dice" + num1 + ".png";
document.querySelector(".img1").setAttribute("src", src1);

let num2 = Math.floor(Math.random() * 6) + 1;
let src2 = "images/dice" + num2 + ".png";
document.querySelector(".img2").setAttribute("src", src2);

let title = document.querySelector("h1");
if (num1 > num2) {
  title.textContent = "🚩 Play 1 Wins!";
} else if (num2 > num1) {
  title.textContent = "Player 2 Wins! 🚩";
} else {
  title.textContent = "Draw!";
}

let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keydown(function () {
  if (!started) {
    started = true;
    nextSequence();
  }
});

$(".btn").click(function () {
  userClickedPattern.push(this.id);
  playSound(this.id);
  animatePress(this.id);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = [...buttonColours][randomNumber];
  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function checkAnswer(id) {
  if (gamePattern[id] === userClickedPattern[id]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("#level-title").text("GAME OVER, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

function playSound(soundName) {
  let audio = new Audio(`sounds/${soundName}.mp3`);
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

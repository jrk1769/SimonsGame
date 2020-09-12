var buttonColors = ["red", "green", "blue", "yellow"];

var gamePattern = [];

var userClickedPattern =  [];

var begin = false;

var level = 0;

$(".button").click(function() {
	if(!begin) {
		$("#title").text("Level " + level);
		nextSequence();
		begin = true;
	}
});

$(".btn").click(function() {
	var userChosenColor = $(this).attr("id");
	userClickedPattern.push(userChosenColor);

	playSound(userChosenColor);
	animatePress(userChosenColor);

	checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
	userClickedPattern = [];
	level++;
	$("#title").text("Level " + level);
	var randomNumber = Math.floor(Math.random()*4);
	var randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);

	$("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");

	setTimeout(function() {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}



function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1200);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#title").text("Game Over, Press the Button to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function startOver() {
  level = 0;
  gamePattern = [];
  begin = false;
}
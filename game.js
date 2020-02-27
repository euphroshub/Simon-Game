//code by k.hardy, part of the web development bootcamp course by Angela Yu
//working with JavaScript and jQuery

//----------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------//

//create a new array called buttonColours 
var buttonColours = ["red", "blue", "green", "yellow"];
//creating a new empty array called gamePattern and user pattern
var gamePattern = [];
var userClickedPattern = [];
//creating variables for level and start
var started = false;
var level = 0;

//using jquery to detect if a key has been pushed, when 1st time start game(nextSequence function)
$(document).keydown(function() {
  if (!started) {
    //h1 says press a key to start, change h1 when key is pressed
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//using jQuery to detect when any of the buttons are clicked and trigger a handler
// function.

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {
  //if statement to see if most recent user answer is the same as game pattern
  // and another if to check if they have finished their sequence
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

// creating the next sequence function
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
//creating a function to animate user clicks to buttons
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");// using jQuery to add this pressed class to
//                                        the button that gets clicked inside animatePress().
//remove the pressed class after a 100 milliseconds
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
//creating a function to play a sound when a button is clicked
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//creating a the function to restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Array of button colors
var buttonColours=["red","blue","green","yellow"];

// Arrays to store game pattern and user clicked pattern
var gamePattern=[];
var userClickedPattern=[];

// Variables to track game state
var n;
var started = false;
var level = 0;
var currentcolor;

// Add click event listeners to all buttons
for(var i=0;i<document.querySelectorAll("button").length;i++){
    document.querySelectorAll("button")[i].addEventListener("click",function(){
        var userChosenColour=$(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playsound(userChosenColour);
        animatepress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    });
}

// Function to reset the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// Function to generate the next sequence
function nextsequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level " + level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playsound(randomChosenColour);
}

// Start the game on keypress
document.addEventListener("keypress",function() {
    if (!started) {
        $("h1").text("Level " + level);
        nextsequence();
        started = true;
    }
});

// Function to check the user's answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length == gamePattern.length){
            setTimeout(function () {
                nextsequence();
            },1000);
        }
    } else {
        console.log("wrong");
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// Function to play sound
function playsound(n) {
    $( "#"+n).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("./sounds/" + n + ".mp3");
    audio.play();
}

// Function to animate button press
function animatepress(currentcolor) {
    $("#" + currentcolor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentcolor).removeClass("pressed");
    }, 100);
}

var buttonColors = ["red" , "blue" , "yellow" , "green"];
var gamePattern = [];
var userClickedPattern = [];
var clickCount = 0;
var level = 0;

$(".start-btn").click(function(){

    if(clickCount === 0)
    {
        $("h3").remove();
        level++;
        nextSequence(level);
        clickCount++;
        $(".start-btn").fadeOut();
    }    

});

function nextSequence(level)
{
    $("h2").text("level " + level);
    userClickedPattern = [];
    var randomNumber = Math.floor(4*Math.random());
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
            
    $("#" + randomChosenColor).fadeOut().fadeIn();
    playSound(randomChosenColor);
}

$(".btnn").click(function(){

    var userChosenColor =  this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor); 

    checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));

});

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(name)
{
    $("." + name).addClass("pressed");
    setTimeout(function(){ $("." + name).removeClass("pressed");} , 150);
}

function checkAnswer(curretLevel)
{
    if(userClickedPattern[curretLevel] === gamePattern[curretLevel])
    {
        var count = 0;
        for(var i=0 ; i < gamePattern.length ; i++)
        {
            if(gamePattern[i] === userClickedPattern[i])
            {
                count++;
            }
        }

        if(count === gamePattern.length)
        {
            level++;
            setTimeout(function(){nextSequence(level)} , 1000);
        }
    }
    else
    {
        gameOver();
    }
    
}

function gameOver()
{
    $("h2").text("Game over! Press Start to continue");
    showScore();
    $("body").addClass("game-over");
    setTimeout(function(){ $("body").removeClass("game-over");} , 150);
    startOver();
}

function showScore()
{
    $("h2").after("<h3>Your score is </h3>");
    $("h3").append(level-1);
    $("h3").addClass("score");
}

function startOver()
{
    var overAudio = new Audio("sounds/wrong.mp3");
    overAudio.play();
    clickCount = 0;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $(".start-btn").fadeIn();
}










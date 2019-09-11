var playing = false;
var score;
var trailsLeft;
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
var step;
var action;
//$(document).on('click touch', function () {
$(function() {
    //click on start reset button	
    $("#startreset").click(function() {
        //are we playing
        if (playing == true) {
            //reload page
            location.reload();
        } else {
            //we are not playing game
            playing == true; //game started
            //set score to 0
            score = 0;
            $("#scorevalue").html(score);
            //show trails left
            $("#trailsLeft").show();
            trailsLeft = 3;
            addHearts();

            //hide gameover box
            $("#gameover").hide();
            //change button text to reset game
            $("#startreset").html("Reset Game");
            //start sending fruits
            startAction();
        }
    });
    $("#fruit1").mouseover(function() {
        score++;
        $("#scorevalue").html(score); //update score

        // document.getElementById("slicesound").play();
        $("#slicesound")[0].play(); //play sound
        //stop fruit
        clearInterval(action);

        //hide fruit
        $("#fruit1").hide("explode", 300); //slicing fruit 

        //send new fruit
        setTimeout(startAction, 300);
        //startAction();
    });



    //function
    function addHearts() {
        $("#trailsLeft").empty();
        for (i = 0; i < trailsLeft; i++) {
            $("#trailsLeft").append('<img src="images/heart.png" class="life">');
        }
    }
    //start sending fruits
    function startAction() {
        $("#fruit1").show();
        chooseFruit(); //choose a random fruit
        //random position
        $("#fruit1").css({ 'left': Math.round(550 * Math.random()), 'top': -70 });


        //generate a random step
        step = 1 + Math.round(5 * Math.random()); //change step
        //move fruit down by one step every 10ms
        action = setInterval(function() {
            $("#fruit1").css('top', $("#fruit1").position().top + step); //move fruit by 1 step
            //check if the fruit is too low
            if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
                //check if we have trails left
                if (trailsLeft > 1) {
                    $("#fruit1").show();
                    chooseFruit(); //choose a random fruit
                    $("#fruit1").css({ 'left': Math.round(550 * Math.random()), 'top': -70 });
                    //random position

                    //generate a random step
                    step = 1 + Math.round(5 * Math.random()); //change step
                    trailsLeft--;
                    //populate trailsleft box
                    addHearts();
                } else {
                    //game over
                    playing = false; //we are not playing anymore
                    $("#startreset").html("Start Game"); //change the button to Start Game
                    $("#gameover").show();
                    $("#gameover").html('<p>Game Over!</p><p>Your score is: ' + score + '</p>');
                    $("#trailsLeft").hide();
                    stopAction();

                }
            }
        }, 10);
    }

    //generate random fruit
    function chooseFruit() {
        $("#fruit1").attr('src', 'images/' + fruits[Math.round(8 * Math.random())] + '.png');
    }
    //stop dropping fruit
    function stopAction() {
        clearInterval(action);
        $("#fruit1").hide();
    }
});
//});
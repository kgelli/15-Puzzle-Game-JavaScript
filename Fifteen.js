 var start = new Date();
 var startTime; 
var timerInterval; 
        var moves = 0;
        var ids = [
    "one",      "two",      "three",   "four",
    "five",     "six",      "seven",   "eight",
    "nine",     "ten",      "eleven",  "twelve",
    "thirteen", "fourteen", "fifteen", ""
];
var winSound = new Audio('winsound.mp3'); 
var moveSound = new Audio('movesound.mp3'); 
var shuffleSound= new Audio('shufflesound.mp3'); 

var shuffled = ids.slice();
        var shuffled = [
            //... Your shuffled array values here
        ];
        var ids_numeric = {
    "one":1,       "two":2,       "three":3,    "four":4,
    "five":5,      "six":6,       "seven":7,    "eight":8,
    "nine":9,      "ten":10,      "eleven":11,  "twelve":12,
    "thirteen":13, "fourteen":14, "fifteen":15, "sixteen":16
};

var selected_background;

var movement = [
    [0, 1, 1, 0], //0: one
    [0, 1, 1, 1], //1: two
    [0, 1, 1, 1], //2: three
    [0, 0, 1, 1], //3: four
    [1, 1, 1, 0], //4: five
    [1, 1, 1, 1], //5: six
    [1, 1, 1, 1], //6: seven
    [1, 0, 1, 1], //7: eight
    [1, 1, 1, 0], //8: nine
    [1, 1, 1, 1], //9: ten
    [1, 1, 1, 1], //10: eleven
    [1, 0, 1, 1], //11: twelve
    [1, 1, 0, 0], //12: thirteen
    [1, 1, 0, 1], //13: fourteen
    [1, 1, 0, 1], //14: fifteen
    [1, 0, 0, 1]  //15: sixteen
];
// The available backgrounds
var background = ["tj1", "tj2", "tj3", "tj4"];

        function countMoves() {
            moves++;
            document.getElementById('movesDisplay').innerText = moves;
        }

        function swapPieces(clickable_id, empty_id) {
            animateMovement(clickable_id, empty_id);

            setTimeout(function() {
                var temp = shuffled[empty_id];
                shuffled[empty_id] = shuffled[clickable_id];
                shuffled[clickable_id] = temp;

                var moveSound = new Audio('movesound.mp3');
                moveSound.play();

                countMoves(); // Increment moves count
                displayBoard();
                checkIfWon();
            }, 600);
        }
        function startTimer() {
    startTime = new Date(); // Record the start time
    timerInterval = setInterval(updateTimer, 1000); // Update the timer every second
}
// Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval); // Stop the timer

    if (startTime) {
        var endTime = new Date(); // Record the end time
        var elapsedSeconds = (endTime - startTime) / 1000; // Calculate elapsed time in seconds

        // Display the number of moves and time taken to solve the puzzle
        document.getElementById('win').innerHTML = '<p>Total time taken: ' + elapsedSeconds + ' seconds</p>' +
            '<p>Total number of moves: ' + moves + '</p>';
    } else {
        document.getElementById('win').innerHTML = '' +
            '<p>Total number of moves: ' + moves + '</p>';
    }
}

// Function to update the timer display
function updateTimer() {
    var currentTime = new Date();
    var elapsedTime = (currentTime - startTime) / 1000; // Calculate elapsed time in seconds
    document.getElementById('timerInterval').innerText = elapsedTime.toFixed(0) + ' seconds';
}
        function initializeGame() {
            moveSound.play();
            function changePuzzleSize() {
                var newSize = parseInt(document.getElementById('puzzleSize').value);
                generateNewPuzzle(newSize);
                startTimer();

            }
             // Start the timer when the game initializes
            //... Your existing initialization code
    var background_id = Math.floor((Math.random() * 4));
    selected_background = background[background_id];

    document.getElementById(background[background_id]).selected = true; // Grab the selected option and mark it as selected

    for (var i = 0; i < ids.length - 1; i++) {
        document.getElementById(ids[i]).className = "tile " + background[background_id];
    }
     }
     function changeBackground() {
    var class_name = document.getElementById("characters").value;

    if (background.indexOf(class_name) < 0) {
        return;
    }

    selected_background = class_name;

    document.getElementById("main").innerHTML = "";

    for (var i = 0; i < ids.length; i++) {
        if (ids[i] == "") {
            document.getElementById("main").innerHTML += '<div id="sixteen" class="tile"></div>';
        } else {
            var id_name = ids[i];
            document.getElementById("main").innerHTML += '<div id="' + ids[i] + '" class="tile' + " " + selected_background + '">' + ids_numeric[id_name] + '</div>';
        }
    }
}
function shuffleBoard() {
    startTimer();
    shuffleSound.currentTime = 0; 
    shuffleSound.play();

    shuffled = ids.slice(); // Reinitialize the shuffled array
    var sixteen = 15;

    // Set a loop to go through 500 times
    for (var i = 0; i < 500; i++) {

        var movement_id = Math.floor((Math.random() * 4));

        while(movement[sixteen][movement_id] != 1) {
            movement_id = Math.floor((Math.random() * 4));
        }

        // The index id where the blank space will go to
        var move_to;

        switch(movement_id) {
            case 0:
                move_to = sixteen - 4;
                break;
                // subtract 4 to go to the top
            case 1:
                move_to = sixteen + 1;
                break;
                // add 1 to go to the right
            case 2:
                move_to = sixteen + 4;
                break;
                // subtract 4 to go to the bottom
            case 3:
                move_to = sixteen - 1;
                break;
                // subtract 1 to go to the left
        }

        // swap sixteen and move_to
        var temp = shuffled[sixteen];
        shuffled[sixteen] = shuffled[move_to];
        shuffled[move_to] = temp;

        sixteen = move_to;
    }

    displayBoard();
}
function displayBoard() {
    document.getElementById("main").innerHTML = "";

    for (var i = 0; i < shuffled.length; i++) {
        if (shuffled[i] == "") {
            document.getElementById("main").innerHTML += '<div id="sixteen" class="tile"></div>';
        } else {
            var id_name = shuffled[i];
            document.getElementById("main").innerHTML += '<div id="' + shuffled[i] + '" class="tile' + " " + selected_background + '">' + ids_numeric[id_name] + '</div>';
        }
    }

    var clickable_id;

    if (movement[shuffled.indexOf("")][0] == 1) {
        clickable_id = shuffled.indexOf("") - 4;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }

    if (movement[shuffled.indexOf("")][1] == 1) {
        clickable_id = shuffled.indexOf("") + 1;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }

    if (movement[shuffled.indexOf("")][2] == 1) {
        clickable_id = shuffled.indexOf("") + 4;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }

    if (movement[shuffled.indexOf("")][3] == 1) {
        clickable_id = shuffled.indexOf("") -1;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }
}
function animateMovement(clickable_id, empty_id) {
    if (clickable_id - 4 == empty_id) {
        console.log(shuffled[clickable_id]);
        document.getElementById(shuffled[clickable_id]).className += " animate-up";
    } else if (clickable_id + 1 == empty_id) {
        document.getElementById(shuffled[clickable_id]).className += " animate-right";
    } else if (clickable_id + 4 == empty_id) {
        document.getElementById(shuffled[clickable_id]).className += " animate-down";
    } else if (clickable_id - 1 == empty_id) {
        document.getElementById(shuffled[clickable_id]).className += " animate-left";
    }
}   

function checkIfWon() {
    var isSolved = true;
    for (var i = 0; i < ids.length; i++) {
        if (ids[i] !== shuffled[i]) {
            isSolved = false;
            break;
        }
    }
    if (isSolved) {
        stopTimer();
       shuffleSound.pause();
        winSound.currentTime = 0; 
        winSound.play(); 
        var html = "";
        html += "<img src='win.gif' alt='Congrats !! You won' />";
        // html += "<p>Total time it took you to solve this puzzle (in seconds): " + seconds + "</p>";
        // html += "<p>Total number of moves it took you to solve this puzzle: " + moves + "</p>";

       //  document.getElementById("win").innerHTML = html;
       // // document.body.style.backgroundImage = "url('bg.png')"; 
       //  document.body.style.backgroundRepeat = "no-repeat";
       //  document.body.style.backgroundSize = "cover";
       //  document.getElementById("main").style.animation = "spin 2s linear infinite"; 
        displayCrackers();
    }
}
function cheat() {
     shuffleSound.pause();
    var audio = new Audio('cheatsound.mp3'); 
    audio.play();
        checkIfWon();
            shuffled = ids.slice(); // Reset the puzzle to the original order
            displayBoard(); // Display the solved puzzle
            document.getElementById('win').innerText = 'Cheater!';
        }


function displayCrackers() {
    var firecrackerContainer = document.createElement('div');
    firecrackerContainer.id = 'firecracker-container';

    for (var i = 0; i < 10; i++) { // Increase the number of firecrackers to 10
        var firecracker = document.createElement('div');
        firecracker.className = 'firecracker';
        firecracker.style.left = Math.random() * window.innerWidth + 'px';
        firecracker.style.animationDelay = Math.random() + 's';
        firecrackerContainer.appendChild(firecracker);
    }

    document.body.appendChild(firecrackerContainer);

    setTimeout(function () {
        document.body.removeChild(firecrackerContainer);
        // After removing firecrackers, show an alert to play again
        var playAgain = confirm("Congratulations! You solved the puzzle.\nDo you want to play again?");
        if (playAgain) {
            // Reload the page if the player wants to play again
            location.reload();
        }
    }, 3000); 
}

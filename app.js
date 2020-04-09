var turnToPlay;
var player1 = "Player 1";
var player2 = "Player 2";
var player1Symbol = 'X';
var player2Symbol = 'O';
var player1Win = 0;
var player2Win = 0;
var draw = 0;
var numberOfGame = 0;
var counter = 0;
var arr = [1,2,3,4,5,6,7,8,9];
var gameDecided = false;
var boxColor = "#BFEFFF";
var winColor = "maroon";
var div = document.querySelectorAll('.container>div');
var message = document.querySelector('.message');
var turn = document.querySelector('.turn');
var score1 = document.querySelector('.p1');
var score2 = document.querySelector('.p2');
var tie = document.querySelector('.draw');
var totalGames = document.querySelector('.total');
var nextGame = document.querySelector('.next-btn');
var closeGame = document.querySelector('.close-btn');
var restartGame = document.querySelector('.restart-btn');
var changeInfo = document.querySelector('.change-info');

var handleChangeTicTacBox = function (event) {   
    if (checkDivEmpty(event.target.textContent) && !gameDecided) {
        var temp = Number(event.target.classList.item(0).charAt(3));
        if (turnToPlay == 1) {
            event.target.textContent = player1Symbol;
        } else {
            event.target.textContent = player2Symbol;
        }
        arr[temp] = event.target.textContent;
        var check = gameStatus();
        if (check[0]) {
            if (check[1] == player1Symbol) {
                message.textContent = player1 + " won the game";
                message.style.display = "block";
                player1Win++;
            } else {
                message.textContent = player2 + " won the game";
                message.style.display = "block";
                player2Win++;
            }
        } 
        
        counter++;
        document.querySelector('.scoreboard').style.display = "block";
        document.querySelector('.player-info').style.display = "none";
        if(counter == 9 && !check[0]) {
            message.textContent = "This game is Draw";
            message.style.display = "block";
        }
        if(turnToPlay === 1) {
            turnToPlay = 2;
        } else {
            turnToPlay = 1;
        }
        checkTurn();
    }
}

var checkDivEmpty = function (div) {
    if (div == '') {
       return true;
   } else {
       return false;
   }
}

var gameStatusCheck = function  (num1, num2, num3) {
    if (arr[num1] === arr[num2] && arr[num2] === arr[num3]) {
        displayLine(num1);
        displayLine(num2);
        displayLine(num3);
        gameDecided = true;
        return true;
    }
}

var gameStatus = function () {
    var winStatus = [false,'']; 

    if (!arr.includes('')) {
        if (gameStatusCheck(0,1,2)) {
            winStatus = [true,arr[0]];
        } else if (gameStatusCheck(0,3,6)) {
            winStatus = [true,arr[0]];
        } else if (gameStatusCheck(0,4,8)) {
            winStatus = [true,arr[0]];
        } else if (gameStatusCheck(4,1,7)) {
            winStatus = [true,arr[7]];
        } else if (gameStatusCheck(8,5,2)) {
            winStatus = [true,arr[5]];
        } else if (gameStatusCheck(6,4,2)) {
            winStatus = [true,arr[2]];
        } else if (gameStatusCheck(6,7,8)) {
            winStatus = [true,arr[6]];
        } else if (gameStatusCheck(3,4,5)) {
            winStatus = [true,arr[3]];
        } 
    }
    return winStatus;
}

var checkTurn = function () {
    if(turnToPlay === 1) {
        turn.textContent = player1 + "'s Turn";
    } else {
        turn.textContent = player2 + "'s Turn";
    }
}

var score = function () {
    score1.textContent = player1Win;
    score2.textContent = player2Win;
    tie.textContent = draw;
    totalGames.textContent = numberOfGame;
}

var displayLine = function(num) {
    div[num].style.backgroundColor = winColor;
}

var handleNextGame = function () {
    arr = [1,2,3,4,5,6,7,8,9];
    counter = 0;
    numberOfGame++;
    if (!gameDecided) {
        draw++;
    }
    gameDecided = false;
    message.textContent = '';
    message.style.display = "none";
    div.forEach(function (divPointer) {
        divPointer.textContent = '';
        divPointer.style.backgroundColor = boxColor;
        score();
        startingFirst();
    })
}

var startingFirst = function () {
    turn.textContent = "";
    var number = Math.floor(Math.random() * 2) + 1;
    if (number === 1) {
        turnToPlay = 1;
        turn.textContent = "First Player: " + player1;
    } else {
        turnToPlay = 2;
        turn.textContent = "First Player: " + player2;
    }  
}

var handleClose = function () {
   window.close();
    // location.reload();
}

var handleChangeInfo = function () {
    if (counter == 0) {
        if (document.querySelector('.p1Name').value != '') {
            player1 = document.querySelector('.p1Name').value; 
         } else {
             player1 = "Player 1";
         }
         if (document.querySelector('.p1Symbol').value != '') {
             if (document.querySelector('.p1Symbol').value.length >= 1) 
             player1Symbol = document.querySelector('.p1Symbol').value.charAt(0);
         }
         if (document.querySelector('.p2Name').value != '') {
            player2 = document.querySelector('.p2Name').value; 
         } else {
             player2 = "Player 2";
         }
         if (document.querySelector('.p2Symbol').value != '') {
             if (document.querySelector('.p2Symbol').value.length >= 1) 
             player2Symbol = document.querySelector('.p2Symbol').value.charAt(0);
         }
             document.querySelector('.p1-name').textContent = player1;
             document.querySelector('.p2-name').textContent = player2;
     
    }
    startingFirst();
    checkTurn();
    score();
}
var handleRestart = function () {
    if (gameDecided == false && counter != 9) {
        arr = [1,2,3,4,5,6,7,8,9];
        counter = 0;
        gameDecided = false;
        message.textContent = '';
        message.style.display = "none";
        div.forEach(function (divPointer) {
            divPointer.textContent = '';
            divPointer.style.backgroundColor = boxColor;
            score();
            startingFirst();
        })
    }

}
startingFirst();
checkTurn();
score();
handleChangeInfo();
document.querySelector('.player-info').style.display = "block";


div.forEach(function (divPointer) {
     divPointer.addEventListener('click',handleChangeTicTacBox)
})
nextGame.addEventListener('click',handleNextGame);
closeGame.addEventListener('click',handleClose);
restartGame.addEventListener('click',handleRestart);
changeInfo.addEventListener('click',handleChangeInfo);


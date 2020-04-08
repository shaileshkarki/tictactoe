//var player1 = true; var player2 = false;
var turnToPlay;
var player1 = "Player 1";
var player2 = "Player 2";
var player1Symbol = 'X';
var player2Symbol = 'O';
var player1Win = 0;
var player2Win = 0;
var numberOfGame = 0;
var counter = 0;
//var gameEnd = false; //to check if game is over i.e., game is not won before filling up all boxes
var arr = [0,1,2,3,4,5,6,7,8,9];
var div = document.querySelectorAll('.container>div');
var result = document.querySelector('.result');
var turn = document.querySelector('.turn');
var score1= document.querySelector('.p1');
var score2= document.querySelector('.p2');
var totalGames= document.querySelector('.total');
var newGame = document.querySelector('.new-btn');
var restartGame = document.querySelector('.restart-btn');
var changeInfo = document.querySelector('.change-info');

var handleChangeDiv = function (event) {   
    if (checkDivEmpty(event.target.textContent)) {
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
                result.textContent = player1 + " won the game";
                player1Win++;
            } else {
                result.textContent = player2 + " won the game";
                player2Win++;
            }
        } 
        counter++;
        if(counter == 9 && !check[0]) {
            result.textContent = "This game is Draw";
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
        return true;
    }
}

var gameStatus = function () {
    var winStatus = [false,''];   
    if (!arr.includes(' ')) {
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
    totalGames.textContent = numberOfGame;
}

var displayLine = function(num) {
    div[num].style.backgroundColor = "maroon";
}

var handleNewGame = function () {
    arr = [0,1,2,3,4,5,6,7,8,9];
    numberOfGame++;
    result.textContent = ' ';
    div.forEach(function (divPointer) {
        divPointer.textContent = '';
        divPointer.style.backgroundColor = "antiquewhite";
        score();
        startingFirst();
    })
}

var startingFirst = function () {
    var number = Math.floor(Math.random() * 2) + 1;
    if (number === 1) {
        play = true;
    } else {
        play = false;
    }
    turn.textContent = "";
    if (number === 1) {
        turn.textContent = player1 + " will start the game";
        
    } else {
        turn.textContent = player2 + " will start the game";
    }
}

var handleRestartGame = function () {
    location.reload();
}

var handleChangeInfo = function () {
    if (document.querySelector('.p1Name').value != '') {
       player1 = document.querySelector('.p1Name').value; 
    }
    if (document.querySelector('.p1Symbol').value != '') {
        if (document.querySelector('.p1Symbol').value.length >= 1) 
        player1Symbol = document.querySelector('.p1Symbol').value.charAt(0);
    }
    if (document.querySelector('.p2Name').value != '') {
        player2 = document.querySelector('.p2Name').value; 
    }
    if (document.querySelector('.p2Symbol').value != '') {
        if (document.querySelector('.p2Symbol').value.length >= 1) 
        player1Symbol = document.querySelector('.p2Symbol').value.charAt(0);
    }
    document.querySelectorAll('.p1-name').forEach(function (name) {
        document.querySelectorAll('.p1-name').textContent = player1;

    })
    document.querySelectorAll('.p2-name').forEach(function (name) {
        document.querySelectorAll('.p2-name').textContent = player2;

    })

}
startingFirst();
checkTurn();
score();

div.forEach(function (divPointer) {
    divPointer.addEventListener('click',handleChangeDiv)
})
newGame.addEventListener('click',handleNewGame);
restartGame.addEventListener('click',handleRestartGame);
changeInfo.addEventListener('click',handleChangeInfo);


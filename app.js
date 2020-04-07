var player1 = 1;
var player2 = 2;
var x = 'X';
var o = 'O';
var counter = 0;
var arr = [0,1,2,3,4,5,6,7,8,9];
var div = document.querySelectorAll('.container');
var result = document.querySelector('.result');

var handleChangeDiv = function (event) {   
    if (checkDivEmpty(event.target.textContent)) {
        var temp = Number(event.target.classList.item(0).charAt(3));
        if (player1) {
            event.target.textContent = o;
        } else {
            event.target.textContent = x;
        }
        arr[temp] = event.target.textContent;
        var check = winCheck();
        if (check[0]) {
            if (check[1] == 'O') {
                result.textContent = "Player 1 won the game";
            } else {
                result.textContent = "Player 2 won the game";
            }
        }
        counter++;
        if(counter == 9 && !winCheck()) {
            result.textContent = "The game is Draw";
        }
        player1 = (!player1);
    }
}

var checkDivEmpty = function (div) {
    if (div == '') {
       return true;
   } else {
       return false;
   }
}

var winCheck = function () {
    var winStatus = [false,''];   
    if (arr.length > 1   ) {
        if (arr[0] === arr[1] && arr[1] === arr[2]) {
            winStatus = [true,arr[0]];
        } else if (arr[0] === arr[3] && arr[3] === arr[6]) {
            winStatus = [true,arr[0]];
        } else if (arr[0] === arr[4] && arr[4] === arr[8]) {
            winStatus = [true,arr[0]];
        } else if (arr[1] === arr[4] && arr[4] === arr[7]) {
            winStatus = [true,arr[7]];
        } else if (arr[2] === arr[5] && arr[5] === arr[8]) {
            winStatus = [true,arr[5]];
        } else if (arr[6] === arr[4] && arr[4] === arr[2]) {
            winStatus = [true,arr[2]];
        } 
    }
    return winStatus;
}

var matchDivToArray = function (event) {

}

div.forEach(function (divPointer) {
    divPointer.addEventListener('click',handleChangeDiv)
})
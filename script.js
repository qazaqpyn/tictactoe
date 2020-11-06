const playBtn = document.querySelector(".play-button");
const newBtn = document.querySelector(".new-button"); 
const gameBoard = document.querySelectorAll(".box");
const xBoard = document.querySelector(".X-board");
const yBoard = document.querySelector(".Y-board");
const winnerText = document.querySelector(".Result");

let board = [['a','b','c'],['q','w','e'],['r','t','y']];
let numberXnY = 0;
let whoGo = 'X';
let playMode = false;

xBoard.addEventListener('click',()=>{
    if (xBoard.getAttribute('class')=='X-board') {
        xBoard.classList.remove('X-board');
        xBoard.classList.add('board-selected');
    } else {
        xBoard.classList.remove('board-selected');
        xBoard.classList.add('X-board');
    }
});

yBoard.addEventListener('click',()=>{
    if (yBoard.getAttribute('class')=='Y-board') {
        yBoard.classList.remove('Y-board');
        yBoard.classList.add('board-selected');
    } else {
        yBoard.classList.remove('board-selected');
        yBoard.classList.add('Y-board');
    }
});

const Game = () => {
    const win = () => {
        if ((board[0][0]===board[1][1] && board[1][1]===board[2][2]) || (board[0][2]===board[1][1] && board[1][1]===board[2][0])){
            // winnerText.textContent = board[0]
            console.log("win");
            return true;
        }
        for (let i=0; i<3; i++) {
            if ((board[i][0]===board[i][1] && board[i][1]===board[i][2]) || (board[0][i]===board[1][i] && board[2][i])) {
                console.log("win");
                return true;
            } else {
                console.log("still playing");
                return false;
            }
        }
    };
    const draw = () => {
        if (numberXnY === 9){
            if (!win()) {
                console.log("draw");
                return true;
            }
        }
    };
    const newGame = () => {
        console.log("newgame");
        board = [['a','b','c'],['q','w','e'],['r','t','y']];
        numberXnY = 0;

        gameBoard.forEach((box)=>{
            box.innerHTML = '';
        });

        xBoard.classList.remove('board-selected');
        xBoard.classList.add('X-board');
        yBoard.classList.remove('board-selected');
        yBoard.classList.add('Y-board');

        whoGo = 'X';

    };
    const playGame = (e) => {
        console.log("first");
        if (!win() && !draw()) {
            console.log("second");
            let box = document.getElementById(e.target.id);
            box.innerText = whoGo;
            numberXnY++;
    
            if (e.target.id==='b11') {
                board[0][0] = whoGo;
            } else if (e.target.id==='b12') {
                board[0][1]=whoGo;
            } else if (e.target.id==='b13') {
                board[0][2] = whoGo;
            } else if (e.target.id==='b21') {
                board[1][0] = whoGo;
            } else if (e.target.id==='b22') {
                board[1][1] = whoGo;
            } else if (e.target.id==='b23') {
                board[1][2]=whoGo;
            } else if (e.target.id==='b31') {
                board[2][0] = whoGo;
            } else if (e.target.id==='b32') {
                board[2][1]=whoGo;
            } else if (e.target.id==='b33') {
                board[2][2]=whoGo;
            }
    
            if (whoGo==='X'){
                whoGo = 'Y';
            } else {
                whoGo = 'X';
            }
            win();
            draw();
        }
    };

    return {playGame, newGame};
}; 

const game1 = Game();
playBtn.addEventListener('click',()=>{
    playMode = true; 
}); 

newBtn.addEventListener('click',()=>game1.newGame());
gameBoard.forEach((box)=>{
    box.addEventListener('click',(e)=>{
        console.log(e.target.id);
        game1.playGame(e);
    });
});

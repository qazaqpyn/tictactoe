const playBtn = document.querySelector(".play-button");
const newBtn = document.querySelector(".new-button"); 
const gameBoard = document.querySelectorAll(".game-board div");
const xBoard = document.querySelector(".X-board");
const yBoard = document.querySelector(".Y-board");

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
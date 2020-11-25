const playBtn = document.querySelector(".play-button");
const newBtn = document.querySelector(".new-button"); 
const gameBoard = document.querySelectorAll(".box");
const xBoard = document.querySelector(".X-board");
const yBoard = document.querySelector(".Y-board");
const winnerText = document.querySelector(".Result");
const ai = document.getElementById('AI');
const nightLight = document.getElementById("changer");
const bodyMode = document.getElementById("body-changer");

let aiPower = ai.value;
let playBtnPressed  = false;
let board = [['1','2','3'],['4','5','6'],['7','8','9']];
let numberXnY = 0;
let whoGo = 'X';
let playMode = false;
let gameMode = '2-players';
let whichSide;

//night-light mode
nightLight.addEventListener('click', ()=>{
    if(bodyMode.getAttribute('class')==="light-mode") {
        bodyMode.classList.remove('light-mode');
        bodyMode.classList.add('night-mode');
        nightLight.classList.remove('light-mode-text');
        nightLight.classList.add('night-mode-text');
        localStorage.setItem('mode',bodyMode.getAttribute('class'));
    } else {
        bodyMode.classList.remove('night-mode');
        bodyMode.classList.add('light-mode');
        nightLight.classList.remove('night-mode-text');
        nightLight.classList.add('light-mode-text');
        localStorage.setItem('mode',bodyMode.getAttribute('class'));
    }
});

// localStorage of the light-night mode
if (storageAvailable('localStorage')) {
    if(!localStorage.getItem('mode')) {
        populateStorage();
      } else {
        setStyles();
      }
  }
  else {
    console.log("Sorry, LocalStorage doen't work; cant save light-night settings");
  }

  // func for setting style if there's in memory
  function setStyles() {
      let currentMode = localStorage.getItem("mode");
      if (currentMode==="night-mode") {
        bodyMode.classList.remove('light-mode');
        bodyMode.classList.add('night-mode');
        nightLight.classList.remove('light-mode-text');
        nightLight.classList.add('night-mode-text');
      }
  }
  // create in memory
  function populateStorage() {
    localStorage.setItem('mode',bodyMode.getAttribute('class'));
    setStyles();
  }


//codition for 2 players, AI
playBtn.addEventListener('click',()=>{
    aiPower = ai.value;
    playBtnPressed = true;
    if (xBoard.getAttribute('class')==='board-selected' && yBoard.getAttribute('class')==='board-selected') {
        gameMode = '2-players';
        whichSide = 'both'
        console.log(gameMode);
    } else if (aiPower === 'easy') {
        console.log('easy');
        gameMode = 'ai-easy';
        if (xBoard.getAttribute('class')==='board-selected'){
            whichSide = 'X';
        } else if (yBoard.getAttribute('class')==='board-selected'){
            whichSide = 'Y';
        } else {
            whichSide = '0';
        }
        console.log(whichSide);
    }else {
        console.log("impossible");
        gameMode = 'ai-impossible';
        if (xBoard.getAttribute('class')==='board-selected'){
            whichSide = 'X';
        } else if (yBoard.getAttribute('class')==='board-selected'){
            whichSide = 'Y';
        } else {
            whichSide = '0';
        }
        console.log(whichSide);
    }
})

//random number 
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }




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
            console.log("win-45degree");
            return true;
        }
        for (let i=0; i<3; i++) {
            if ((board[i][0]===board[i][1] && board[i][1]===board[i][2]) || (board[0][i]===board[1][i] && board[2][i]===board[1][i])) {
                console.log("win-line");
                return true;
            } 
        }
        console.log("still playing");
        return false;
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
        board = [['1','2','3'],['4','5','6'],['7','8','9']];
        console.log(board);
        numberXnY = 0;

        gameBoard.forEach((box)=>{
            box.innerHTML = '';
        });
        winnerText.innerText='';

        xBoard.classList.remove('board-selected');
        xBoard.classList.add('X-board');
        yBoard.classList.remove('board-selected');
        yBoard.classList.add('Y-board');

        whoGo = 'X';
        // playBtnPressed = true;
    };
    const playGame = (e) => {
        console.log("first");
        
        if (!win() && !draw() && playBtnPressed) {
            if (whichSide === whoGo || whichSide === 'both') {
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
                if (win()){
                    playBtnPressed = false;
                    if (whoGo === 'X') {
                        winnerText.textContent = 'Winner is Y';
                    } else {
                        winnerText.textContent = 'Winner is X';
                    }
                    
                }
                if (draw()) {
                    playBtnPressed = false;
                    winnerText.textContent = 'No Winner';
                }
            }
            while (gameMode==="ai-easy" && whoGo !== whichSide && !win() && !draw()) {
                let random10 = 0;
                let random01 = 0;
                while (board[random10][random01]==='X' || board[random10][random01]==='Y') {
                    random10 = getRandomInt(3);
                    random01 = getRandomInt(3);
                }
                board[random10][random01] = whoGo;
                numberXnY++;
                console.log('numberXY ' + numberXnY);
                if (random01===0 && random10===0) {
                    let box = document.getElementById('b11');
                    box.innerText = whoGo;
                } else if (random01===1 && random10===0) {
                    let box = document.getElementById('b12');
                    box.innerText = whoGo;
                } else if (random01===2 && random10===0) {
                    let box = document.getElementById('b13');
                    box.innerText = whoGo;
                } else if (random01===0 && random10===1) {
                    let box = document.getElementById('b21');
                    box.innerText = whoGo;
                } else if (random01===1 && random10===1) {
                    let box = document.getElementById('b22');
                    box.innerText = whoGo;
                } else if (random01===2 && random10===1) {
                    let box = document.getElementById('b23');
                    box.innerText = whoGo;
                } else if (random01 === 0 && random10===2){
                    let box = document.getElementById('b31');
                    box.innerText = whoGo;
                } else if (random01===1 && random10===2) {
                    let box = document.getElementById('b32');
                    box.innerText = whoGo;
                } else if (random01===2 && random10===2) {
                    let box = document.getElementById('b33');
                    box.innerText = whoGo;
                }

                if (whoGo==='X'){
                    whoGo = 'Y';
                } else {
                    whoGo = 'X';
                }
                if (win()){
                    playBtnPressed = false;
                    if (whoGo === 'X') {
                        winnerText.textContent = 'Winner is Y';
                    } else {
                        winnerText.textContent = 'Winner is X';
                    }
                }
                if (draw()) {
                    playBtnPressed = false;
                    winnerText.textContent = 'No Winner';
                }
                console.log(board);

            }  if (gameMode === 'ai-impossible' && whoGo !== whichSide) {
                return;
            } 
        }
    };

    return {playGame, newGame};
}; 

const game1 = Game();
playBtn.addEventListener('click',()=>{
    playMode = true; 
    console.log("before while");
    if (whichSide==='0') {
        console.log("in while");
        game1.playGame();
    }
}); 

newBtn.addEventListener('click',()=>game1.newGame());

gameBoard.forEach((box)=>{
    box.addEventListener('click',(e)=>{
        console.log(e.target.id);
        game1.playGame(e);
    });
});

// function to  localStorage supported and available ???
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}



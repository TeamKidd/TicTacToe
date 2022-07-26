const slots = [...document.getElementsByClassName("box")];
const EndText = document.getElementsByClassName("end-text");
const detailtext = document.getElementById("detail-text");
var boardarr = [...Array(9)];
var playerturn = true;
var canplay = true;
let turns = 0;


const boxClick = (e) =>{
    //extract data
    let _id = [...e.target.parentNode.children].indexOf(e.target);
    if(boardarr[_id]!=null || !canplay){return;}

    //game logic
    ++turns;
    e.target.innerText = playerturn?"X":"O";
    boardarr[_id]=playerturn;
    playerturn = !playerturn;
    e.target.style.cursor = "default";
    e.target.removeEventListener('click', boxClick);

    detailtext.innerHTML = `Player ${playerturn?"X":"O"} Turn`;
    if(checkWin()){
        canplay = false;
        detailtext.innerHTML = `Player ${!playerturn?"X":"O"} Has Won`;
        return;
    }
    if(turns==9){
        canplay = false;
        detailtext.innerHTML= "Game has ended in a draw";
    }
};


const checkWin = () =>{
    for(let i = 0; i < 3; ++i){
        if(boardarr[i]!=null&&boardarr[i]===boardarr[i+3] && boardarr[i+6]===boardarr[i+3]){return true;}
        let j = i;
        i *= 3;
        if(boardarr[i]!=null&&boardarr[i]===boardarr[i+1] && boardarr[i+1]===boardarr[i+2]){return true;}
        i = j;
    }
    if(boardarr[4]!=null&&((boardarr[0]===boardarr[4]&&boardarr[0]===boardarr[8])||(boardarr[2]===boardarr[4]&&boardarr[4]===boardarr[6]))){return true;}
    return false;
}


const setupGame = () =>{
    //reset variables
    [...document.getElementsByClassName("box")].forEach((idx)=>{
        idx.innerText="";
        idx.style.cursor="pointer";
    });
    boardarr = [...Array(9)];
    turns=0;
    playerturn = true;

    slots.forEach((val,idx)=>{
        val.addEventListener('click', boxClick);
    });
    canplay = true;
    detailtext.innerHTML = "Player X Turn";
}


setupGame();
document.getElementById("Restart").addEventListener('click', setupGame);
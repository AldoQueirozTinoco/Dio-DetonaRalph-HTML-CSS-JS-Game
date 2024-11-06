const state = {
  
    view:{
        squares:document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score:document.querySelector("#score"),
    },
    values:{
        timerId: setInterval(randomSquare,1000),
        countDownTimerId: setInterval(countDown,1000),
        gameVelocity:1000,
        hitPosition:0,
        result:0,
        currentTime:60,
    }
};

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}`)
    audio.volume = 0.2
    audio.play();
}

function countDown(){
    state.values.currentTime--;
    state.view.timeleft.textContent = state.values.currentTime;

    if(state.values.currentTime <=0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
    ("Game Over! O seu resultado foi " + state.values.result);
    }
}


function addListenerHitbox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", () =>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("videoplayback.m4a");
            }
        })
    })
}


function init(){
    //moveEnemy();
    addListenerHitbox();
}

init();

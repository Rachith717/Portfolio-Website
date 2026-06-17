const audio = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", () => {

    if(audio.paused){
        audio.play();
        musicBtn.classList.add("playing");
    }
    else{
        audio.pause();
        musicBtn.classList.remove("playing");
    }

});
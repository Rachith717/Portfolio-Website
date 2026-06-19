const videos = document.querySelectorAll(".hero-video");

let current = 0;

// Show first video
videos[current].classList.add("active");
videos[current].play();

// Change every 5 seconds
setInterval(() => {

    videos[current].pause();
    videos[current].currentTime = 0;
    videos[current].classList.remove("active");

    current = (current + 1) % videos.length;

    videos[current].classList.add("active");
    videos[current].play();

}, 5000);
console.log("Wildlife Portfolio Loaded");
window.addEventListener("scroll", () => {

    const navbar =
    document.querySelector(".navbar");

    if (window.scrollY > 50) {

        navbar.style.background =
        "rgba(0,0,0,0.85)";

    } else {

        navbar.style.background =
        "rgba(0,0,0,0.35)";

    }

});
document.addEventListener("DOMContentLoaded", () => {

    const clickSound =
    document.getElementById("clickSound");

    document.addEventListener("click", (e) => {

        const target = e.target.closest(
            "button, a, .btn"
        );

        if (!target) return;

        clickSound.currentTime = 0;

        clickSound.play().catch(() => {});

    });

});
// other code above...

const exploreBtn = document.getElementById("exploreBtn");

if (exploreBtn) {
    exploreBtn.addEventListener("click", function() {

        const clickSound = document.getElementById("clickSound");

        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play();
        }

        setTimeout(() => {
            window.location.href = "gallery.html";
        }, 500);

    });
}
// const photos = document.querySelectorAll(".featured-photo");

// const observer = new IntersectionObserver((entries) => {

//     entries.forEach(entry => {

//         if (entry.isIntersecting) {
//             entry.target.classList.add("show");
//         }

//     });

// }, {
//     threshold: 0.2
// });

// photos.forEach(photo => {
//     observer.observe(photo);
// });
// const cards = document.querySelectorAll(".photo-card");

// const observer = new IntersectionObserver((entries) => {

//     entries.forEach((entry) => {

//         if (entry.isIntersecting) {

//             entry.target.classList.add("show");

//         }

//     });

// }, {
//     threshold: 0.2
// });

// cards.forEach((card) => {
//     observer.observe(card);
// });
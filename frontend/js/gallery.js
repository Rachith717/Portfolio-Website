// Global Photos Array
let photos = [];

// Gallery Container
const galleryGrid =
document.getElementById("gallery-grid");

// Modal Elements
const modal =
document.getElementById("photoModal");

const modalImage =
document.getElementById("modalImage");

const modalTitle =
document.getElementById("modalTitle");

const modalLocation =
document.getElementById("modalLocation");

const modalCamera =
document.getElementById("modalCamera");

const modalLens =
document.getElementById("modalLens");

const modalSettings =
document.getElementById("modalSettings");

const modalDescription =
document.getElementById("modalDescription");

const closeBtn =
document.querySelector(".close-btn");

// Load Photos From Backend
async function loadPhotos() {

    try {

        const response =
        await fetch(
            "http://localhost:5000/api/photos"
        );

        photos =
        await response.json();

        console.log("Photos Loaded:");
        photos.forEach(photo => {
    console.log(
        photo.title,
        "=>",
        photo.category
    );
});
        displayPhotos(photos);

    }

    catch(error) {

        console.error(
            "Error Loading Photos:",
            error
        );

    }

}

// Display Photos
function displayPhotos(photoArray) {

    galleryGrid.innerHTML = "";

    photoArray.forEach(photo => {

        galleryGrid.innerHTML += `

        <div class="photo-card"
             onclick="openModal(${photo.id})">

            <img
                src="${photo.image_url}"
                alt="${photo.title}"
            >

            <div class="photo-info">

                <h3>
                    ${photo.title || "Untitled"}
                </h3>

            </div>

        </div>

        `;

    });

}

// Filter Buttons
const buttons =
document.querySelectorAll(".filter-btn");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        buttons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const category =
        button.dataset.category;
        console.log("Selected:", category);
console.log(photos);

        if(category === "all") {

            displayPhotos(photos);
            return;

        }

        const filteredPhotos =
        photos.filter(photo =>
            photo.category === category
        );

        displayPhotos(filteredPhotos);

    });

});

// Open Modal
function openModal(id) {

    const photo =
    photos.find(
        photo => photo.id === id
    );

    if(!photo) return;

    modalImage.src =
    photo.image_url;

    modalTitle.textContent =
    photo.title || "Untitled";

    modalLocation.textContent =
    photo.location || "N/A";

    modalCamera.textContent =
    photo.camera || "N/A";

    modalLens.textContent =
    photo.lens || "N/A";

    modalSettings.textContent =
    photo.settings || "N/A";

    modalDescription.textContent =
    photo.description ||
    "No description available.";

    modal.style.display = "flex";

}

// Close Button
if(closeBtn){

    closeBtn.addEventListener("click", () => {

        modal.style.display = "none";

    });

}

// Close Modal When Clicking Outside
window.addEventListener("click", (e) => {

    if(e.target === modal) {

        modal.style.display = "none";

    }

});

// Load Photos When Page Opens
loadPhotos();
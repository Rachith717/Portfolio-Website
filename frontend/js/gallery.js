const photos = [
    {
        id: 1,
        title: "Kingfisher",
        category: "birds",
        image: "images/bird1.jpeg",
        location: "Ranganathittu",
        camera: "Canon R7",
        lens: "RF 100-400mm",
        settings: "f/5.6 | 1/1600 | ISO 400",
        description: "A kingfisher perched above the water waiting for prey."
    },
    {
        id: 2,
        title: "Tiger",
        category: "mammals",
        image: "images/tiger.jpeg",
        location: "Kabini",
        camera: "Canon R7",
        lens: "RF 100-400mm",
        settings: "f/7.1 | 1/1000 | ISO 800",
        description: "A tiger crossing the forest trail during sunrise."
    },
    {
        id: 3,
        title: "Elephant",
        category: "mammals",
        image: "images/elephant.jpg",
        location: "Bandipur",
        camera: "Canon R7",
        lens: "RF 100-400mm",
        settings: "f/8 | 1/800 | ISO 500",
        description: "A large elephant feeding near a water source."
    }
];

// Gallery Container
const galleryGrid = document.getElementById("gallery-grid");

// Modal Elements
const modal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalLocation = document.getElementById("modalLocation");
const modalCamera = document.getElementById("modalCamera");
const modalLens = document.getElementById("modalLens");
const modalSettings = document.getElementById("modalSettings");
const modalDescription = document.getElementById("modalDescription");
const closeBtn = document.querySelector(".close-btn");

// Display Photos
function displayPhotos(photoArray) {
    galleryGrid.innerHTML = "";

    photoArray.forEach(photo => {
        galleryGrid.innerHTML += `
            <div class="photo-card" onclick="openModal(${photo.id})">

                <img src="${photo.image}" alt="${photo.title}">

                <div class="photo-info">
                    <h3>${photo.title}</h3>
                </div>

            </div>
        `;
    });
}

// Initial Load
displayPhotos(photos);

// Filter Buttons
const buttons = document.querySelectorAll(".filter-btn");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        buttons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.category;

        if (category === "all") {
            displayPhotos(photos);
            return;
        }

        const filteredPhotos = photos.filter(photo =>
            photo.category === category
        );

        displayPhotos(filteredPhotos);
    });
});

// Open Modal
function openModal(id) {

    const photo = photos.find(photo => photo.id === id);

    if (!photo) return;

    modalImage.src = photo.image;
    modalTitle.textContent = photo.title;
    modalLocation.textContent = photo.location;
    modalCamera.textContent = photo.camera;
    modalLens.textContent = photo.lens;
    modalSettings.textContent = photo.settings;
    modalDescription.textContent = photo.description;

    modal.style.display = "flex";
}

// Close Button
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Click Outside Modal
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
// Global Photos Array Storage
let photos = [];
const API_URL = "http://localhost:5000/api";

// DOM Elements
const galleryGrid = document.getElementById("gallery-grid");
const categoryButtons = document.querySelectorAll(".filter-btn");

// Lightbox Modal DOM Elements
const modal = document.getElementById("lightbox-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalLocation = document.getElementById("modal-location");
const modalSpecs = document.getElementById("modal-specs");
const closeModalBtn = document.querySelector(".close-modal");

// Fetch active entries from Express Service layer
async function fetchPhotos() {
    try {
        galleryGrid.innerHTML = `<div class="loading">Tracking wildlife archive items...</div>`;
        const response = await fetch(`${API_URL}/photos`);
        if (!response.ok) throw new Error("Could not pull digital photography catalog.");
        photos = await response.ok ? await response.json() : [];
        renderGallery(photos);
    } catch (err) {
        console.error(err);
        galleryGrid.innerHTML = `<div class="error">Failed to synchronize photography logs. Try reloading your local server instance.</div>`;
    }
}

// Generate UI Cards
function renderGallery(items) {
    galleryGrid.innerHTML = "";
    if (items.length === 0) {
        galleryGrid.innerHTML = `<div class="empty-state">No wildlife prints found inside this section.</div>`;
        return;
    }

    items.forEach((photo) => {
        const itemCard = document.createElement("div");
        itemCard.className = "gallery-item card";
        itemCard.innerHTML = `
            <img src="${photo.image_url}" alt="${photo.title}" loading="lazy" />
            <div class="gallery-overlay">
                <h4>${photo.title}</h4>
                <p><i class="fas fa-map-marker-alt"></i> ${photo.location || "Wild Environment"}</p>
            </div>
        `;
        itemCard.addEventListener("click", () => triggerLightbox(photo));
        galleryGrid.appendChild(itemCard);
    });
}

// Triggers full screen lightbox on image card action
function triggerLightbox(photo) {
    const modal = document.getElementById("lightbox-modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const modalLocation = document.getElementById("modal-location");
    const modalSpecs = document.getElementById("modal-specs");

    // Map properties fetched cleanly from your Supabase database
    modalImg.src = photo.image_url;
    modalTitle.textContent = photo.title;
    modalDesc.textContent = photo.description || "No specific log notes taken for this snapshot instance.";
    modalLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${photo.location || "Natural Habitat Location Unknown"}`;
    
    // Mount the wildlife photography camera gear specifications dynamically
    modalSpecs.innerHTML = `
        <span><i class="fas fa-camera"></i> ${photo.camera_body || "N/A"}</span>
        <span><i class="fas fa-lens"></i> ${photo.lens || "N/A"}</span>
        <span><i class="fas fa-clock"></i> ${photo.shutter_speed || "N/A"}</span>
        <span><i class="fas fa-adjust"></i> ${photo.aperture || "N/A"}</span>
        <span><i class="fas fa-sliders-h"></i> ISO ${photo.iso || "Auto"}</span>
    `;
    
    // Reveal full display frame safely
    modal.classList.add("active");
}

// Global Event Listener to close modal on background click or close action button
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("lightbox-modal");
    const closeBtn = document.querySelector(".close-modal");

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }

    // Dismiss the frame instantly if clicking on the shaded dark overlay area background
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });
    }
});

// Run Core Thread on Load initialization
document.addEventListener("DOMContentLoaded", fetchPhotos);
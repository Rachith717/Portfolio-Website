const photos = [

{
    id:1,
    title:"Kingfisher",
    category:"birds",
    image:"images/bird1.jpeg",
    location:"Ranganathittu",
    camera:"Canon R7",
    lens:"RF 100-400mm",
    settings:"f/5.6 | 1/1600 | ISO 400",
    description:"A kingfisher perched above the water waiting for prey."
},

{
    id:2,
    title:"Tiger",
    category:"mammals",
    image:"images/tiger.jpeg",
    location:"Kabini",
    camera:"Canon R7",
    lens:"RF 100-400mm",
    settings:"f/7.1 | 1/1000 | ISO 800",
    description:"A tiger crossing the forest trail during sunrise."
},

{
    id:3,
    title:"Elephant",
    category:"mammals",
    image:"images/elephant.jpg",
    location:"Bandipur",
    camera:"Canon R7",
    lens:"RF 100-400mm",
    settings:"f/8 | 1/800 | ISO 500",
    description:"A large elephant feeding near a water source."
}

];
const galleryGrid =
document.getElementById("gallery-grid");

function displayPhotos(photoArray)
{
    galleryGrid.innerHTML = "";

    photoArray.forEach(photo =>
    {
        galleryGrid.innerHTML += `

<div class="photo-card"
     onclick="openModal(${photo.id})">
            <img src="${photo.image}"
                 alt="${photo.title}">

            <div class="photo-info">

                <h3>${photo.title}</h3>

            </div>

        </div>

        `;
    });
}
displayPhotos(photos);
const buttons =
document.querySelectorAll(".filter-btn");

buttons.forEach(button =>
{
    button.addEventListener("click", () =>
    {
        buttons.forEach(btn =>
        {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category =
        button.dataset.category;

        if(category === "all")
        {
            displayPhotos(photos);
            return;
        }

        const filteredPhotos =
        photos.filter(photo =>
        photo.category === category);

        displayPhotos(filteredPhotos);
    });
});
const modal =
document.getElementById("photoModal");

function openModal(id)
{
    const photo =
    photos.find(p => p.id === id);

    document.getElementById("modalImage").src =
    photo.image;

    document.getElementById("modalTitle").textContent =
    photo.title;

    document.getElementById("modalLocation").textContent =
    photo.location;

    document.getElementById("modalCamera").textContent =
    photo.camera;

    document.getElementById("modalLens").textContent =
    photo.lens;

    document.getElementById("modalSettings").textContent =
    photo.settings;

    document.getElementById("modalDescription").textContent =
    photo.description;

    modal.style.display = "flex";
}
const closeBtn =
document.querySelector(".close-btn");

closeBtn.addEventListener("click", () =>
{
    modal.style.display = "none";
});
window.addEventListener("click", (e) =>
{
    if(e.target === modal)
    {
        modal.style.display = "none";
    }
});
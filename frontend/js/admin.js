if (
    localStorage.getItem(
        "adminLoggedIn"
    ) !== "true"
) {
    window.location.href =
    "login.html";
}
const form = document.getElementById("uploadForm");
const message = document.getElementById("message");
const photoList = document.getElementById("photoList");

// Upload Photo
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("title",
        document.getElementById("title").value);

    formData.append("category",
        document.getElementById("category").value);

    formData.append("location",
        document.getElementById("location").value);

    formData.append("camera",
        document.getElementById("camera").value);

    formData.append("lens",
        document.getElementById("lens").value);

    formData.append("settings",
        document.getElementById("settings").value);

    formData.append("description",
        document.getElementById("description").value);

    formData.append("image",
        document.getElementById("image").files[0]);

    try {

        const response = await fetch(
            "http://localhost:5000/api/upload",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        console.log(data);

        message.textContent =
            "Photo uploaded successfully!";

        form.reset();

        loadPhotos();

    } catch (error) {

        console.error(error);

        message.textContent =
            "Upload failed.";

    }

});

// Load Photos
async function loadPhotos() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/photos"
        );

        const photos = await response.json();

        photoList.innerHTML = "";

        photos.forEach(photo => {

            photoList.innerHTML += `

            <div class="admin-photo">

                <img
                    src="${photo.image_url}"
                    width="250"
                >

                <h3>
                    ${photo.title || "Untitled"}
                </h3>

                <p>
                    Category:
                    ${photo.category || "None"}
                </p>

                <button
                    onclick="editPhoto(${photo.id})">
                    Edit
                </button>

                <button
                    onclick="deletePhoto(${photo.id})">
                    Delete
                </button>

            </div>

            <hr>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// Edit Photo
async function editPhoto(id) {

    const title =
        prompt("Enter new title");

    if (!title) return;

    try {

        const response = await fetch(
            `http://localhost:5000/api/photos/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    title: title
                })
            }
        );

        const data = await response.json();

        console.log(data);

        loadPhotos();

    } catch (error) {

        console.error(error);

    }

}

// Delete Photo
async function deletePhoto(id) {

    const confirmDelete =
        confirm("Delete this photo?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(
            `http://localhost:5000/api/photos/${id}`,
            {
                method: "DELETE"
            }
        );

        const data =
            await response.json();

        console.log(data);

        loadPhotos();

    } catch (error) {

        console.error(error);

    }

}
function logout() {

    localStorage.removeItem(
        "adminLoggedIn"
    );

    window.location.href =
    "login.html";

}
// Initial Load
loadPhotos();

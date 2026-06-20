if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "login.html";
}

const API_URL = " https://portfolio-website-6d58.onrender.com/api";
const uploadForm = document.getElementById("upload-form");
const logoutBtn = document.getElementById("logout-btn");

if (uploadForm) {
    uploadForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const submitBtn = uploadForm.querySelector("button[type='submit']");
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = "Uploading to Habitat Buckets...";

        // Collect exact files and data references matching structural DB schema keys
        const fileInput = document.getElementById("photo-file");
        const formData = new FormData();

        if (fileInput.files.length === 0) {
            alert("Please pick a capture element before executing sync routines.");
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            return;
        }

        formData.append("image", fileInput.files[0]);
        formData.append("title", document.getElementById("photo-title").value);
        formData.append("description", document.getElementById("photo-desc").value);
        formData.append("category", document.getElementById("photo-category").value);
        formData.append("camera", document.getElementById("photo-camera").value);
        formData.append("lens", document.getElementById("photo-lens").value);
        formData.append("shutter", document.getElementById("photo-shutter").value);
        formData.append("aperture", document.getElementById("photo-aperture").value);
        formData.append("iso", document.getElementById("photo-iso").value);
        formData.append("location", document.getElementById("photo-location").value);

        try {
            const response = await fetch(`${API_URL}/upload`, {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                alert("Photograph deployed live cleanly onto the main portfolio matrix!");
                uploadForm.reset();
            } else {
                alert(`Upload Sequence Aborted: ${result.error}`);
            }
        } catch (error) {
            console.error("Networking breakdown:", error);
            alert("Server distribution network timed out.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("adminLoggedIn");
        window.location.href = "login.html";
    });
}
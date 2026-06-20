const express = require("express");
const multer = require("multer");
const supabase = require("../config/supabase");

const router = express.Router();

// Store files in memory buffer before pushing to Supabase
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 12 * 1024 * 1024 }, // 12MB limit for high-res photos
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed!"), false);
        }
    }
});

router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image file provided." });
        }

        // Clean file name to prevent bucket breakdown
        const fileExt = req.file.originalname.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        const filePath = `portfolio/${fileName}`;

        // 1. Upload file buffer to Supabase Storage Bucket
        const { data: storageData, error: storageError } = await supabase.storage
            .from("portfolio-images")
            .upload(filePath, req.file.buffer, {
                contentType: req.file.mimetype,
                upsert: false
            });

        if (storageError) throw storageError;

        // 2. Get Public CDN URL
        const { data: { publicUrl } } = supabase.storage
            .from("portfolio-images")
            .getPublicUrl(filePath);

        // 3. Extract payload to store inside Database Table with deep EXIF structure
        const { title, description, category, camera, lens, shutter, aperture, iso, location } = req.body;

        const { data: dbData, error: dbError } = await supabase
            .from("photos")
            .insert([
                {
                    title: title || "Untitled Wild",
                    description: description || "",
                    category: category || "Uncategorized",
                    image_url: publicUrl,
                    camera_body: camera || null,
                    lens: lens || null,
                    shutter_speed: shutter || null,
                    aperture: aperture || null,
                    iso: iso ? parseInt(iso) : null,
                    location: location || null,
                    created_at: new Date()
                }
            ])
            .select();

        if (dbError) throw dbError;

        return res.status(201).json({
            message: "Wildlife photograph published successfully!",
            photo: dbData[0]
        });

    } catch (error) {
        console.error("Upload Route Error:", error.message);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
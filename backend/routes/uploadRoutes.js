const express = require("express");
const multer = require("multer");
const supabase = require("../config/supabase");

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage
});
router.post(
    "/",
    upload.single("image"),
    async (req, res) => {

        try {

            const {
                title,
                category,
                location,
                camera,
                lens,
                settings,
                description
            } = req.body;

            const file = req.file;

            const fileName =
                `${Date.now()}-${file.originalname}`;

            // Upload image
            const { error: uploadError } =
                await supabase.storage
                    .from("wildlife-images")
                    .upload(fileName, file.buffer, {
                        contentType: file.mimetype
                    });

            if (uploadError) {
                return res.status(500)
                    .json(uploadError);
            }

            // Get public URL
            const { data: publicUrlData } =
                supabase.storage
                    .from("wildlife-images")
                    .getPublicUrl(fileName);

            const imageUrl =
                publicUrlData.publicUrl;

            // Save to database
            const { data, error } =
                await supabase
                    .from("photos")
                    .insert([
                        {
                            title,
                            category,
                            image_url: imageUrl,
                            location,
                            camera,
                            lens,
                            settings,
                            description
                        }
                    ])
                    .select();

            if(error){
                return res.status(500)
                    .json(error);
            }

            res.json({
                message: "Photo Added",
                photo: data
            });

        } catch(err) {

            res.status(500).json({
                error: err.message
            });

        }

    }
);
module.exports = router;

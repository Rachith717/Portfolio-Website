const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

/* ==========================================
   GET ALL PHOTOS (With Optional Category Filter)
   ========================================== */
router.get("/", async (req, res) => {
    try {
        let query = supabase.from("photos").select("*");
        
        // Filter by category if explicitly passed as a query string parameter
        if (req.query.category && req.query.category !== "all") {
            query = query.eq("category", req.query.category);
        }
        
        const { data, error } = await query.order("created_at", { ascending: false });

        if (error) throw error;
        return res.status(200).json(data);
    } catch (error) {
        console.error("Get Photos Error:", error.message);
        return res.status(500).json({ error: error.message });
    }
});

/* ==========================================
   DELETE PHOTO (Administrative Option)
   ========================================== */
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch image payload link first to clean storage bucket too if necessary
        const { data: photoData, error: fetchError } = await supabase
            .from("photos")
            .select("image_url")
            .eq("id", id)
            .single();

        if (fetchError || !photoData) {
            return res.status(404).json({ error: "Photo entry not found." });
        }

        // Delete row item from database
        const { error: dbDeleteError } = await supabase
            .from("photos")
            .delete()
            .eq("id", id);

        if (dbDeleteError) throw dbDeleteError;

        return res.status(200).json({ message: "Photo entry deleted cleanly." });
    } catch (error) {
        console.error("Delete Photo Error:", error.message);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
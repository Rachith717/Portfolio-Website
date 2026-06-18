const express = require("express");
const router = express.Router();

const supabase = require("../config/supabase");

/* =========================
   GET ALL PHOTOS
========================= */
router.get("/", async (req, res) => {

    try {

        const { data, error } = await supabase
            .from("photos")
            .select("*")
            .order("created_at", {
                ascending: false
            });

        if (error) {
            return res.status(500).json(error);
        }

        res.json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

/* =========================
   GET SINGLE PHOTO
========================= */
router.get("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const { data, error } = await supabase
            .from("photos")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            return res.status(500).json(error);
        }

        res.json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

/* =========================
   UPDATE PHOTO
========================= */
router.put("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        console.log("ID:", id);
        console.log("BODY:", req.body);

        const { title } = req.body;

        const { data, error } = await supabase
            .from("photos")
            .update({
                title: title
            })
            .eq("id", id)
            .select();

        console.log("DATA:", data);
        console.log("ERROR:", error);

        if (error) {
            return res.status(500).json(error);
        }

        res.json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

/* =========================
   DELETE PHOTO
========================= */
router.delete("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const { error } = await supabase
            .from("photos")
            .delete()
            .eq("id", id);

        if (error) {
            return res.status(500).json(error);
        }

        res.json({
            message: "Photo deleted successfully"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;
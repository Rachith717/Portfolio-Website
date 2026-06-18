const express = require("express");
const cors = require("cors");

const photoRoutes = require("./routes/photoRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
    res.send("Wildlife Portfolio API Running");
});

app.use("/api/photos", photoRoutes);
console.log(photoRoutes);
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
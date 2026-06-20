const express = require("express");
const cors = require("cors");
require("dotenv").config();

const photoRoutes = require("./routes/photoRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Mounting Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/photos", photoRoutes);

app.get("/", (req, res) => {
    res.send("Wildlife Photography Grid API Server Online.");
});

// Port Execution Binding
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server actively distributing portfolio requests on port ${PORT}`);
});
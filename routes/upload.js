const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

router.post("/", upload.single("image"), (req, res) => {
  res.json({
    message: "Uploaded successfully",
    imageUrl: `http://localhost:5000/uploads/${req.file.filename}`,
  });
});

module.exports = router;
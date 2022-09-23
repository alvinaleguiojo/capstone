const express = require("express");
const router = express.Router();

// import for AsyncAwait Functions
const UploadImagePromise = require("../AsyncAwait/UploadImage/uploadImage");
const GetImageByIDPromise = require("../AsyncAwait/UploadImage/imageByID");
const GetAllImagesPromise = require("../AsyncAwait/UploadImage/Images");

router.use(express.json());

// Get ALl Images
router.get("/images", async (req, res) => {
  try {
    const resultElements = await GetAllImagesPromise();
    res.status(200).json({ Images: resultElements });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Add New Service
router.post("/image/upload", async (req, res) => {
  const Image = req.body.imageURL;

  try {
    const uploadedImage = await UploadImagePromise({
      Image,
    });
    const ImageID = await uploadedImage.insertId;
    res
      .status(200)
      .json({ message: "Image has been uploaded successfully", ImageID });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "Invalid data entry" });
  }
});

// GET Image By ID
router.get("/image/:id", async (req, res) => {
  const ImageID = req.params.id;
  try {
    const image = await GetImageByIDPromise(ImageID);
    res.json(image);
  } catch (error) {
    res.status(400).json({ message: "Invalid ImageID" });
  }
});

module.exports = router;

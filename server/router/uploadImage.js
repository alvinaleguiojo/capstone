const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// import for AsyncAwait Functions
const UploadImagePromise = require("../AsyncAwait/UploadImage/uploadImage");
const GetImageByIDPromise = require("../AsyncAwait/UploadImage/imageByID");
const GetAllImagesPromise = require("../AsyncAwait/UploadImage/Images");
const DeleteFileByIDPromise = require("../AsyncAwait/UploadImage/DeleteFile");

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

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "files");
  },
  filename: (req, file, callback) => {
    console.log(file);
    callback(null, Date.now() + uuidv4() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// uploading file to server
router.post("/upload_file", upload.single("file"), async (req, res) => {
  const file = req.file;
  const Image = `http://localhost:3001/${req.file.path}`;
  try {
    const response = await UploadImagePromise({ Image });
     res.json({ file, ImageID: response.insertId });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
});

router.delete("/delete_file/:filename", async (req, res) => {
  const filename = req.params.filename;
  const deleteFile = `http://localhost:3001/files/${filename}`;

  try {
    await DeleteFileByIDPromise({
      deleteFile,
    });

    fs.unlinkSync(`./files/${filename}`);
    res.send("file has been deleted");
  } catch (error) {
    console.log(error.message);
  }
});

// upload Image
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

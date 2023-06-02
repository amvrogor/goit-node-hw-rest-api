const multer = require("multer");
const path = require("path");

const { HttpError } = require("../helpers");

const tempDir = path.resolve("temp");

const storage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniquePrefix}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {},
  fileFilter: (req, file, cb) => {
    const { mimetype } = file;
    if (mimetype !== "image/jpeg" || mimetype !== "image/png") {
      cb(HttpError(400, "Format file must be JPEG, JPG, PNG only"), false);
    }
    cb(null, true);
  },
});

module.exports = upload;

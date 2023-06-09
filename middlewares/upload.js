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

const fileFilter = (req, file, cb) => {
  const { mimetype } = file;
  if (mimetype !== "image/jpeg") {
    cb(HttpError(400, "Format file must be JPEG, JPG only"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter,
});

module.exports = upload;

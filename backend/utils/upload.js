//for uploading images

import path from "path";
import multer from "multer";

//disk storage
const storage = multer.diskStorage({
  destination: "../images/",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//stored at localhost:4000/api/profile/${req.file.filename}
const upload = multer({
  storage: storage,
  fileFilter: filefilter,
});

export default upload;

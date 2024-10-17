import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  console.log("multer on", req.body.title);
  const fileTypes = /jpeg|jpg|png|webp/;
  const extname = fileTypes.test(file.mimetype.toLowerCase());

  if (extname) {
    cb(null, true);
  } else {
    cb(new Error(".jpeg, .jpg, .png .webp 확장자만 가능합니다."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;

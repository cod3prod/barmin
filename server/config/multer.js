import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    console.log("멀터", req.body);
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(file.mimetype.toLowerCase());

    if (extname) {
        cb(null, true);
    }
    else {
        cb(new Error('.jpeg, .jpg, .png 확장자만 가능합니다.'), false);
    }
}

const multerConfig = (filedName) => multer({
    storage: storage,
    fileFilter: fileFilter,
}).single(filedName);

export default multerConfig;
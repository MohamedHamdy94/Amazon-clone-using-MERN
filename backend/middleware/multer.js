import multer from "multer";
// File upload folder
import path from 'path';

const __dirname = path.resolve();

const DIR = './dist/admin/assets/images';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(__dirname)

    console.log(DIR)

    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

 const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});
export default upload
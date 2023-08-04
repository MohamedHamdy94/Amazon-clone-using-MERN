import sharp from 'sharp';
import expressAsyncHandler from "express-async-handler";

const resizeProductImages = expressAsyncHandler(async (req, res, next) => {
  // console.log(req.files);
  //1- Image processing for imageCover
  if (req.file) {
    const imageFileName =  `https://admin-8gy5.onrender.com/assets/images/` + req.file.filename;

    await sharp(req.file.image.buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`./assets/images/${imageFileName}`);

    // Save image into our db
    req.body.image = imageFileName;
  }


    next();
  
});
export default resizeProductImages;

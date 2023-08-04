import express from "express";
import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth, isAdmin, isAdminAuth } from "../middleware/utils.js";
import upload from "../middleware/multer.js";
import resizeProductImages from '../middleware/uploade.js'
const productRouter = express.Router();
productRouter.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});


productRouter.get("/slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

productRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.send(categories);
  })
);
productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
  // res.send(data.products);
});

productRouter.delete(
  `/:id`,
  isAdminAuth,
  expressAsyncHandler(async (req, res) => {
    // console.log( req.headers.authorization   )
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.findByIdAndDelete(req.params.id);

      // res.status(200).send("product deleted")
    } else {
      res.status(404).send({ message: "product not found" });
    }
  })
);



productRouter.post(
  '/add', upload.single('file'),
  isAdminAuth,resizeProductImages,
  expressAsyncHandler(async (req, res) => {
    // const products = await Product.insertMany(req.body);
    // res.send({ products });
    if(!req.file) {
      return res.status(500).send({ message: 'Upload fail'});
  } else {
    //req.body.image = `http://localhost:5000/images/` + req.file.filename;
   req.body.image = `https://admin-8gy5.onrender.com/images/` + req.file.filename;
    console.log( req.body.image );

    console.log(path.dirname())

      Product.create(req.body, function (err, gallery) {
          if (err) {
              console.log(err);
              return next(err);
          }
          res.status(201).send({
            message: 'product created successfully '})      });
  }
  })
);

productRouter.put(
  `/:id`,upload.single('file'),
  isAdminAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      req.body.image = `https://admin-8gy5.onrender.com/assets/images/` + req.file.filename;
    //  req.body.image = `${window.location.origin}/images/` + req.file.filename;
    //  req.body.image = `http://localhost:5000/images/` + req.file.filename;
    console.log( req.body.image );

      await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        slug: req.body.slug,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
        countInStock: req.body.countInStock,
        brand: req.body.brand,
        // rating: req.body.rating,
        // numReviews: req.body.numReviews,
        description: req.body.description,
      });
      res.status(201).send({
        message: 'product Updated successfully ',})
    } else {
      res.status(404).send({ message: 'product not found' });
    }
  })
);

export default productRouter;

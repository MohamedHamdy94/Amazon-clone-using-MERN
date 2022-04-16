import express from "express";
import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth, isAdmin, isAdminAuth } from "../utils.js";

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
  "/add",
  isAdminAuth,
  expressAsyncHandler(async (req, res) => {
    const products = await Product.insertMany(req.body);
    res.send({ products });
  })
);

productRouter.put(
  `/:id`,
  isAdminAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        slug: req.body.slug,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
        countInStock: req.body.countInStock,
        brand: req.body.brand,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        description: req.body.description,
      });
    } else {
      res.status(404).send({ message: "product not found" });
    }
  })
);

export default productRouter;

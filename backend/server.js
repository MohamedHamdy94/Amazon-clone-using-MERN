import express from "express";
import path from "path";

import cors from "cors";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import router from "./routes/orderRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/seed", seedRouter);
// app.get("/api/products", function (req, res) {
//   res.send(data.products);
// });
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin", adminRouter);

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname,'./admin/dist/admin')))
app.get("*",(req , res)=>
res.sendFile(path.join(__dirname,'./admin/dist/admin/index.html')))

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`server is running on port number ${port}`);
});

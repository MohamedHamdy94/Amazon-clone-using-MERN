import express from 'express';
import cors from 'cors';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import path from 'path';

dotenv.config();
const app = express();
app.use(cors());
// app.use(express.static('public'));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to db');
  })

  .catch((err) => {
    console.log(err.message);
  });
  app.use(express.json());

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.use('/api/seed', seedRouter);
// app.get("/api/products", function (req, res) {
//   res.send(data.products);
// });
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/admin', adminRouter);

const __dirname = path.resolve();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/admin/dist/admin/assets')));
//app.use(express.static(path.join(__dirname, "/frontend/build")));
//../frontend && npm install && npm run build
app.get('*',(req, res) =>
  res.sendFile(path.join(__dirname, '/admin/dist/admin/index.html'))
 // res.sendFile(path.join(__dirname, "/frontend/build/index.html"))

);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`server is running on port number ${port}`);
});
// <<<<<<< HEAD
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {isAdminAuth, isAuth} from '../utils.js';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
const orderRouter = express.Router();

orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const newOrder = new Order({
        orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const order = await newOrder.save();
      res.status(201).send({ message: 'New Order Created', order });
    })
  );

  orderRouter.get(
    '/',
    isAdminAuth,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.find();
      res.send({ order });
    })
  );
  orderRouter.delete(
    `/:id`,
    isAdminAuth,
    expressAsyncHandler(async (req, res) => {
      const product = await Order.findById(req.params.id);
      if (product) {
        await Order.findByIdAndDelete(req.params.id);
      } else {
        res.status(404).send({ message: 'Order not found' });
      }
    })
  );
  orderRouter.get(
    '/summary', 
    expressAsyncHandler(async (req, res) => {
      const orders = await Order.aggregate([
        {
          $group: {
            _id: null,
            numOrders: { $sum: 1 },
            totalSales: { $sum: '$totalPrice' },
          },
        },
      ]);
      const users = await User.aggregate([
        {
          $group: {
            _id: null,
            numUsers: { $sum: 1 },
          },
        },
      ]);
  
      const productCategories = await Product.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
      ]);
      res.send({ users, orders, productCategories });
    })
  );
  
    export default orderRouter;
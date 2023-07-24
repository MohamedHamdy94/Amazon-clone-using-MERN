import express from "express";
import User from "../models/userModel.js";
import { generateToken, isAdminAuth, isAuth } from "../middleware/utils.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
const userRouter = express.Router();

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);
userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res, next) => {
    const newUser = await new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

userRouter.get(
  "/",
  isAdminAuth,
  expressAsyncHandler(async (erq, res) => {
    const users = await User.find();
    res.send(users);
  })
);
userRouter.get(
  `/:id`,
  isAdminAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("user not found");
    }
  })
);
userRouter.delete(
  `/:id`,
  isAdminAuth,
  expressAsyncHandler(async (req, res) => {
    const user = User.findById(req.params.id);
    if (user) {
      await User.findByIdAndDelete(req.params.id);
    } else {
      res.status(404).send("user not found");
    }
  })
);

export default userRouter;

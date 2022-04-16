import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import Admin from '../models/adminModel.js';
import { generateAdminToken } from '../utils.js';

const adminRouter = express.Router();

adminRouter.post('/', async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (admin) {
    if (bcrypt.compareSync(req.body.password, admin.password)) {
      return res.send({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token: generateAdminToken(admin),
      });
    }
  }
  return res.status(401).send({ message: 'Invalid email or password' });
});

export default adminRouter;

import { validationResult } from "express-validator";
import User from "../models/user.js";

const submitPayment = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const file = req.file.filename;
  User.findById(req.body.userId).then((user) => {
    user.payment = {
      paymentId: req.body.paymentId,
      paymentStatus: false,
      paymentAmount: req.body.paymentAmount,
      paymentDate: Date.now(),
      paymentImage: `${file}`,
    };
    User.updateOne({ _id: req.body.userId }, user).then(
      res.status(201).json({
        message: "user updated successfully!",
      }),
    ).catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  });
};

const verifyPayment = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  User.findById(req.body.id).then((user) => {
    user.payment.paymentStatus = !user.payment.paymentStatus;
    User.updateOne({ _id: req.body.id }, user).then(
      res.status(201).json({
        message: "SUCCESS",
      }),
    ).catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  });
};


export { submitPayment, verifyPayment };

import Visitor from "../models/visitors.js";
import crypto from "crypto";

const visitor = async (req, res) => {
  const token = crypto.randomBytes(16).toString("hex");
  const count = await Visitor.countDocuments();
    if (await Visitor.findOne({ token: req.body.token })) {
      return res.status(208).json({
        count: count,
        message: "Token already exists, not a unique visitor!",
      });
    } else {
      await Visitor({
        token: token,
      }).save();
      return res.status(200).json({
        token: token,
        count: count,
        message: "Token generated successfully",
      });
    }
  
};

const visitorCount = async (req, res) => {
  const count = await Visitor.countDocuments();
  return res.status(200).json({
    count: count,
    message: "Count fetched successfully",
  });
};

export { visitor, visitorCount };

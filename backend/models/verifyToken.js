import mongoose, {Schema} from "mongoose";

const verifyToken = new Schema({
  token: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    expires: '48h',
    default: Date.now
  }
});

const authVerifyToken = new mongoose.model("verifyToken", verifyToken);

export default authVerifyToken;
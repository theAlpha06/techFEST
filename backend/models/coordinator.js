import mongoose, { Schema } from "mongoose";

const coordinatorSchema = new Schema(
  {
    coordinatorName: {
      type: String,
    },
    coordinatorPhone: {
      type: Number,
    },
    coordinatorEmail: {
      type: String,
    },
    coordinatorId: {
      type: String,
    },
    coordinatorStatus: {
      type: Boolean,
      default: false,
    },
    coordinatorType: {
      type: String,
      // enum:["Student","Faculity"],
    },
    coordinatorBranch: {
      type: String,
    },
    photo: {
      type: String,
    },
    coordinatorRole: {
      type: Number,
    },
    coordinatorPassword: {
      type: String,
    },
    coordinatorDomain: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    coordinatorPhoto: {
      type: String,
    },
  },
  { timestamps: true }
);

const Coordinator = new mongoose.model("Coordinator", coordinatorSchema);

export default Coordinator;

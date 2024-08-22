import mongoose, { Schema } from "mongoose";
const ObjectId = mongoose.ObjectId;

const workshopSchema = new mongoose.Schema({
  workshopName: {
    type: String,
    required: true,
    trim: true,
  },
  workshopDescription: {
    type: String,
    required: true,
    trim: true,
  },
  workshopPhoto: {
    type: String,
  },
  registrationLive: {
    type: Boolean,
    default: true,
  },
  whatsappLink: {
    type: String,
  },
  domainName: {
    type: String,
  },
  studentCoordinator: [
    {
      type: ObjectId,
      ref: "Coordinator",
    },
  ],
  user: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  workshopDate: {
    type: String,
    required: true,
  },
  workshopVenue: {
    type: String,
    required: true,
  },
  workshopTime: {
    type: String,
    required: true,
  },
  workshopMode: {
    type: String,
    // required: true,
  },
  profName: {
    type: String,
    required: true,
  },
  profDesignation: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Workshop", workshopSchema);

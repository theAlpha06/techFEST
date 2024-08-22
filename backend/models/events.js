import mongoose from "mongoose";
const ObjectId = mongoose.ObjectId;

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  eventDescription: {
    type: String,
    required: true,
    trim: true,
  },
  eventMode: {
    type: String,
    trim: true,
  },
  venue: {
    type: String,
  },
  driveLink: {
    type: String,
    trim: true,
  },
  domainName: {
    type: String,
  },
  ePrizeWorth: {
    type: Number,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  whatsappLink: {
    type: String,
    required: true,
  },
  eventParticipationType: {
    type: String,
    required: true,
  },
  registrationLive: {
    type: Boolean,
    default: true,
  },
  endDate: {
    type: Date,
  },
  teams: [
    {
      type: ObjectId,
      ref: "Team",
    },
  ],
  author: {
    type: ObjectId,
    ref: "Coordinator",
  },
  individual: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  studentCoordinator: [
    {
      type: ObjectId,
      ref: "Coordinator",
    },
  ],
});

export default mongoose.model("Event", eventSchema);

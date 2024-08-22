import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const Team = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  leaderId: {
    type: ObjectId,
    ref: "User",
  },
  leaderName: {
    type: String,
  },
  events: [
    {
      type: ObjectId,
      ref: "Event",
    },
  ],
  eventType: {
    type: String,
  },
  members: [
    {
      memberId: {
        type: ObjectId,
        ref: "User",
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      status: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

export default mongoose.model("Team", Team);


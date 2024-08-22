import mongoose from "mongoose";

const Schema = mongoose.Schema;

const domainSchema = new Schema({
  domainName: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  domainInfo: {
    type: String,
    required: true,
    maxlength: 2000,
    trim: true,
  },
  domainPhoto: {
    type: String,
  },
  studentCoordinator: [
    {
      type: Schema.Types.ObjectId,
      ref: "Coordinator",
    },
  ],
  facultyCoordinator: [
    {
      type: Schema.Types.ObjectId,
      ref: "Coordinator",
    },
  ],
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Events',
    }
  ],
});

export default mongoose.model("Domain", domainSchema);
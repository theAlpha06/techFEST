import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 30,
    },
    dob: {
      type: Date,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      maxLength: 10,
      trim: true,
    },
    whatsappPhoneNumber: {
      type: Number,
      maxLength: 10,
      trim: true,
    },
    telegramPhoneNumber: {
      type: Number,
      maxLength: 10,
      trim: true,
    },
    payment: {
      paymentId: String,
      paymentStatus: {type: Boolean, default: false},
      paymentAmount: Number,
      paymentDate: Date,
      paymentImage: String,
    },
    collegeName: {
      type: String,
      maxlength: 200,
      trim: true,
    },
    regNo: {
      type: String,
      maxlength: 15,
      trim: true,
    },
    instituteAddress: {
      type: String,
      maxlength: 200,
      trim: true,
    },
    course: {
      type: String,
      maxlength: 100,
      trim: true,
    },
    branch: {
      type: String,
      maxlength: 100,
      trim: true,
    },
    referralCode: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    referrals: {
      type: Number,
      default: 0,
    },
    yearOfStudy: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
    institution: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
    teamMembers: [
      {
        type: ObjectId,
        ref: "Team",
      },
    ],

    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],

    workshops: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workshop",
      },
    ],
  },
  { timestamps: true }
);

const model = mongoose.model("User", userSchema);
export default model;

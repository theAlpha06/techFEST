import mongoose from "mongoose";

const sponserSchema = new mongoose.Schema({
    sponserName: {
        type: String,
        required: true,
        trim: true,
    },
    sponserWebsite: {
        type: String,
        required: true,
        trim: true,
    },
    sponserLogo: {
        type: String,
    },
    name: {
        type: String,
        required: true,
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
});

export default mongoose.model("Sponser", sponserSchema);
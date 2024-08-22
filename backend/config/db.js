import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();
mongoose.set("strictQuery", true);
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((res) => console.log("Connected to MongoDB".bgBlue));
};

export default connectDB;

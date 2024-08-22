connectDB();
import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import domainRouter from "./routes/domains.js";
import coordinatorRoute from './routes/coordinator.js';
import workshopRouter from './routes/workshop.js';
import sponserRouter from './routes/sponser.js';
import visitors from './routes/visitors.js';
import eventRouter from "./routes/events.js";
import cookieParser from 'cookie-parser';
import teamRouter from "./routes/teams.js";
import authCoor from './routes/authCoor.js';
import paymentRouter from './routes/payment.js';
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use('/user', userRoutes);
app.use("/domain", domainRouter);
app.use(express.static("upload"));
app.use("/coordinator",coordinatorRoute);
app.use("/event", eventRouter);
app.use('/workshop', workshopRouter);
app.use('/sponser', sponserRouter);
app.use('/coor', authCoor);
app.use('/payment', paymentRouter);
app.use("/team", teamRouter);
app.use('/visitors', visitors);
app.get("/", (req, res) => {
  res.send("Welcome! u have unlocked dev mode");
});
app.use((req, res) => {
  res.status(404).render('404');
}) 

const port = process.env.PORT;
app.listen(
  port,
  () => console.log(`server is running on port ${port}`.yellow.bold.underline),
);

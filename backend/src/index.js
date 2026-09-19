import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {router} from "./routes/userRoute.js";
import {propertyRouter} from "./routes/propertyRouter.js";
import {bookingRouter} from "./routes/bookingRouter.js";
import { tripRouter } from "./routes/tripRouter.js";

import connectDB from "./utils/db.js";


dotenv.config();

const app = express();

//express.json
app.use(express.json({limit:"100mb"}));

//urlencoded
app.use(express.urlencoded({limit:"100mb", extended:true}));

//cookie parser
app.use(cookieParser());

app.use(cors({
    origin:process.env.ORIGIN_ACCESS_URL,
    credentials:true
}))


const PORT = process.env.PORT;


//one test route
app.get("/", (req, res) => {
    res.send("HomelyHub is running");
});

app.use("/api/v1/rent/User", router);
app.use("/api/v1/rent/listing", propertyRouter);
app.use("/api/v1/rent/user/booking", bookingRouter);
app.use("/api/v1/rent/trip",tripRouter)


connectDB(); // Connect to MongoDB
app.listen(PORT, () => {
    console.log(`App is running on port no: ${PORT}`);
});
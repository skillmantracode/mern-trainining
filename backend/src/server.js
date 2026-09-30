import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from 'cookie-parser'

import { connectDB } from "./config/db.js";

//import routes and middleware
import studentRoutes from "./routes/student.route.js";
import staffRoutes from "./routes/staff.route.js";
import userRoute from "./routes/user.route.js";
import config from "./config/config.js";
import chooseReasonRoutes from "./routes/choose.reason.routes.js"
import WelcomeRoutes from "./routes/welcomeMessage.route.js"
import { errorHandler } from "./middlewares/error.middleware.js";
import AboutRoutes from "./routes/about.routes.js"
import syllabusRoutes from './routes/syllabus.route.js'
import programsRoutes from "./routes/programs.routes.js"
import eventRoutes from "./routes/event.route.js"
import noticeRoutes from "./routes/notice.routes.js"
import DesignationRoutes from "./routes/Designation.routes.js"
import DepartmentRoutes from "./routes/Department.routes.js"


const PORT = config.PORT;
const app = express();



app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser())

//use routes 
app.use("/students", studentRoutes);
app.use("/staffs", staffRoutes);
app.use("/user", userRoute);
app.use("/chooseReasons",chooseReasonRoutes)
app.use("/welcome",WelcomeRoutes)
app.use("/about",AboutRoutes)
app.use("/notice",noticeRoutes)
app.use("/program",programsRoutes)
app.use("/event",eventRoutes)
app.use("/department",DepartmentRoutes)
app.use("/designation",DesignationRoutes)
app.use("/syllabus",syllabusRoutes)


app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("The backed is running");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`The server is run at ${PORT}`);
  });
});

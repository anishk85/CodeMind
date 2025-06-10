const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");

dotenv.config();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");

const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

const PORT = process.env.PORT || 3000;
const app = express();

database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

process.on("SIGINT", () => {
  console.log("🛑 Server shutting down...");
  server.close(() => {
    console.log("✅ Server shut down successfully");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("🛑 Server shutting down...");
  server.close(() => {
    console.log("✅ Server shut down successfully");
    process.exit(0);
  });
});
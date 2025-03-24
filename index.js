// Importing necessary modules and packages
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const morgan = require("morgan"); // For logging API requests

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/course"); // Ensure consistent filename case
const paymentRoutes = require("./routes/payments"); // Ensure consistent filename case
const contactUsRoute = require("./routes/contact");

// Import configurations
const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

// Setting up the port number
const PORT = process.env.PORT || 8080;

// Initializing Express app
const app = express();

// Connecting to the database with error handling
database.connect()
  

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev")); // Logging middleware

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // Allow frontend domain
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Connecting to Cloudinary
cloudinaryConnect();

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Root route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

// Graceful shutdown handling
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

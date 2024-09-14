const express = require("express"); // Import express only once
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path"); // Added here to manage file serving paths

// Import Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

// Initialize app
const app = express();

// Use CORS middleware
app.use(cors());

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Body parser middleware
app.use(express.json());

// Define API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/bookings", bookingRoutes);

// Serve static files from the public directory
app.use(express.static("public"));

// Serve index.html for the root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Define the server port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

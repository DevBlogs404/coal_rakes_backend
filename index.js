const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const sidingRoutes = require("./routes/sidingRoutes");
const locationRoutes = require("./routes/locationRoutes");
const rakeRoutes = require("./routes/rakeRoutes");
const recordRoutes = require("./routes/recordRoutes");
const cookieParser = require("cookie-parser");
const authMiddleWare = require("./middlewares/authMiddleware");

//express-app
const app = express();

// configurations
const corsConfiguration = {
  origin: "http://localhost:3000",
  credentials: true,
};

// const expiryDate = new Date(Date.now() + 60 * 60 * 1000);

//middlewares
app.use(express.json());
app.use(cors(corsConfiguration));
app.use(helmet());
app.use(cookieParser());

// app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/siding", authMiddleWare, sidingRoutes);
app.use("/api/v1/location", authMiddleWare, locationRoutes);
app.use("/api/v1/rakes", authMiddleWare, rakeRoutes);
app.use("/api/v1/records", authMiddleWare, recordRoutes);

const PORT = process.env.PORT || 4040;

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});

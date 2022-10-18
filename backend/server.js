const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const connectDatabase = require("./config/database");
const errorMiddleWare = require("./middlewares/error");

// Config
require("dotenv").config({ path: "./config/config.env" });

const app = express();

// Handling uncought exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// Middleware to handle errors
app.use(errorMiddleWare);

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// UnhandledPromiseRejectionWarning
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  // Close server & exit process

  console.log("Shutting down server due to unhandled promise rejection");
  server.close(() => process.exit(1));
});

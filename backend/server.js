const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const connectDatabase = require("./config/database");
const errorMiddleWare = require("./middlewares/error");

const app = express();
const port = 3001;

// Handling uncought exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

const product = require("./routes/productRoutes");

app.use("/api/v1", product);

// Middleware to handle errors
app.use(errorMiddleWare);

connectDatabase();

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// UnhandledPromiseRejectionWarning
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  // Close server & exit process

  console.log("Shutting down server due to unhandled promise rejection");
  server.close(() => process.exit(1));
});

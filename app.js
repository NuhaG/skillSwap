require("dotenv").config();
const express = require("express");
const app = express();

// connect db
const connectDB = require("./db/connect");
const authUser = require("./middleware/authMiddleware");

// error handler
const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");

// Routers
const authRoute = require("./routes/user");
const shareRoute = require("./routes/share");
const requestRoute = require("./routes/request");

app.use(express.json());

const port = process.env.PORT || 3000;

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1", authUser, shareRoute);
app.use("/api/v1", authUser, requestRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not defined in environment variables.");
    }

    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.error("Startup Error:", error);
  }
};

start();

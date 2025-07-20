require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const userRoute = require("./routes/user");
const shareRoute = require("./routes/share");
const requestRoute = require("./routes/request");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: "Welcome To Skill Swap" });
});

const port = process.env.PORT || 3000;

app.use("/api/v1", userRoute);
app.use("/api/v1", shareRoute);
app.use("/api/v1", requestRoute);

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

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const errorMiddleware = require("./middlewares/error-middleware");

const router = require("./router");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(`/api/${process.env.API_URL_VERSION}`, router);

app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URI, {
        // useUnifiedTopology: true,
        // useNewUrlParser: true,
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD,
        dbName: "auth",
      })
      .then(() => {
        console.log("DB connection successful... 💯");
      });
    app.listen(PORT, () => console.log(`Server started in PORT = ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();

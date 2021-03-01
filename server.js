const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./src/routes/router");
const cors = require("cors");
require("dotenv").config();
const port = process.env.SERVER_PORT || 3000;

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => {
    console.log("Mongo not connected");
    console.log(err);
  });

app.use(express.json());
app.use(cors());
app.use("/api/cat", router);
app.get("/", (req, res) => {
  res.send("your app is magically running on docker container");
});

app.listen(port, () => console.log(`Listening on port ${port}`));

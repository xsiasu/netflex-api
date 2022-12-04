const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db server Success"))
  .catch((err) => console.error(err));

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

//기본 페이지 로드 200
app.get("/", (req, res) => {
  res.send("기본페이지");
});

//에러 페이지 로드 404
app.get((req, res) => {
  res.status(404).send("not found");
});

app.listen(8080, () => {
  console.log("Backend Server is Running8080");
});

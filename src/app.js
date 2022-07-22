const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());

require("dotenv-safe").config();

const db = require("./config/database");
db.connect();

const userRouter = require("./routes/userRoutes");
const chartsRouter = require("./routes/chartsRoutes");
//const chartsRoutes = require("./routes/chartsRoutes");

app.use("/users", userRouter);
app.use("/charts", chartsRouter);


module.exports = app;

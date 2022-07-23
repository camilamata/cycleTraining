const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());

require("dotenv-safe").config();

const db = require("./database/mongoDBconfig");
db.connect();

const userRouter = require("./routes/userRoutes");
const chartsRouter = require("./routes/chartsRoutes");

app.get("/", (req, res) => {
    res.status(200).send({
        title: "CYCLE TRAINING - Projeto Final {Reprograma} 2022",
        version: "1.0.0",
        message: "LET'S MOVE! Cycle Training is an API to help woman maximize their workout sessions according to their menstrual cycle!"
    })
})


app.use("/users", userRouter);
app.use("/charts", chartsRouter);


module.exports = app;

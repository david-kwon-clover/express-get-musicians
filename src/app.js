const express = require("express");
const app = express();
const { Band } = require("../models/index");
const musiciansRouter = require("../routes/musicians");
const bandsRouter = require("../routes/bands");
app.use(express.json());
app.use(express.urlencoded());

app.use("/musicians", musiciansRouter);
app.use("/bands", bandsRouter);


module.exports = app;
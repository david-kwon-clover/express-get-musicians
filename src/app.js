const express = require("express");
const app = express();
const { Band } = require("../models/index");
const musiciansRouter = require("../routes/musicians");
app.use(express.json());
app.use(express.urlencoded());

app.use("/musicians", musiciansRouter);

app.get("/bands", async (req, res, next) => {
    try {
        const bands = await Band.findAll();
        res.json(bands);
    } catch(error) {
        next(error);
    }
})


module.exports = app;
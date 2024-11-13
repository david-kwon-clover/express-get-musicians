const express = require("express");
const { Band } = require("../models/index");

const bandsRouter = express.Router();

bandsRouter.get("/bands", async (req, res, next) => {
    try {
        const bands = await Band.findAll();
        res.json(bands);
    } catch(error) {
        next(error);
    }
})

module.exports = bandsRouter;
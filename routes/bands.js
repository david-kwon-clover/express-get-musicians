const express = require("express");
const { Band, Musician } = require("../models/index");

const bandsRouter = express.Router();

bandsRouter.get("/", async (req, res, next) => {
    try {
        const bands = await Band.findAll();
        res.json(bands);
    } catch(error) {
        next(error);
    }
})

bandsRouter.get("/:id", async (req, res, next) => {
    try {
        const targetBand = await Band.findByPk(req.params.id, { include: Musician });
        res.json(targetBand);
    } catch(error) {
        next(error);
    }
})

module.exports = bandsRouter;
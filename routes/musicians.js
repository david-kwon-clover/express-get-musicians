const express = require("express");
const { Musician } = require("../models/index");

const musiciansRouter = express.Router();

musiciansRouter.get("/", async (req, res, next) => {
    try {
        const musicians = await Musician.findAll();
        res.json(musicians);
    } catch(error) {
        next(error);
    }
})

musiciansRouter.get("/:id", async (req, res, next) => {
    try {
        const musician = await Musician.findByPk(req.params.id);
        if(!musician) {
            throw new Error(`Could not find musician with id:${req.params.id}`);
        }
        res.json(musician);
    } catch(error) {
        next(error);
    }
})

musiciansRouter.post("", async (req, res, next) => {
    try {
        await Musician.create(req.body);
        res.send("Successfully created musician");
    } catch(error) {
        next(error);
    }
})

musiciansRouter.put("/:id", async (req, res, next) => {
    try {
        await Musician.update(req.body, { where: { id: req.params.id } });
        res.send(`Successfully updated musician at id:${req.params.id}`);
    } catch(error) {
        next(error);
    }
})

musiciansRouter.delete("/:id", async (req, res, next) => {
    try {
        await Musician.destroy({ where: { id: req.params.id } });
        res.send(`Successfully deleted musician with id:${req.params.id}`);
    } catch(error) {
        next(error);
    }
})


module.exports = musiciansRouter;
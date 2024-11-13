const express = require("express");
const { Musician } = require("../models/index");
const { check, validationResult } = require("express-validator");

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

musiciansRouter.post("", [
    check("name").trim().notEmpty().withMessage("name cannot be empty"),
    check("instrument").trim().notEmpty().withMessage("instrument cannot be empty"),
], async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json({error: errors.array()});
    } else {
        await Musician.create(req.body);
        const allMusicians = await Musician.findAll();
        res.json(allMusicians);
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
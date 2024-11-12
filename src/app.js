const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 
app.get("/musicians", async (req, res, next) => {
    try {
        const musicians = await Musician.findAll();
        res.json(musicians);
    } catch(error) {
        next(error);
    }
})

app.get("/musicians/:id", async (req, res, next) => {
    try {
        const musician = await Musician.findOne({ where:  { id: req.params.id } });
        res.json(musician);
    } catch(error) {
        next(error);
    }
})






module.exports = app;
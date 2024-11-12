const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { Band } = require("../models/index");
const { db } = require("../db/connection")
app.use(express.json());
app.use(express.urlencoded());
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
        const musician = await Musician.findByPk(req.params.id);
        if(!musician) {
            throw new Error(`Could not find musician with id:${req.params.id}`);
        }
        res.json(musician);
    } catch(error) {
        next(error);
    }
})

app.post("/musicians", async (req, res, next) => {
    try {
        await Musician.create(req.body);
        res.send("Successfully created musician");
    } catch(error) {
        next(error);
    }
})


app.get("/bands", async (req, res, next) => {
    try {
        const bands = await Band.findAll();
        res.json(bands);
    } catch(error) {
        next(error);
    }
})





module.exports = app;
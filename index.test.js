// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");


describe('/musicians endpoint', () => {
    // Write your tests here
    test("Test response status", async () => {
        // Sends request to `/bakedGoods` endpoint
        const response = await request(app).get("/musicians");
        expect(response.statusCode).toBe(200);
    })
    
    test("Test response data", async () => {
        const response = await request(app).get("/musicians");
        const responseData = JSON.parse(response.text);
        expect(Object.values(responseData[1])).toContain("Drake");
    }) 
})

describe('/musicians/:id endpoint', () => {
    // Write your tests here
    test("Test response status", async () => {
        // Sends request to `/bakedGoods` endpoint
        const response = await request(app).get("/musicians/1");
        expect(response.statusCode).toBe(200);
    })
    
    test("Test response data", async () => {
        const response = await request(app).get("/musicians/1");
        const responseData = JSON.parse(response.text);
        expect(Object.values(responseData)).toContain("Mick Jagger");
    }) 
})

describe('/bands endpoint', () => {
    // Write your tests here
    test("Test response status", async () => {
        // Sends request to `/bakedGoods` endpoint
        const response = await request(app).get("/bands");
        expect(response.statusCode).toBe(200);
    })
    
    test("Test response data", async () => {
        const response = await request(app).get("/bands");
        const responseData = JSON.parse(response.text);
        expect(Object.values(responseData[1])).toContain("Black Pink");
    }) 
})

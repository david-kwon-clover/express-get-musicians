// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');
const { describe, test, expect, afterAll, afterEach } = require("@jest/globals");
const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");


describe("Musician", () => {
    
    describe('/musicians GET endpoint', () => {
        // Write your tests here
        test("Test response status", async () => {
            const response = await request(app).get("/musicians");
            expect(response.statusCode).toBe(200);
        })
        
        test("Test GET response data", async () => {
            const response = await request(app).get("/musicians");
            const responseData = JSON.parse(response.text);
            expect(Object.values(responseData[1])).toContain("Drake");
        }) 
    })
    
    describe('/musicians/:id GET endpoint', () => {
        // Write your tests here
        test("Test response status", async () => {
            const response = await request(app).get("/musicians/1");
            expect(response.statusCode).toBe(200);
        })
        
        test("Test response data", async () => {
            const response = await request(app).get("/musicians/1");
            const responseData = JSON.parse(response.text);
            expect(Object.values(responseData)).toContain("Mick Jagger");
        }) 
    })
    
    describe('/musicians POST endpoint', () => {
        // Write your tests here
        test("Test response status", async () => {
            const response = await request(app).post("/musicians").send({
                name: "John Mayer",
                instrument: "Guitar"
            });
            expect(response.statusCode).toBe(200);
        })
        
        test("Test response data", async () => {
            const response = await request(app).post("/musicians").send({
                name: "John Mayer",
                instrument: "Guitar"
            });
            const allMusicians = await Musician.findAll();
            expect(allMusicians).toHaveLength(5);
            expect(allMusicians[4].name).toBe("John Mayer");
        }) 
    })

    describe("/musicians/:id PUT endpoint", () => {
        test("Test update functionality", async () => {
            await request(app).post("/musicians").send({
                name: "John Mayer",
                instrument: "Guitar"
            });
            await request(app).put("/musicians/4").send({
                name: "Stevie Wonder",
                instrument: "Keyboard"
            })
            const allMusicians = await Musician.findAll();
            expect(allMusicians[3].name).toBe("Stevie Wonder");
            expect(allMusicians[3].instrument).toBe("Keyboard");
        })
    })

    describe("/musicians/:id DELETE endpoint", () => {
        test("Test delete functionality", async () => {
            await request(app).post("/musicians").send({
                name: "John Mayer",
                instrument: "Guitar"
            });
            await request(app).delete("/musicians/4")
            const allMusicians = await Musician.findAll();
            expect(allMusicians[3].name).toBeUndefined;
            expect(allMusicians[3].instrument).toBeUndefined;
        })
    })
    
})

describe('/bands endpoint', () => {
    // Write your tests here
    test("Test response status", async () => {
        const response = await request(app).get("/bands");
        expect(response.statusCode).toBe(200);
    })
    
    test("Test response data", async () => {
        const response = await request(app).get("/bands");
        const responseData = JSON.parse(response.text);
        expect(Object.values(responseData[1])).toContain("Black Pink");
    }) 
})

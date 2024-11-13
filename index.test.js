// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
const { describe, test, expect, afterAll, afterEach, beforeEach } = require("@jest/globals");
const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");


describe("Musician", () => {
    beforeEach(() => {
        execSync('npm run seed');
    })
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
            expect(allMusicians).toHaveLength(4);
            expect(allMusicians[allMusicians.length - 1].name).toBe("John Mayer");
        }) 
        
        test("Server side validation", async () => {
            const responseNoName = await request(app).post("/musicians").send({
                name: "",
                instrument: "Guitar"
            });
            const responseNoInstrument = await request(app).post("/musicians").send({
                name: "John Mayer",
                instrument: ""
            });
            expect(responseNoName.body.error[0].msg).toBe("name cannot be empty");
            expect(responseNoInstrument.body.error[0].msg).toBe("instrument cannot be empty");
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
            expect(allMusicians[3]).toBeUndefined();
        })
    })
    
})

describe("Band", () => {
    describe('/bands GET endpoint', () => {
        // Write your tests here
        test("Test response status", async () => {
            const response = await request(app).get("/bands");
            expect(response.statusCode).toBe(200);
        })
        
        test("/bands GET response data", async () => {
            const response = await request(app).get("/bands");
            const responseData = JSON.parse(response.text);
            expect(Object.values(responseData[1])).toContain("Black Pink");
        }) 
    })

    describe('/bands/:id GET endpoint', () => {
        // Write your tests here
        test("Test response status", async () => {
            const response = await request(app).get("/bands/2");
            expect(response.statusCode).toBe(200);
        })
        
        test("/bands/:id GET response data", async () => {
            const response = await request(app).get("/bands/2");
            const responseData = JSON.parse(response.text);
            expect(Object.values(responseData)).toContain("Black Pink");
            expect(Object.keys(responseData)).toContain("musicians");
            expect(responseData.musicians).toBeInstanceOf(Array);
        }) 
    })

})


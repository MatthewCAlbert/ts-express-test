import mongoose from "mongoose";
import { nanoid } from "nanoid";
import supertest from "supertest";
import app from "../src/app";

const request = supertest(app);

describe("Auth Activity", () => {
    const userData = {
        username: nanoid(),
        password: "LLoLVdgCw1T^K5-7"
    }
    let token = "";

    afterAll(() => { 
        mongoose.connection.close()
    })

    // Create User
    it("Create user", async () => {
    
        request.post('/api/v1/register').send(userData).then( (response)=>{
            expect(response.status).toBe(200);
            const {success, user, token: fetchedToken, expiresIn} = response.body;
            expect(user).toBeInstanceOf(Object);
            const {username} = user;
            expect(success).toBe(true);
            expect(username).toMatch(userData.username);
            expect(fetchedToken).toMatch(/^Bearer .*/);
            expect(expiresIn).toBe("1d");
            }
        )

    });

    // Login User
    it("Login user", async () => {
    
        request.post('/api/v1/login').send(userData).then( (response)=>{
            expect(response.status).toBe(200);
            const {success, token: fetchedToken, expiresIn} = response.body;
            expect(success).toBe(true);
            expect(fetchedToken).toMatch(/^Bearer .*/);
            expect(expiresIn).toBe("1d");
            token = fetchedToken;
            }
        )

    });

    // Test Protected with Token
    it("Test protected route with token", async () => {
    
        request.get('/api/v1/protected')
            .set("Authorization",`${token}`)
            .then( (response)=>{
                expect(response.status).toBe(200);
                const {success, message} = response.body;
                expect(success).toBe(true);
                expect(message).toMatch("Authenticated");
            }
        )

    });

    // Test Protected with no Token
    it("Test protected route without token", async () => {
    
        request.get('/api/v1/protected')
            .then( (response)=>{
                expect(response.status).toBe(401);
            }
        )

    });

    // Destroy User
    it("Destroy user", async () => {
    
        request.delete(`/api/v1/user/${userData.username}`).then( (response)=>{
            expect(response.status).toBe(200);
            const {success, message} = response.body;
            expect(success).toBe(true);
            expect(message).toMatch("User deleted!");
            }
        )

    });

});
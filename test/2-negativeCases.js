const request = require('supertest');
const { expect } = require('chai');
const axios = require('axios');
const fs = require('fs');
const config = require('../env.js');
const TOKEN = config.token;
const url = config.baseUrl;

describe("Negative - Post New User with Empty Email", () => { 
    it("Response status equal to 422", async () => {
      const response = await request(url)
        .post(`/public/v2/users?access-token=${TOKEN}`)
        .send({
          "email": "",
          "name": "User 1",
          "gender": "female",
          "status": "active"
        });
      expect(response.status).to.equal(422);
    });
  });

  describe("Negative - Post New User with Empty Name", () => { 
    it("Response status equal to 422", async () => {
      const response = await request(url)
        .post(`/public/v2/users?access-token=${TOKEN}`)
        .send({
          "email": "user1@mail.com",
          "name": "",
          "gender": "female",
          "status": "active"
        });
      expect(response.status).to.equal(422);
    });
  });

  describe("Negative - Post New User with Empty gender", () => { 
    it("Response status equal to 422", async () => {
      const response = await request(url)
        .post(`/public/v2/users?access-token=${TOKEN}`)
        .send({
          "email": "user1@mail.com",
          "name": "User 1",
          "gender": "",
          "status": "active"
        });
      expect(response.status).to.equal(422);
    });
  });

  describe("Negative - Post New User with Empty status", () => { 
    it("Response status equal to 422", async () => {
      const response = await request(url)
        .post(`/public/v2/users?access-token=${TOKEN}`)
        .send({
          "email": "user1@mail.com",
          "name": "User 1",
          "gender": "female",
          "status": ""
        });
      expect(response.status).to.equal(422);
    });
  });

describe("Negative - Post New User with Invalid Email", () => { 
    it("Response status equal to 422", async () => {
      const response = await request(url)
        .post(`/public/v2/users?access-token=${TOKEN}`)
        .send({
          "email": "user1",
          "name": "User 1",
          "gender": "female",
          "status": "active"
        });
      expect(response.status).to.equal(422);
    });
  });

  describe("Negative - Post New User with Invalid Gender", () => { 
    it("Response status equal to 422", async () => {
      const response = await request(url)
        .post(`/public/v2/users?access-token=${TOKEN}`)
        .send({
          "email": "user1@mail.com",
          "name": "User 1",
          "gender": "1",
          "status": "active"
        });
      expect(response.status).to.equal(422);
    });
  });

  describe("Negative - Post New User with Invalid Status", () => { 
    it("Response status equal to 422", async () => {
      const response = await request(url)
        .post(`/public/v2/users?access-token=${TOKEN}`)
        .send({
          "email": "user1@mail.com",
          "name": "User 1",
          "gender": "female",
          "status": "1"
        });
      expect(response.status).to.equal(422);
    });
  });

  describe("Negative - GET non-existed user detail", () =>{
    it("Response status equal to 404", async () => {
        const response = await request(url)
        .get(`/public/v2/users/12345?access-token=${TOKEN}`)
        expect(response.status).to.equal(404)
        })
  })

  describe("Negative - PUT not existed user", () =>{
    it("Response status equal to 404", async () => {
      const response = await request(url)
        .put(`/public/v2/users/123456?access-token=${TOKEN}`)
        .send({
          "email": "user1@mail.com",
          "name": "User 1",
          "gender": "female",
          "status": "inactive"
      });
        expect(response.status).to.equal(404)
        })
  })

  describe("Negative - DELETE not existed user", () =>{
    it("Response status equal to 404", async () => {
      const response = await request(url)
        .delete(`/public/v2/users/123456?access-token=${TOKEN}`)
        ;
        expect(response.status).to.equal(404)
        })
  })
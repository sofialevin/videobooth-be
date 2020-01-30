const request = require("supertest");

const server = require("../api/server");

const db = require("../database/dbConfig");

//Clear and seed testing database
beforeAll(async () => {
  await db.seed.run();
});

//Close worker connection thread
afterAll(async () => {
  await db.destroy();
});

describe("Login/Register routes", () => {
  //* USERNAME LOGIN ROUTE TESTING
  describe("POST /login/username", () => {
    //? Does it return the correct status code for valid credentials?
    it("should return status code 200 on success", async () => {
      //To test valid user credentials
      const validUser = {
        username: "fwilloughley0",
        password: "4OTUUVDkYT",
      };

      const response = await request(server)
        .post("/api/users/login/username")
        .send(validUser);

      expect(response.status).toEqual(200);
    });

    //? Does it return the correct status code for missing parameters?
    it("should return status code 400 on bad request", async () => {
      //To test missing params edge case
      const missingParamUser = {
        username: "fwilloughley0",
        //Missing password argument
      };

      const response = await request(server)
        .post("/api/users/login/username")
        .send(missingParamUser);

      expect(response.status).toEqual(400);
    });

    //? Does it return the correct status code for invalid credentials?
    it("should return status code 401 on invalid username/password", async () => {
      //To test invalid user credentials
      const invalidUser = {
        username: "fwilloughley0",
        password: "password",
      };

      const response = await request(server)
        .post("/api/users/login/username")
        .send(invalidUser);

      expect(response.status).toEqual(401);
    });
  });

  //* EMAIL LOGIN ROUTE TESTING
  describe("POST /login/email", () => {
    //? Does it return the correct status code for valid credentials?
    it("should return status code 200 on success", async () => {
      //To test valid user credentials
      const validUser = {
        email: "asculpher0@independent.co.uk",
        password: "4OTUUVDkYT",
      };

      const response = await request(server)
        .post("/api/users/login/email")
        .send(validUser);

      expect(response.status).toEqual(200);
    });

    //? Does it return the correct status code for missing parameters?
    it("should return status code 400 on bad request", async () => {
      //To test missing params edge case
      const missingParamUser = {
        email: "asculpher0@independent.co.uk",
        //Missing password argument
      };

      const response = await request(server)
        .post("/api/users/login/email")
        .send(missingParamUser);

      expect(response.status).toEqual(400);
    });

    //? Does it return the correct status code for invalid credentials?
    it("should return status code 401 on invalid email/password", async () => {
      //To test invalid user credentials
      const invalidUser = {
        email: "asculpher0@independent.co.uk",
        password: "password",
      };

      const response = await request(server)
        .post("/api/users/login/email")
        .send(invalidUser);

      expect(response.status).toEqual(401);
    });
  });

  //* REGISTER ROUTE TESTING
  describe("POST /register", () => {
    //? Does it return the correct status code for a valid new account signup?
    it("should return status code 201 on success", async () => {
      //To test valid signup scenario
      const validSignup = {
        email: "test@email.com",
        username: "testUser",
        password: "testPassword",
      };

      const response = await request(server)
        .post("/api/users/register")
        .send(validSignup);

      expect(response.status).toEqual(201);
    });

    //? Does it return the correct status code for missing parameters?
    it("should return status code 400 on bad request", async () => {
      //To test missing params edge case
      const missingParamSignup = {
        email: "test@email.com",
        username: "testUser",
      };

      const response = await request(server)
        .post("/api/users/register")
        .send(missingParamSignup);

      expect(response.status).toEqual(400);
    });

    //? Does it return the correct status code for a pre-existing account?
    it("should return status code 409 when account already exists", async () => {
      //To test duplicate account register scenario
      const validSignup = {
        email: "test1@email.com",
        username: "testUser1",
        password: "testPassword",
      };

      const duplicateSignup = validSignup;

      await request(server)
        .post("/api/users/register")
        .send(validSignup);

      const response = await request(server)
        .post("/api/users/register")
        .send(duplicateSignup);

      expect(response.status).toEqual(409);
    });
  });
});

import request from "supertest";
import { expect } from "chai";
import app from "../src/server.js";

describe("Session-based Authentication", () => {
  let agent;

  beforeEach(() => {
    // Supertest agent to persist cookies across requests
    agent = request.agent(app);
  });

  it("should fail login with wrong credentials", async () => {
    const res = await agent
      .post("/login")
      .send({ username: "admin", password: "wrong" });

    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal("Invalid credentials");
  });

  it("should login successfully with correct credentials", async () => {
    const res = await agent
      .post("/login")
      .send({ username: "admin", password: "secret" });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Login successful");
  });

  it("should not allow access to profile without login", async () => {
    const res = await request(app).get("/profile"); // not logged in
    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal("Unauthorized");
  });

  it("should allow access to profile after login", async () => {
    await agent.post("/login").send({ username: "admin", password: "secret" });
    const res = await agent.get("/profile");

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Welcome, admin");
  });

  it("should logout successfully and restrict profile access again", async () => {
    await agent.post("/login").send({ username: "admin", password: "secret" });
    await agent.post("/logout");

    const res = await agent.get("/profile");

    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal("Unauthorized");
  });
});

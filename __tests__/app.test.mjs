import supertest from "supertest";
import prisma from "../src/config/prisma.mjs";
import app from "../src/app.mjs";

describe("POST ADMIN TEST ", () => {
  afterAll(async () => {
    await prisma.admin.deleteMany({
      where: { username: "admin" },
    });
  });
  it("should create a new admin", async () => {
    const response = await supertest(app).post("/api/register").send({
      username: "admin",
      email: "admin@example.com",
      password: "password",
    });
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("id");
  });

  it("should not create a new admin with duplicate email", async () => {
    const response = await supertest(app).post("/api/register").send({
      username: "admin",
      email: "admin@example.com",
      password: "password",
    });
    // console.log(response.body);
    expect(response.status).toBe(409);
    expect(response.body.message).toBe("Admin with this email already exists");
  });

  it("should not create a empty fields", async () => {
    const response = await supertest(app).post("/api/register").send({
      username: "",
      email: "",
      password: "",
    });
    // console.log(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: "Username tidak boleh kosong" }),
        expect.objectContaining({ message: "Email tidak boleh kosong" }),
        expect.objectContaining({ message: "Password tidak boleh kosong" }),
      ])
    );
  });
});

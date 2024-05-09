const assert = require("assert");
import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app";
import { connectDB, disconnectDB } from "./connect-db-for-testing";
const Driver = mongoose.model("driver");

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

describe("Drivers controller", () => {
  it("GET to /api/drivers finds drivers in a location", () => {
    const firstDriver = new Driver({
      email: "first@test.com",
      location: { type: "Point", coordinates: [-122.4759902, 47.6147628] },
    });

    const secDriver = new Driver({
      email: "sec@test.com",
      location: { type: "Point", coordinates: [-80.253, 25.791] },
    });

    Promise.all([firstDriver.save(), secDriver.save()]).then(() => {
      request(app)
        .get("/api/drivers?lng=-80&lat=25")
        .end((err, res) => {
          assert(res.body.length === 1);
          assert(res.body[0].email === "sec@test.com");
        });
    });
  });

  it("Post to /api/drivers create a new driver", async () => {
    const res = await request(app)
      .post("/api/drivers")
      .send({ email: "test@test.com" });

    expect(res.status).toBe(201);
  });

  it("Put to /api/drivers/id update an existing driver", async () => {
    const driver = new Driver({ email: "test@test.com", driving: false });
    await driver.save();

    const res = await request(app)
      .put(`/api/drivers/${driver._id}`)
      .send({ driving: true });

    expect(async () => {
      const driver = await Driver.findOne({ email: "test@test.com" });
      assert(driver.driving === true);
    });
  });

  it("Delete to /api/drivers/id delete an existing driver", async () => {
    const driver = new Driver({ email: "test@test.com", driving: false });
    await driver.save();

    const res = await request(app)
      .delete(`/api/drivers/${driver._id}`)
      .send(driver);

    expect(async () => {
      const driver = await Driver.findOne({ email: "test@test.com" });
      assert(!driver);
    });
  });
});

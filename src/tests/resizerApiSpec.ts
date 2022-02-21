import { promises as fspromises } from "fs";
import supertest from "supertest";
import app from "../app";
import Image from "../modules/image";

const request = supertest(app);

describe("Resizer endPoint responses", () => {
  describe("endPoin validators:", () => {
    it("should not have missing attributes.", async () => {
      const response = await request.get(
        "/api/images?=fjord&width=250&height=250"
      );
      expect(response.status).toBe(400);
    });

    it("should not have missing values.", async () => {
      const response = await request.get(
        "/api/images?name=&width=250&height=250"
      );
      expect(response.status).toBe(400);
    });

    it("should have numbers is width and height values.", async () => {
      const response = await request.get(
        "/api/images?name=fjord&width=mm&height=250"
      );
      expect(response.status).toBe(400);
    });
  });

  describe("endPoin Processing:", function () {
    it("returns a correct response on a valid request", async () => {
      const response = await request.get(
        "/api/images?name=fjord&width=250&height=250"
      );
      expect(response.status).toBe(200);
    });

    it("returns a 404 error on an invalid image", async () => {
      const response = await request.get(
        "/api/images?name=fjo999rd&width=250&height=250"
      );
      expect(response.status).toBe(404);
    });

    afterAll(async (): Promise<void> => {
      const img = new Image("fjord", 250, 250);
      await fspromises.rm(img.cachePath());
    });
  });
});

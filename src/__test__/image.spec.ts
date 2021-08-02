import * as request from "supertest";
import { expect } from "chai";

import { app } from "../app";

describe("Image Routers", () => {
  describe("GET /presigned_post: get presinged post", () => {
    context("When user requests", () => {
      it("should return presigned post", async () => {
        return request(app)
          .get("/images/presigned_post")
          .query({ fileName: "image", fileType: "png" })
          .expect(200)
          .then((response) => {
            expect(response.body).has.property("url");
            expect(response.body).has.property("fields");
          })
          .catch((error) => {
            throw error;
          });
      });
    });
  });
});

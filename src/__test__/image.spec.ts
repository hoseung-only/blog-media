import * as request from "supertest";
import { expect } from "chai";

import { app } from "../app";

describe("Post Image Routers", () => {
  describe("GET /:id/images/presigned_post: get presinged post", () => {
    context("When user requests", () => {
      it("should return presigned post", async () => {
        return request(app)
          .get("/posts/asdf/images/presigned_post")
          .query({ fileName: "image", fileType: "png" })
          .expect(200)
          .then((response) => {
            expect(response.body).has.property("url");
            expect(response.body).has.property("fields");
            expect(response.body.fields.key).to.be.eq("/posts/asdf/image.png");
          })
          .catch((error) => {
            throw error;
          });
      });
    });
  });
});

import { Router } from "express";
import { param, query } from "express-validator";

import { validateParameters } from "../middlewares/validateParameters";

import * as Presenters from "../presenters";

import { PresignedPostGenerator } from "../services/presignedPostGenerator";

export const applyPostImageRouters = (rootRouter: Router) => {
  const router = Router();

  router.get(
    "/:id/images/presigned_post",
    param("id").isString().exists(),
    query("fileName").isString().exists(),
    query("fileType").isString().exists(),
    validateParameters,
    async (req, res, next) => {
      try {
        const postId = req.params.id as string;
        const fileName = req.query.fileName as string;
        const fileType = req.query.fileType as string;

        const key = `/posts/${postId}/${fileName}.${fileType}`;

        const presignedPost = await new PresignedPostGenerator(key).generate();

        return res.status(200).json(Presenters.presentPresignedPost(presignedPost));
      } catch (error) {
        return next(error);
      }
    }
  );

  rootRouter.use("/posts", router);
};

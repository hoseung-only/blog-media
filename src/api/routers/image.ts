import { Router } from "express";
import { query } from "express-validator";

import { validateParameters } from "../middlewares/validateParameters";

import * as Presenters from "../presenters";

import { PresignedPostGenerator } from "../services/presignedPostGenerator";

export const applyImageRouters = (rootRouter: Router) => {
  const router = Router();

  router.get(
    "/presigned_post",
    query("fileName").isString().exists(),
    query("fileType").isString().exists(),
    validateParameters,
    async (req, res, next) => {
      try {
        const fileName = req.query.fileName as string;
        const fileType = req.query.fileType as string;

        const presignedPost = await new PresignedPostGenerator(fileName, fileType).generate();

        return res.status(200).json(Presenters.presentPresignedPost(presignedPost));
      } catch (error) {
        return next(error);
      }
    }
  );

  rootRouter.use("/images", router);
};

import { Router } from "express";

import { applyPostImageRouters } from "./routers/post";
import { applyErrorHandlers } from "./errorHandlers";

export const getRootRouter = () => {
  const router = Router();

  applyPostImageRouters(router);
  applyErrorHandlers(router);

  return router;
};

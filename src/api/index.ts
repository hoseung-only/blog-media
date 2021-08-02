import { Router } from "express";

import { applyImageRouters } from "./routers/image";
import { applyErrorHandlers } from "./errorHandlers";

export const getRootRouter = () => {
  const router = Router();

  applyImageRouters(router);
  applyErrorHandlers(router);

  return router;
};

import express from "express";
import {
  index,
  create,
  update,
  deleteDriver,
} from "../controllers/drivers-controller";
import { errorHandlerMiddleware } from "../middleware/error-handler";
const router = express.Router();

router.get("/drivers", errorHandlerMiddleware(index));
router.post("/drivers", errorHandlerMiddleware(create));
router.put("/drivers/:id", errorHandlerMiddleware(update));
router.delete("/drivers/:id", errorHandlerMiddleware(deleteDriver));

export default router;

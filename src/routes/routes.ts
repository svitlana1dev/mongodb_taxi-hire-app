import express from "express";
import { index, create, update, deleteDriver } from "../controllers/drivers.controller";
const router = express.Router();

router.get("/drivers", index);
router.post("/drivers", create);
router.put("/drivers/:id", update);
router.delete("/drivers/:id", deleteDriver);

export default router;

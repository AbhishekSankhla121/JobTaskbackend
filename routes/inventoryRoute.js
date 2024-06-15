import express from "express"
import { getData } from "../controller/inventoryController.js";

const router = express.Router();

router.route("/inventory").get(getData)
export default router
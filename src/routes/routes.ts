import { Router } from "express";
import { getJson, updateJson } from "../controller/previewController";


const router = Router();

router.post("/update", updateJson);

router.get("/get",getJson)


export default router;
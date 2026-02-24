import { Router } from "express";
import { addElements, deleteElement, getJson, updateJson } from "../controller/previewController";


const router = Router();

router.post("/update", updateJson);

router.get("/get",getJson)

router.post("/add",addElements)
router.delete("/delete", deleteElement);


export default router;
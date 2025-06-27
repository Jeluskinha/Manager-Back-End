import { Router } from "express";
import userCreateController from "../controllers/users/userCreate.controller";
import userListController from "../controllers/users/userList.controller";

const router = Router();

router.post("/", userCreateController);
router.get("/", userListController);

export default router;

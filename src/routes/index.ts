import { Router } from "express";
import itemRoutes from "../modules/items/items.routes";
import userRoutes from "../modules/users/users.routes";

const router = Router();

router.use("/items", itemRoutes);
router.use("/users", userRoutes);

export default router;

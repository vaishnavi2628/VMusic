import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware";
import { createSong, deleteSong } from "../controller/admin.controller";

const router=Router();

router.post("/songs",protectRoute,requireAdmin,createSong);
router.delete("/songs/:id", protectRoute,requireAdmin,deleteSong);



export default router;


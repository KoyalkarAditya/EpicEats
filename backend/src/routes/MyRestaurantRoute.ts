import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMYRestaurantRequest } from "../middleware/validation";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.get("/", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant);

router.post(
  "/",
  upload.single("imageFile"),
  validateMYRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.createMYRestaurant
);

router.put(
  "/",
  upload.single("imageFile"),
  validateMYRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.updateMyRestaurant
);

router.get(
  "/orders",
  jwtCheck,
  jwtParse,
  MyRestaurantController.getMyRestaurantOrders
);
export default router;

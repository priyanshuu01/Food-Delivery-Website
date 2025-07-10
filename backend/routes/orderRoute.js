import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder ,placeOrders} from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrders);

export default orderRouter;
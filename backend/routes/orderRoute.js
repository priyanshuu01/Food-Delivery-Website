import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder ,placeOrders,userOrders} from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrders);
orderRouter.post("/userorders",authMiddleware,userOrders)

export default orderRouter;
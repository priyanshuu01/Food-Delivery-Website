// orderController.js
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

// Load environment variables
dotenv.config(); // 👈 This is VERY IMPORTANT

// Initialize Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY is not set in environment variables");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place order and create Stripe checkout session
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173"; // Update if using deployed frontend

  console.log("=== PLACE ORDER REQUEST ===");
  console.log("Request body:", req.body);
  console.log("User from token:", req.user);

  try {
    // Get userId from authenticated user (set by authMiddleware)
    const userId = req.user.id;
    
    if (!userId) {
      return res.json({ success: false, message: "User not authenticated" });
    }

    if (!req.body.items || req.body.items.length === 0) {
      return res.json({ success: false, message: "No items in cart" });
    }

    const newOrder = new orderModel({
      userId: userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    console.log("Order saved:", newOrder._id);

    // Clear user's cart after placing the order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Price must be in paise (not rupees * 80)
      },
      quantity: item.quantity,
    }));

    // Add delivery charges (increased to meet Stripe minimum)
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 1000, // ₹10 * 100 (to ensure minimum $0.50 USD)
      },
      quantity: 1,
    });

    console.log("Creating Stripe session with line_items:", line_items);
    
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    console.log("Stripe session created successfully:", session.id);
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("=== ORDER PLACEMENT ERROR ===");
    console.error("Error Details:", {
      message: error.message,
      type: error.type,
      code: error.code,
      stack: error.stack
    });
    
    const errorMessage = error.message || "Unknown error occurred";
    res.json({ success: false, message: `Order placement failed: ${errorMessage}` });
  }
};

// For testing only
const placeOrders = (req, res) => {

  // Check if user is attached by authMiddleware
  if (!req.headers.token) {
    return res.status(401).json({ success: false, message: "Not authorized. Please login." });
  }

  const { amount, items } = req.body;
  console.log(amount, items);
  res.status(200).json({ amount, items });
};


// Verify payment and update order status
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.json({ success: false, message: "Error verifying payment" });
  }
};

//user orders for frontend
export const userOrders = async (req,res) =>{
  console.log("=== USER ORDERS REQUEST ===");
  console.log("Request body:", req.body);
  console.log("User from token:", req.user);
  
  try {
    // Get userId from authenticated user (consistent with placeOrder)
    const userId = req.user.id;
    
    // Debug: Check total orders in database
    const totalOrders = await orderModel.find({});
    console.log("Total orders in database:", totalOrders.length);
    
    console.log("Searching orders for userId:", userId);
    const orders = await orderModel.find({userId: userId});
    console.log("Found orders for user:", orders.length);
    console.log("Orders data:", orders);
    
    res.json({success:true,data:orders})
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.json({success:false,message:"Error fetching orders"})
  }
}

// Admin: Get all orders
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

// Admin: Update order status
const statusUpdate = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.json({ success: false, message: "Error updating status" });
  }
};

export { placeOrder, placeOrders, verifyOrder, listOrders, statusUpdate };

// orderController.js
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

// Load environment variables
dotenv.config(); // 👈 This is VERY IMPORTANT

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place order and create Stripe checkout session
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173"; // Update if using deployed frontend

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    // Clear user's cart after placing the order
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

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

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200, // ₹2 * 100
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error.message);
    res.json({ success: false, message: "Order placement failed" });
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

export { placeOrder, placeOrders };

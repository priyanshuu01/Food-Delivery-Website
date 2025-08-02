// import express from "express"
// import cors from "cors"
// import { connectDB } from "./config/db.js"
// import foodRouter from "./routes/foodRoute.js"
// import userRouter from "./routes/userRoute.js"
// import 'dotenv/config'
// import cartRouter from "./routes/cartRoute.js"
// import orderRouter from "./routes/orderRoute.js"

// import dotenv from 'dotenv';
// dotenv.config();


// //app config
// const app=express()
// const port=4000

// //middleware
// app.use(express.json())
// // app.use(cors())
// app.use(cors({
//   // origin: 'http://localhost:5173', // your frontend URL
//   origin: 'https://food-delivery-website-3-u43q.onrender.com', // your frontend URL
//   credentials: true
// }));

// //db connection 
// connectDB();

// //api endpoints
// app.use("/api/food",foodRouter)
// app.use("/images",express.static('uploads'))
// app.use("/api/user" , userRouter)
// app.use("/api/cart",cartRouter)
// app.use("/api/order",orderRouter)

// app.get("/",(req,res)=>{
//     res.send("API WORKING")
// })

// // run app server
// app.listen(port,()=>{
//     console.log(`Server Started on http://localhost:${port}`)

// })

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

import { createDefaultAdmin } from "./createDefaultAdmin.js";


dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// ✅ CORS setup — allow localhost and deployed frontend
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "http://localhost:5177",
  "http://localhost:3000",
  "http://localhost:4000",
  "https://food-delivery-website-3-u43q.onrender.com",
  "https://food-delivery-website-3-u43q.onrender.com/"
];

// Enhanced CORS configuration for production deployment
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Log the blocked origin for debugging
    console.log('❌ CORS blocked origin:', origin);
    callback(new Error(`❌ Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
  optionsSuccessStatus: 200 // For legacy browser support
}));

// Optional: Log incoming request origins (for debugging)
app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});

// Additional CORS headers as fallback
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization,token');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Database connection
connectDB();


// Create default admin user
createDefaultAdmin();



// API routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static("uploads"));

// Root route
app.get("/", (req, res) => {
  res.send("🚀 API WORKING");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});




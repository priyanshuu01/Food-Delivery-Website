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
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import dotenv from "dotenv";

dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// ✅ CORS setup — allow localhost & deployed frontend
const allowedOrigins = [
  'http://localhost:5173',
  'https://food-delivery-website-3-u43q.onrender.com'
];

app.use(cors({

  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },

   origin:'*',
   // 'http://localhost:5173',
   // your frontend URL
  //  origin: 'https://food-delivery-website-3-u43q.onrender.com',

  credentials: true
}));

// Optional: log incoming origin headers for debugging
app.use((req, res, next) => {
  console.log('Request Origin:', req.headers.origin);
  next();
});

// DB connection 
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Root route
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});



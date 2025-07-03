import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

import dotenv from 'dotenv';
dotenv.config();


//app config
const app=express()
const port=4000

//middleware
app.use(express.json())
// app.use(cors())
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true
}));

//db connection 
connectDB();

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user" , userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API WORKING")
})

// run app server
app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)

})


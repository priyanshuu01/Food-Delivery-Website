import mongoose from "mongoose";

export const connectDB = async () =>{
    // await mongoose.connect('mongodb+srv://priyanshuyadav:9756027295@cluster0.hpyajqn.mongodb.net/food-delivery').then(()=>console.log("DB Connected"));
    await mongoose.connect('mongodb+srv://priyanshuyadav9997066347:9756027295@cluster1.csh8vaw.mongodb.net/food-del').then(()=>console.log("DB Connected"));
};


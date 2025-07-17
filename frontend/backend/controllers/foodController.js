// import foodModel from "../models/foodModel.js"
// import fs from 'fs'

// //add food item
// const addFood = async (req,res)=>{

//   let image_filename = `${req.file.filename}`;

// const food = new foodModel({
//     name:req.body.name,
//     description:req.body.description,
//     price:req.body.price,
//     category:req.body.category,
//     image:image_filename
// })
// try{
//     await food.save();
//     res.json({success:true,message:"Food Added"})
// }catch(error){
//     console.log(error)
//     res.json({success:false,message:"Error"})
// }

// }

// const listFood=async (req,res)=>{
//     try{
//         const foods =await foodModel.find({});
//         res.json({success:true,data:foods})
//     }
//     catch(error){
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }

// export {addFood}

import foodModel from "../models/foodModel.js";
import fs from "fs";
import path from "path";

// ✅ Add Food Item
const addFood = async (req, res) => {
  try {
    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is missing" });
    }

    const { name, description, price, category } = req.body;

    // Basic validation
    if (!name || !description || !price || !category) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    const image_filename = req.file.filename;

    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: "Food Added Successfully" });
  } catch (error) {
    console.error("Add Food Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ List All Food Items
const listFood = async (req, res) => {
  try {

    // console.log("workinggg.....");
    const foods = await foodModel.find({});
    console.log(foods)
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error("List Food Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Remove Food Item
const removeFood = async (req, res) => {
  try {
    const { id } = req.body;

    const food = await foodModel.findById(id);
    if (!food) return res.status(404).json({ success: false, message: "Food not found" });

    const imagePath = path.join("uploads", food.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // Delete image file
    }

    await foodModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Food item removed successfully" });
  } catch (error) {
    console.error("Remove Food Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { addFood, listFood,removeFood};


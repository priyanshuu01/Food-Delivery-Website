// import express from "express"
// import { addFood } from "../controllers/foodController.js"
// import multer from "multer"
 

// const foodRouter = express.Router();

// //image storage Engine
// const storage = multer.diskStorage({
//     destination:"uploads",
//     filename:(req,file,cb)=>{
//        return cb(null, `${Date.now()}${file.originalname}`)
//     }
// })

// const upload = multer({storage:storage})

// foodRouter.post("/add",upload.single("image"),addFood)
// export default foodRouter;

import express from "express";
import { addFood, listFood , removeFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// POST route to add a food item
foodRouter.post("/add", upload.single("image"), addFood);

// ✅ Add this GET route to list food items
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood); 

export default foodRouter;

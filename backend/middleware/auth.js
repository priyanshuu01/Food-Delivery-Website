import jwt from "jsonwebtoken"

 const authMiddleware = async (req,resizeBy,next) =>{
  const{token} = req.headers;
  if(!token){
    return res.json({success:false,message:"Not Authorised Login Again"})
  }
  try {
    const token_decode = jwt.verify(token,process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.log(error);
  }
 }
export default authMiddleware;
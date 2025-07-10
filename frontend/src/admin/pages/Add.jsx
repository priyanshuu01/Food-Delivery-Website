import React, {  useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
const Add = ({url}) => {
    const[image,setImage]=useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    })
    const onChangeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    const onSubmitHandler = async (event) =>{
       event.preventDefault();
       const formData = new FormData();
       formData.append("name",data.name)
       formData.append("description",data.description)
       formData.append("price",Number(data.price))
       formData.append("category",data.category)
       formData.append("image",image)
       const response = await axios.post(`${url}/api/food/add`,formData);
       if(response.data.success){
          setData({
        name:"",
        description:"",
        price:"",
        category:"Salad"
        })
        setImage(false) 
        toast.success(response.data.message)
       }
       else{
          toast.error(response.data.message)
       }
    }
  return (
    <div className='add'>{
        <form  className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={ image?URL.createObjectURL(image): assets.upload_area} alt="" />
                    <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
                </label>
            </div>
            <input value={data.name} onChange={onChangeHandler} type="text" name="name" placeholder="Name of food" required />
            <input value={data.description} onChange={onChangeHandler} type="text" name="description" placeholder="Description" required />
            <input value={data.price} onChange={onChangeHandler} type="number" name="price" placeholder="Price" required />
            <select name="category" onChange={onChangeHandler} value={data.category} >
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Desserts">Desserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
            </select>
            <button type="submit" className="add-btn">ADD</button>
        </form>
        }
    </div>
  )
}
export default Add

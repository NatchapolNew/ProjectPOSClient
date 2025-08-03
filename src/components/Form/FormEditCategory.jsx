import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../../context/StoreContext"
import { useNavigate, useParams } from "react-router-dom"
import { getCategoryById, updateCategory } from "../../services/Category";
import { toast } from "react-toastify";


const initialState = {
  categoryName: "",
};

const FormEditCategory = () => {

const navigate = useNavigate();
const {token,setToken} = useContext(StoreContext)
const [form,setForm] = useState(initialState)
const {id} = useParams();


const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleOnSubmit = async(e)=>{
    e.preventDefault()
    try{
       const res = await updateCategory(token,id,form);
       setForm("")
       if(res.status === 200){
        toast.success("แก้ไขประเภทสินค้าสำเร็จ")
       }
       navigate("/panel/createcategory")
    }catch(err){
        console.log(err)
    }
}
const fetchCategory = async(token,id)=>{
    const res = await getCategoryById(token,id);
    setForm(res)
    console.log(form)
}

useEffect(()=>{
fetchCategory(token,id)
setToken(localStorage.getItem("token"))
},[])

  return (
    <>
    <form className="border-1 border-zinc-300 h-70" onSubmit={handleOnSubmit}>
        <div className="flex gap-2 mt-20 ml-15 text-zinc-600">
          <div>
            <p className="font-bold text-xl">ชื่อประเภทสินค้า</p>
            <input
              type="text"
              name="categoryName"
              value={form.categoryName}
              placeholder="ประเภทสินค้า"
              onChange={handleOnChange}
              className="border-1 rounded-md border-zinc-400"
              required
            />
          </div>

          <div className="relative mt-10 text-black ">
            <button className="border-2 rounded-md h-8 font-bold border-zinc-400 bg-zinc-400 w-40 hover:bg-zinc-600">
              เพิ่มประเภทสินค้า
            </button>
          </div>
        </div>
      </form>
    
    </>
  )
}
export default FormEditCategory
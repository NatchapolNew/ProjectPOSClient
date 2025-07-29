import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { createProduct } from "../../services/Product";
import {toast} from "react-toastify"
import ProductCard from "../Card/ProductCard";

const initialState = {
    name: "",
    price: "",
    cost: "",
    quantity: "",
    barcode:"",
    categoryId: "",
}

const FormProduct = () => {
  // "name": "testwdd",
  // "price": 123.23,
  // "cost": 123,
  // "quantity": 100,
  //  "categoryId":3
  const { token, setToken, loadCategory, category,loadProduct } = useContext(StoreContext);
  const [form, setForm] = useState({
    name: "",
    price: 0,
    cost: 0,
    quantity: 0,
    barcode:"",
    categoryId:"",
  });
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    loadCategory(token);
  }, []);



  const handleOnChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleOnSubmit = async(e)=>{
    e.preventDefault();
    try{
        const res = await createProduct(token,form);
        setForm(initialState)
        await loadProduct(token);
        if(res.status === 201){
            toast.success("เพิ่มสินค้าสำเร็จ")
        }else{
            toast.error('เพิ่มไม่สำเร็จ')
        }
        
    }catch(err){
        console.log(err)
        toast.error("เพิ่มข้อมูลไม่สำเร็จ,หรือมีสินค้านี้แล้วในระบบ")
    }

  }
  console.log(form)

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <h1>เพิ่มข้อมูลสินค้า</h1>
        <div className="flex gap-2 mt-20 ml-15">
            <div>
                <p className="font-bold text-xl">บาร์โค้ดสินค้า</p>
                <input 
                type="text" 
                name="barcode"
                value={form.barcode}
                placeholder="บาร์โค้ดสินค้า"
                onChange={handleOnChange}
                className="border-1 rounded-md border-zinc-400"
                required
                />
            </div>
            <div>
                <p className="font-bold text-xl">ชื่อสินค้า</p>
                <input 
                type="text" 
                name="name"
                value={form.name}
                placeholder="ชื่อสินค้า"
                onChange={handleOnChange}
                className="border-1 rounded-md border-zinc-400"
                required
                />
            </div>
            <div>
                <p className="font-bold text-xl">ราคา</p>
                <input 
                type="number" 
                name="price"
                value={form.price}
                placeholder="ราคา"
                onChange={handleOnChange}
                className="border-1 rounded-md border-zinc-400"
                required
                />
            </div>

            <div>
                <p className="font-bold text-xl">ต้นทุนสินค้า</p>
                <input 
                type="number" 
                name="cost"
                value={form.cost}
                placeholder="ต้นทุนสินค้า"
                onChange={handleOnChange}
                className="border-1 rounded-md border-zinc-400"
                required
                />
            </div>

            <div>
                <p className="font-bold text-xl">จำนวนสินค้า</p>
                <input 
                type="number" 
                name="quantity"
                value={form.quantity}
                placeholder="จำนวนสินค้า"
                onChange={handleOnChange}
                className="border-1 rounded-md border-zinc-400"
                required
                />
            </div>
        
        <div>
            <p className="font-bold text-xl">ประเภทสินค้า</p>
        {/* select category */}
        <select
        name="categoryId"
        onChange={handleOnChange}
        value={form.categoryId}
        className="border-1 rounded-md border-zinc-400"
        >
          <option value="" disabled>
            Please Select
          </option>

          {category.map((item,index) => (
            <option key={index} value={item.id}>{item.categoryName}</option>
          ))}
        </select>
        </div>
        <div className="relative mt-10">
        <button className="border-2 rounded-md h-8 font-bold border-zinc-400 bg-zinc-400 w-20">เพิ่มสินค้า</button>
        </div>
        </div>
        </form>

          {/* ProductCard */}
          <div className="mt-10">
          <ProductCard/>
          </div>



    </>
  );
};
export default FormProduct;

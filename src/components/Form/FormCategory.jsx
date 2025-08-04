import { useContext, useEffect, useState } from "react";
import CategoryCard from "../Card/CategoryCard";
import { StoreContext } from "../../context/StoreContext";
import { createCategory } from "../../services/Category";
import { toast } from "react-toastify";

const initialState = {
  categoryName: "",
};
const FormCategory = () => {
  const { loadCategory, token, setToken } = useContext(StoreContext);
  const [form, setForm] = useState(initialState);

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    try {
     const res = await createCategory(token, form);
      loadCategory(token);
      setForm(initialState);
      if(res.status === 201){
        toast.success("เพิ่มประเภทสินค้าสำเร็จ")
      }
    } catch (err) {
        console.log(err)
        toast.error("ไม่สามารถเพิ่มประเภทสินค้าได้,มีประเภทสินค้านี้อยู่แล้ว")
    }
  };

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    loadCategory(token);
  }, []);

  return (
    <>
      <div className="bg-blue-900 w-full text-white flex justify-center h-28 items-center">
        <h3>เพิ่มประเภทสินค้า</h3>
      </div>
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

          <div className="relative mt-10 text-black">
            <button className=" bg-green-500  text-white h-8 w-40 hover:bg-green-600 duration-200">
              เพิ่มประเภทสินค้า
            </button>
          </div>
        </div>
      </form>

      <div>
        <CategoryCard />
      </div>
    </>
  );
};
export default FormCategory;

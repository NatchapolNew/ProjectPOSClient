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
      <div className="text-zinc-700">
        <h4>เพิ่มประเภทสินค้า</h4>
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

          <div className="relative mt-10 text-black ">
            <button className="border-2 rounded-md h-8 font-bold border-zinc-400 bg-zinc-400 w-40 hover:bg-zinc-600">
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

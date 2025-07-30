import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../services/Product";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  price: "",
  cost: "",
  quantity: "",
  barcode: "",
  categoryId: "",
};

const FormEditProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { token, setToken, loadCategory, category } = useContext(StoreContext);
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    loadCategory(token);
    fetchProduct(token, id);
  }, []);

  const fetchProduct = async (token, id) => {
    try {
      const res = await getProductById(token, id);
      setForm(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(token, id, form);
      setForm(initialState);
      toast.success("แก้ไขสินค้าสำเร็จ");
      navigate("/panel/createproduct");
    } catch (err) {
      console.log(err);
      toast.error("แก้สินค้าไม่สำเร็จ");
    }
  };
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <h1>แก้ไขข้อมูลสินค้า</h1>
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

              {category.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="relative mt-10">
            <button className="border-2 rounded-md h-8 font-bold border-zinc-400 bg-zinc-400 w-20">
              เพิ่มสินค้า
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default FormEditProduct;

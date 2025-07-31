import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { deleteCategory } from "../../services/Category";
import { toast } from "react-toastify";

const CategoryCard = () => {
  const { token, setToken, category, loadCategory } = useContext(StoreContext);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    loadCategory(token);
  }, []);

  const handleDelete = async (id,index) => {
    if(window.confirm(`ต้องการลบประเภทสินค้าลำดับที่ ${index+1} หรือไม่?`)){
      try {
        const res = await deleteCategory(token, id);
        loadCategory(token);
        if (res.status === 200) {
          toast.success("ลบประเภทสินค้าสำเร็จ");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <div>
        <table class="min-w-full border border-gray-300">
          <thead class="bg-gray-200">
            <tr>
              <th class="border px-4 py-2 text-left">ลำดับ</th>
              <th class="border px-4 py-2 text-left">ชื่อสินค้า</th>
              <th class="border px-4 py-2 text-left">แก้ไข/ลบ</th>
            </tr>
          </thead>
          <tbody>
            {category.map((cate, index) => (
              <tr>
                <td class="border px-4 py-2">{index + 1}</td>
                <td class="border px-4 py-2">{cate.categoryName}</td>
                <td class="border px-4 py-2">
                  <div className="flex gap-2 ">
                    <p
                      className="bg-yellow-500 rounded-md p-1 shadow-md 
                    hover:scale-105 hover:translate-y-1 hover:duration-200"
                    >
                      <Link to={"/panel/editproduct/" + cate.id}>
                        <Pencil />
                      </Link>
                    </p>

                    <p
                      className="bg-red-500 w-8 rounded-md p-1 shadow-md hover:cursor-pointer
                      hover:scale-105 hover:translate-y-1 hover:duration-200"
                      onClick={() => handleDelete(cate.id,index)}
                    >
                      <Trash />
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default CategoryCard;

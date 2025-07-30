import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Trash, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../services/Product";
import { toast } from "react-toastify";
import SearchCard from "./SearchCard";
const ProductCard = () => {
  const { token, product, loadProduct, category } = useContext(StoreContext);

  useEffect(() => {
    loadProduct(token);
  }, []);

  const ProductWithCategoryName = product.map((product) => {
    const categories = category.find((cate) => cate.id === product.categoryId);
    return {
      ...product,
      categoryName: categories ? categories.categoryName : "ไม่พบหมวดหมู่",
    };
  });

const handleDelete = async(id)=>{
  if(window.confirm("จะลบสินค้านี้ใช่ไหม?")){
    try{
      await deleteProduct(token,id);
      loadProduct(token);
      toast.success("ลบสำเร็จ")
    }catch(err){
      console.log(err)
    }
  }

}

  return (
    <>
      <SearchCard/>


      <table class="min-w-full border border-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th class="border px-4 py-2 text-left">ลำดับ</th>
            <th class="border px-4 py-2 text-left">บาร์โค้ดสินค้า</th>
            <th class="border px-4 py-2 text-left">ชื่อสินค้า</th>
            <th class="border px-4 py-2 text-left">ราคา</th>
            <th class="border px-4 py-2 text-left">ต้นทุนสินค้า</th>
            <th class="border px-4 py-2 text-left">จำนวนสินค้า</th>
            <th class="border px-4 py-2 text-left">ประเภทสินค้า</th>
            <th class="border px-4 py-2 text-left">แก้ไข/ลบ</th>
          </tr>
        </thead>
        <tbody>
          {ProductWithCategoryName.map((item, index) => (
            <tr>
              <td class="border px-4 py-2">{index+1}</td>
              <td class="border px-4 py-2">{item.barcode}</td>
              <td class="border px-4 py-2">{item.name}</td>
              <td class="border px-4 py-2">{item.price}</td>
              <td class="border px-4 py-2">{item.cost}</td>
              <td class="border px-4 py-2">{item.quantity}</td>
              <td class="border px-4 py-2">{item.categoryName}</td>
              <td class="border px-4 py-2">
                <div className="flex gap-2 justify-center items-center">
                  <p
                    className="bg-yellow-500 rounded-md p-1 shadow-md 
                    hover:scale-105 hover:translate-y-1 hover:duration-200"
                  >
                    <Link to={"/panel/editproduct/"+item.id }>
                      <Pencil />
                    </Link>
                  </p>

                  <p
                    className="bg-red-500 w-8 rounded-md p-1 shadow-md hover:cursor-pointer
                      hover:scale-105 hover:translate-y-1 hover:duration-200"
                      onClick={()=>handleDelete(item.id)}
                  >
                    <Trash />
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default ProductCard;

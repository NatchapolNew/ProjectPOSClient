import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";

const ProductCard = () => {
  const { token, product, loadProduct,category } = useContext(StoreContext);

  useEffect(() => {
    loadProduct(token);
  }, [product]);


  const ProductWithCategoryName = product.map((product)=>{
        const categories = category.find((cate)=>cate.id === product.categoryId);
        return{
            ...product,categoryName: categories ? categories.categoryName : "ไม่พบหมวดหมู่"
        }
  })


  console.log(category);

  

  return (
    <>
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
          {ProductWithCategoryName.map((item,index) => (
            <tr>
                
              <td class="border px-4 py-2">{index+1}</td>
              <td class="border px-4 py-2">{item.barcode}</td>
              <td class="border px-4 py-2">{item.name}</td>
              <td class="border px-4 py-2">{item.price}</td>
              <td class="border px-4 py-2">{item.cost}</td>
              <td class="border px-4 py-2">{item.quantity}</td>
              <td class="border px-4 py-2">{item.categoryName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default ProductCard;

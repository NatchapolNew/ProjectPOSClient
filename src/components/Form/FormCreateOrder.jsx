import { useContext, useEffect, useState, useRef } from "react";
import { StoreContext } from "../../context/StoreContext";
import { getProductByBarcode } from "../../services/Product";
import { toast } from "react-toastify";
import { createOrder } from "../../services/OrderService";
import { Trash } from "lucide-react";
import SearchCard from "../Card/SearchCard";
import ShowProductOnlyCard from "../Card/ShowProductOnlyCard";

const initialState = {
  orderItems: [],
};

const FormCreateOrder = () => {
  const { token, setToken, loadProduct, product,loadCategory } = useContext(StoreContext);
  const [barcode, setBarcode] = useState();
  const barcodeRef = useRef(null);
  const [form, setForm] = useState(initialState);

  const handleDelete = (productId) => {
    const deleteItem = form.orderItems.filter(
      (item) => item.productId !== productId
    );
    setForm({ orderItems: deleteItem });
    barcodeRef.current?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      orderItems: form?.orderItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };
    try {
      const res = await createOrder(token, payload);
      console.log(res);
      setForm(initialState);
      barcodeRef.current?.focus();
      loadProduct(token);
      toast.success("เพิ่มใบเสร็จเรียบร้อยแล้ว")
    } catch (err) {
      console.log(err);
    }
  };

  const totalPrice = form?.orderItems?.reduce((prev, curr) => {
    return prev + curr.productPrice * curr.quantity;
  }, 0);

  const handleOnKey = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      try {
        const res = await getProductByBarcode(token, barcode);
        if (res?.id) {
          setForm((prev) => {
            //เช็คProductIdที่มีอยู่แล้ว
            const exitsProdouctId = prev.orderItems?.findIndex(
              (item) => Number(item.productId) === Number(res.id)
            );

            //เพิ่มProductName จากstateที่มีอยู่แล้ว
            const products = product.find(
              (item) => Number(item.id) === Number(res.id)
            );
            //จำนวนสต๊อกสินค้า
            const stock = products.quantity;

            //ถ้าไม่มีfindIndexจะได้-1
            if (exitsProdouctId !== -1) {
              //เช็คสต๊อก(ถ้ามีสินค้า)
              const currentQty = prev.orderItems[exitsProdouctId].quantity;
              if (currentQty + 1 > products.quantity) {
                toast.error(
                  `สินค้า${products.name}มีจำนวน ${products.quantity}`
                );
                return prev;
              }

              //ประกาศstate updateitems แล้วspread ค่าเดิม
              const updateItems = [...prev.orderItems];
              //updateค่าเดิมหรือindexเดิม
              updateItems[exitsProdouctId] = {
                ...updateItems[exitsProdouctId],
                quantity: updateItems[exitsProdouctId].quantity + 1,
              };
              return { ...prev, orderItems: updateItems };
            } else {
              //ถ้ายังไม่มีสินค้า
              if (stock < 1) {
                toast.error(
                  `${products.name}มีจำนวน ${products.quantity} ชิ้น`
                );
                return prev;
              }

              return {
                ...prev,
                orderItems: [
                  ...prev.orderItems,
                  {
                    productId: res.id,
                    productName: products.name,
                    productPrice: products.price,
                    quantity: 1,
                  },
                ],
              };
            }
          });
        } else {
          toast.error("ไม่พบรหัสสินค้า");
          setBarcode("");
          barcodeRef.current?.focus();
          return;
        }
        setBarcode("");
        barcodeRef.current?.focus();
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    loadProduct(token);
    loadCategory(token);
  }, []);

  return (
    <>
    <div className="bg-pink-500 w-full text-white flex justify-center h-28 items-center">
        <h3>คิดเงิน</h3>
      </div>

      <form>
        {/* input barcode */}
        <div className="flex mt-4 justify-items-center">
          <div className="mr-2">บาร์โค้ดสินค้า</div>
          <input
            ref={barcodeRef}
            className="border-1"
            type="text"
            onChange={(e) => setBarcode(e.target.value)}
            onKeyDown={handleOnKey}
            autoFocus
            value={barcode}
          />
        </div>

        {/* table */}
        <table class="min-w-full border border-gray-300 mt-10">
          <thead class="bg-gray-200">
            <tr>
              <th class="border px-4 py-2 text-left">ลำดับ</th>
              <th class="border px-4 py-2 text-left">ชื่อสินค้า</th>
              <th class="border px-4 py-2 text-left">จำนวนสินค้า</th>
              <th class="border px-4 py-2 text-left">ราคา(บาท)</th>
              <th class="border px-4 py-2 text-left">ลบ</th>
            </tr>
          </thead>
          <tbody>
            {form?.orderItems?.map((item, index) => (
              <tr>
                <td class="border px-4 py-2">{index + 1}</td>
                <td class="border px-4 py-2">{item.productName}</td>
                <td class="border px-4 py-2">{item.quantity}x{item.productPrice}</td>
                <td class="border px-4 py-2">
                  {item.productPrice * item.quantity}
                </td>
                <td class="border px-4 py-2">
                  <div className="flex gap-2 justify-center items-center">
                    <p
                      className="bg-red-500 w-8 rounded-md p-1 mt-3 shadow-md hover:cursor-pointer
                      hover:scale-105 hover:translate-y-1 hover:duration-200"
                      onClick={() => handleDelete(item.productId)}
                    >
                      <Trash />
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          
        {/* total */}
        <div className="mt-2 border w-full bg-gray-200">

        <div className="mt-3">
            <div className="flex justify-center">
            <div>
              <p className="font-bold">รวมทั้งหมด</p>
            </div>
            <div className="ml-2">
              <p>{(totalPrice?? 0).toFixed(2)} บาท</p>
            </div>
          </div>


          <div className="flex justify-center text-red-500">
            <div>
              <p className="font-bold">ส่วนลด</p>
            </div>

            <div className="ml-2">
              <p>- 0.00 บาท</p>
            </div>
          </div>

          <div className="flex justify-center text-red-500">
            <div>
              <p className="font-bold">Tax 7 %</p>
            </div>

            <div className="ml-2">
              <p>0.00 บาท</p>
            </div>
          </div>

          <div className="flex justify-center text-green-500">
            <div>
              <p className="font-bold">ราคาสุทธิ</p>
            </div>
            <div className="ml-2">
              <p>{(totalPrice?? 0).toFixed(2)} บาท</p>
            </div>
          </div>
        </div>
          
        </div>

        <div className="flex justify-center">
          <button
             className={`w-full ${form.orderItems.length != 0  ? "bg-green-500  text-white h-10 mt-1 hover:bg-green-600 duration-200":"bg-gray-600  text-white h-10 mt-1 hover:bg-gray-700 duration-200"}`}
            type="submit"
            onClick={handleSubmit}
            disabled={form.orderItems.length === 0}
          >
            ยืนยัน
          </button>
        </div>
        
        {/* search product */}
        <div>
          <div>
        <SearchCard/>
        <ShowProductOnlyCard/>
          </div>
        </div>
      </form>
    </>
  );
};
export default FormCreateOrder;

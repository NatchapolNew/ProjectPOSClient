import { useContext, useEffect, useState } from "react";
import OrderCard from "../Card/OrderCard";
import { StoreContext } from "../../context/StoreContext";
import { getOrderByDate } from "../../services/OrderService";

const FormViewOrders = () => {
  const { setToken, token, loadProduct, product } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getOrderByDate(token, startDate, endDate);

      const updatedOrders = res.map((order) => {

        //loop เข้าไปในarray orderItems
        const updatedItems = order.orderItems.map((item) => {
      
          //ค้นหาproductId
          const matched = product.find(
            (pro) => Number(pro.id) === Number(item.productId)
          );

          //spread operate ค่าorderitemsเดิม แล้วเพิ่มฟิลProductNameเข้าไปในobject
          return {
            ...item,
            productName: matched
              ? matched.name
              : `ไม่พบรหัสสินค้า ${item.productId}`,
            productCost: matched
              ? matched.cost
              : `ไม่พบรหัสสินค้า ${item.productId}`,
          };
        });

        return {
          ...order,
          orderItems: updatedItems,
        };
      });
      setOrders(updatedOrders);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    loadProduct(token);
  }, []);

  return (
    <>
    <div className="bg-pink-500 w-full text-white flex justify-center h-28 items-center">
      <h3>ค้นหาใบเสร็จ/ยอดขาย</h3>
    </div>
      <div className="mt-10">
        <h5 className="font-extrabold">ค้นหาใบเสร็จ</h5>
        <form
          onSubmit={handleOnSubmit}
          className="border-2 border-zinc-300 justify-items-center text-center bg-zinc-100"
        >
          <div className="flex mt-4">
            <div className="flex">
              <p className="mr-2">วันที่เริ่ม</p>
              <input
                className="border-2 h-6 border-zinc-300"
                type="date"
                placeholder="0000-00-00"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <p className="ml-5 font-semibold">ถึง</p>

            <div className="flex ml-4">
              <p className="mr-2">สิ้นสุดวันที่</p>
              <input
                className="border-2 h-6
           border-zinc-300"
                type="date"
                placeholder="0000-00-00"
                onChange={(e) => setEndDate(e.target.value)}
              />

              <div className="w-14 h-7 bg-green-500 ml-2 rounded-md text-white hover:bg-green-700">
                <button>ค้นหา</button>
              </div>
            </div>
          </div>
        </form>

        <div className="mt-10">
          <OrderCard orders={orders} />
        </div>
      </div>
    </>
  );
};
export default FormViewOrders;

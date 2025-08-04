
import { useContext, useEffect} from "react"
import { StoreContext } from "../../context/StoreContext"
import dayjs from "dayjs"
const OrderCard = ({orders}) => {
  const {setToken,token,loadProduct} = useContext(StoreContext)
  useEffect(()=>{
    setToken(localStorage.getItem("token"))
    loadProduct(token)
  },[])

  const totalAmount = orders?.reduce((prev,curr)=>{
    return prev + curr.totalAmount
  },0)
  
  const totalCost = orders?.reduce((prev,curr)=>{
    const total = curr.orderItems?.reduce((itemsum,items)=> (itemsum+items.productCost * items.quantity),0)
    return prev+total
  },0)
  return (
    <>

    <h5>ยอดขายทั้งหมด</h5>
    <div className="mt-2 border w-full bg-gray-200">

        <div className="mt-3">
            <div className="flex justify-center">
            <div>
              <p className="font-bold">รวมทั้งหมด :</p>
            </div>
            <div className="ml-2">
              <p>{totalAmount.toFixed(2)} บาท</p>
            </div>
          </div>

  

          <div className="flex justify-center text-red-500">
            <div>
              <p className="font-bold">ต้นทุน(รวม) :</p>
            </div>

            <div className="ml-2 ">
              <p>{totalCost.toFixed(2)} บาท</p>
            </div>
          </div>

          <div className="flex justify-center text-green-500">
            <div>
              <p className="font-bold">กำไรสุทธิ :</p>
            </div>
            <div className="ml-2 ">
              <p  >{(totalAmount - totalCost).toFixed(2)} บาท</p>
            </div>
          </div>
        </div>
    </div>


    <table class="min-w-full border border-gray-300 mt-10">
          <thead class="bg-gray-200">
            <tr>
              <th class="border px-4 py-2 text-left">เลขที่ใบเสร็จ</th>
              <th class="border px-4 py-2 text-left">สินค้า</th>
              <th class="border px-4 py-2 text-left">รวมราคา(บาท)</th>
              <th class="border px-4 py-2 text-left">วัน-เวลา</th>
            </tr>
          </thead>
          
          <tbody>
          {orders&& orders.length > 0 ?(
            orders.map((order)=>(
              <>
              <tr>
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2 w-96">
                {order.orderItems.map((items)=>(
                  <>
                    <div className="flex justify-between">
                    <p>
                    {items.productName}
                    </p>            
                    <p>
                      ({items.price} x {items.quantity} บาท)
                    </p>
                    </div>
                  </>
                ))}
                </td>
              <td className="border px-4 py-2">
                {order.totalAmount}
              </td>
              <td className="border px-4 py-2">
                {dayjs(order.orderDate).format("D MMM YYYY เวลาHH:mm น.")}
              </td>
              </tr>
              </>
            ))
          ):(
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
              ไม่พบรายการใบเสร็จ
              </td>
            </tr>
          )
        }
          
          </tbody>

        </table>
    </>
  )
}
export default OrderCard
import { useContext, useEffect } from "react"
import { StoreContext } from "../../context/StoreContext"
import dayjs from "dayjs";

const CreditNoteCard = ({creditNotes}) => {
  const {token,setToken} = useContext(StoreContext);

   const totalAmount = creditNotes?.reduce((prev,curr)=>{
    return prev + curr.amount
  },0)
  


  useEffect(()=>{
    setToken(localStorage.getItem("token"))
  },[])

  return (
    <>
    <h5>ยอดคืนสินค้าทั้งหมด</h5>
        <div className="mt-2 border w-full bg-gray-200">
    
            <div className="mt-3">    
              <div className="flex justify-center text-red-500">
                <div>
                  <p className="font-bold">รวมทั้งหมด :</p>
                </div>
                <div className="ml-2 ">
                  <p  >{(totalAmount).toFixed(2)} บาท</p>
                </div>
              </div>
            </div>
        </div>
    
    
        <table class="min-w-full border border-gray-300 mt-10">
              <thead class="bg-gray-200">
                <tr>
                  <th class="border px-4 py-2 text-left">เลขที่ใบคืนสินค้า</th>
                  <th class="border px-4 py-2 text-left">เลขที่ใบเสร็จ</th>
                  <th class="border px-4 py-2 text-left">สินค้า</th>
                  <th class="border px-4 py-2 text-left">รวมราคา(บาท)</th>
                  <th class="border px-4 py-2 text-left">วัน-เวลา</th>
                </tr>
              </thead>
              
              <tbody>
              {creditNotes&& creditNotes.length > 0 ?(
                creditNotes.map((creditnotes)=>(
                  <>
                  <tr>
                    <td className="border px-4 py-2">{creditnotes.id}</td>
                    <td className="border px-4 py-2">{creditnotes.orderId}</td>
                    <td className="border px-4 py-2 w-96">
                    {creditnotes.products.map((items)=>(
                      <>
                        <div className="flex justify-between">
                        <p>
                        {items.name}
                        </p>            
                        <p>
                          ({items.price} x {items.quantity} บาท)
                        </p>
                        </div>
                      </>
                    ))}
                    </td>
                  <td className="border px-4 py-2">
                    {creditnotes.amount}
                  </td>
                  <td className="border px-4 py-2">
                    {dayjs(creditnotes.orderDate).format("D MMM YYYY เวลา HH:mm น.")}
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
export default CreditNoteCard
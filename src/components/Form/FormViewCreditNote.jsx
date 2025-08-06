import { useContext, useEffect, useState } from "react";
import CreditNoteCard from "../Card/CreditNoteCard";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { getCreditNoteByDate } from "../../services/CreditNoteService";

const FormViewCreditNote = () => {
  const { setToken, token, product, loadProduct } = useContext(StoreContext);
  const [creditNotes, setCreditNotes] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  const handleOnSubmit = async(e)=>{
    e.preventDefault();
    try{
      const res = await getCreditNoteByDate(token,startDate,endDate);
      console.log(res);
      if(res.data){
        setCreditNotes(res.data)
      }
    }catch(err){
      console.log(err)
      toast.error("ค้นหาไม่สำเร็จ")
    }
  }


  useEffect(() => {
    setToken(localStorage.getItem("token"));
    loadProduct(token);
  }, []);

  return (
    <>
    <div className="bg-pink-500 w-full text-white flex justify-center h-28 items-center">
      <h3>ค้นหาใบคืนสินค้า/รวมสินค้าคืน</h3>
    </div>
      <div className="mt-10">
        <h5 className="font-extrabold">ค้นหาใบคืนสินค้า</h5>
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
          <CreditNoteCard creditNotes={creditNotes}/>
        </div>
      </div>
    </>
    
  );
};
export default FormViewCreditNote;

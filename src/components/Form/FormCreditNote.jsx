import { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import {
  createCreditNote,
} from "../../services/CreditNoteService";
import { getProductByBarcode } from "../../services/Product";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";
import { getOrderById } from "../../services/OrderService";

const initialState = {
  orderId: "",
  note: "",
  creditNoteItems: [],
};

const FormCreditNote = () => {
  const { token, setToken, loadProduct, product } = useContext(StoreContext);
  const [barcode, setBarcode] = useState("");
  const barcodeRef = useRef(null);
  const [form, setForm] = useState(initialState);
  const [check,setCheck] = useState(true)

  const totalPrice = form?.creditNoteItems?.reduce((prev, curr) => {
    return prev + curr.productPrice * curr.quantity;
  }, 0);

  const findOrderId = async (e) => {
    e.preventDefault();
    try {
      const res = await getOrderById(token, form.orderId);
      console.log(res);
      if (res.data) {
        toast.success("มีใบเสร็จนี้");
        setCheck(false)
      }
    } catch (err) {
      console.log(err);
      setCheck(true)
      toast.error("ไม่พบใบเสร็จ");
    }
  };

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDelete = (productId) => {
    const deleteItem = form?.creditNoteItems?.filter(
      (item) => item.productId !== productId
    );
    setForm({ ...form, creditNoteItems: deleteItem });
    barcodeRef.current?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      orderId: form?.orderId,
      note: form?.note,
      creditNoteItems: form?.creditNoteItems?.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };
    try {
      const res = await createCreditNote(token, payload);
      console.log(res);
      setForm(initialState);
      barcodeRef.current?.focus();
      loadProduct(token);
      toast.success("คืนสินค้าเรียบร้อย");
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnKey = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      try {
        const res = await getProductByBarcode(token, barcode);
        if (res?.id) {
          setForm((prev) => {
            //เช็คProductIdที่มีอยู่แล้ว
            const exitsProdouctId = prev.creditNoteItems?.findIndex(
              (item) => Number(item.productId) === Number(res.id)
            );

            //เพิ่มProductName จากstateที่มีอยู่แล้ว
            const products = product.find(
              (item) => Number(item.id) === Number(res.id)
            );

            //ถ้าไม่มีfindIndexจะได้-1
            if (exitsProdouctId !== -1) {
              //ประกาศstate updateitems แล้วspread ค่าเดิม
              const updateItems = [...prev.creditNoteItems];
              //updateค่าเดิมหรือindexเดิม
              updateItems[exitsProdouctId] = {
                ...updateItems[exitsProdouctId],
                quantity: updateItems[exitsProdouctId].quantity + 1,
              };
              return { ...prev, creditNoteItems: updateItems };
            } else {
              return {
                ...prev,
                creditNoteItems: [
                  ...prev.creditNoteItems,
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
  }, []);

  return (
    <>
      <div className="bg-blue-900 w-full text-white flex justify-center h-28 items-center">
        <h3>คืนสินค้า</h3>
      </div>

      <form onSubmit={handleSubmit}>
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
        {/* input notice and check receipt*/}
        <div className="flex mt-4 justify-items-center">
          <div className="mr-2">เลขที่ใบเสร็จ</div>
          <input
            className="border-1"
            type="text"
            onChange={handleOnChange}
            name="orderId"
            value={form.orderId}
            required
          />
          <div className="bg-green-500 w-20 text-center ml-2 rounded-md text-white hover:bg-green-600">

          <button  onClick={findOrderId}>Check</button> 
          </div>
        </div>


        <div className="flex mt-4 justify-items-center">
          <div className="mr-2">หมายเหตุ</div>
          <textarea
            className="border-1 resize-none w-full"
            type="text"
            onChange={handleOnChange}
            name="note"
            value={form.note}
            required
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
            {form?.creditNoteItems?.map((item, index) => (
              <tr>
                <td class="border px-4 py-2">{index + 1}</td>
                <td class="border px-4 py-2">{item.productName}</td>
                <td class="border px-4 py-2">
                  {item.quantity}x{item.productPrice}
                </td>
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
            <div className="flex justify-center text-green-500">
              <div>
                <p className="font-bold">รวมเงินคืนทั้งหมด</p>
              </div>
              <div className="ml-2">
                <p>{(totalPrice ?? 0).toFixed(2)} บาท</p>
              </div>
            </div>
          </div>
        </div>
          <p className="text-red-500 text-center mt-2">*สินค้าต้องตรงกับสินค้าในใบเสร็จ*</p>
        <div className="flex justify-center">
          <button
            className={`w-full ${check === false && form.creditNoteItems.length != 0  ? "bg-green-500  text-white h-10 mt-1 hover:bg-green-600 duration-200":"bg-gray-600  text-white h-10 mt-1 hover:bg-gray-700 duration-200"}`}
            type="submit"
            disabled={check}
          >
            ยืนยัน
          </button>
        </div>
      </form>
    </>
  );
};
export default FormCreditNote;

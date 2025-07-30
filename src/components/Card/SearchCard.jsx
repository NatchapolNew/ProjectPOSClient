import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../../context/StoreContext";

const SearchCard = () => {
    const {token,setToken,loadProduct,searchProductFilter,sortQuantityProduct,product} = useContext(StoreContext);
    const [text,setText] = useState("");
    const [sortOrder,setSortOrder] = useState("")

    useEffect(()=>{
        setToken(localStorage.getItem("token"))
        const delay = setTimeout(()=>{
            if(text){
                searchProductFilter(token,text)
            }else{
                loadProduct(token)
            }
            return ()=>clearTimeout(delay)
        },300)
    },[text])


    const handleSortQuantity = async(e)=>{
        setSortOrder(e.target.value)
        sortQuantityProduct(sortOrder)
    }

  return (
    <>
    <div className="flex items-center h-20 ml-2">
        <input type="text"
        className="border-1 border-gray-500 rounded-sm"
        placeholder="ชื่อสินค้า"
        onChange={(e)=>setText(e.target.value)}
        />

        <div className="ml-7">
        <select value={sortOrder} onChange={handleSortQuantity}
        className="border-1 border-gray-500 rounded-sm"
        >
            <option value="" selected disabled >--เรียงตามจำนวนสินค้าคงเหลือ--</option>
            <option value="asc">จำนวนมากสุด</option>
            <option value="desc">จำนวนน้อยสุด</option>
        </select>
        </div>

    </div>


    
    </>
  )
}
export default SearchCard
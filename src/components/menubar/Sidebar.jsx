import { Link, useNavigate} from "react-router-dom";
import logo from "../../assets/fashion-woman-profile-logo.png";
import { CirclePlus, FileMinus, ListPlus, LogOut, PackageMinus, ReceiptText, ScanBarcode } from "lucide-react";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const {setToken,token} = useContext(StoreContext);

  useEffect(()=>{
    setToken(localStorage.getItem("token"))
  },[])
  const handleLogut = ()=>{
    setToken(localStorage.removeItem("token"))
    navigate("/")
  }
  return (
    <>
      <div className="border-end bg-white" id="sidebar-wrapper">
        <div className="sidebar-heading border-bottom bg-light flex justify-center h-50">
          <img src={logo} alt="" height={100} width={100} className="ml-2" />
        </div>
        <div className="list-group list-group-flush gap-2 flex">
          <Link
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to={"/panel/createorder"}
          >
            <div className="flex gap-2 items-center">
              <ScanBarcode />
              <span>คิดเงิน</span>
            </div>
          </Link>

          <Link
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to={"/panel/vieworder"}
          >
           <div className="flex gap-2 items-center">
              <ReceiptText />
              <span>ใบเสร็จ/ยอดขาย</span>
            </div>
          </Link>


          <Link
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to={"/panel/createcreditnote"}
          >
            <div className="flex gap-2 items-center">
              <PackageMinus />
              <span>คืนสินค้า</span>
            </div>
          </Link>
          <Link
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to={"/panel/viewcreditnote"}
          >
            <div className="flex gap-2 items-center">
              <FileMinus />
              <span>ใบคืนสินค้า</span>
            </div>
          </Link>
          <Link
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to={"/panel/createproduct"}
          >
            <div className="flex gap-2 items-center">
              <CirclePlus />
              <span>เพิ่มสินค้า</span>
            </div>
          </Link>
          <Link
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to={"/panel/createcategory"}
          >
           <div className="flex gap-2 items-center">
              <ListPlus />
              <span>เพิ่มประเภทสินค้า</span>
            </div>
          </Link>
        </div>

        <div 
        onClick={handleLogut}
        className="flex relative top-40 left-3 cursor-pointer hover:text-red-500">
          <LogOut/><span>ออกจากระบบ</span>
        </div>

      </div>
    </>
  );
};
export default Sidebar;

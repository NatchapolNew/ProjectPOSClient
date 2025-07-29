import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../context/StoreContext";
import LoadingToRedirect from "./LoadingToRedirect";

const ProtectRoute = ({element}) => {
const [ok,setOk] = useState(false);

const {token} = useContext(StoreContext);

useEffect(()=>{
if(token){
    //send to back
    setOk(true)
}else{
    setOk(false)
}
},[])

  return ok? element:<LoadingToRedirect/>
  
}
export default ProtectRoute
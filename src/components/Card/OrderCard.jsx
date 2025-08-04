
import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../../context/StoreContext"

const OrderCard = ({orders}) => {
  const {setToken,token,loadProduct,product} = useContext(StoreContext)
  useEffect(()=>{
    setToken(localStorage.getItem("token"))
    loadProduct(token)
  },[])

  console.log(orders)
  return (
    <div>OrderCard</div>
  )
}
export default OrderCard
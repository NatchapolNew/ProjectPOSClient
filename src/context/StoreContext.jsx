import { createContext, useEffect, useState } from "react";
import { getAllCategory } from "../services/Category";
import { getProductByName, listProduct } from "../services/Product";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [category, setCategory] = useState([]);
  const [product,setProduct] = useState([]);
  


  const sortQuantityProduct = (order)=>{
    //clone product array for react detect and re-render
    const quantityProduct = [...product].sort((a,b)=> order === "asc"? a.quantity-b.quantity:b.quantity-a.quantity)
    setProduct(quantityProduct)
  }

  const loadProduct = async(token)=>{
    const res = await listProduct(token);
    setProduct(res.data)
  }

  const searchProductFilter = async(token,name)=>{
    const res = await getProductByName(token,name)
    setProduct(res.data)
  }

  const loadCategory = async (token) => {
    const res = await getAllCategory(token);
    setCategory(res.data);
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const contextValue = {
    token,
    setToken,
    category,
    loadCategory,
    product,
    loadProduct,
    searchProductFilter,
    sortQuantityProduct
    
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

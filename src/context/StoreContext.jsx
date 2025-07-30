import { createContext, useEffect, useState } from "react";
import { getAllCategory } from "../services/Category";
import { listProduct } from "../services/Product";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [category, setCategory] = useState([]);
  const [product,setProduct] = useState([]);

  const loadProduct = async(token)=>{
    const res = await listProduct(token);
    setProduct(res.data)
  }

  // const SearchProductFilter = ()=>{

  // }

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
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

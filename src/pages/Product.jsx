import { useContext, useEffect } from "react";
import FormProduct from "../components/Form/FormProduct";
import { StoreContext } from "../context/StoreContext";

const Product = () => {
  const { token, setToken } = useContext(StoreContext);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  return (
    <div>
      <FormProduct />
    </div>
  );
};
export default Product;

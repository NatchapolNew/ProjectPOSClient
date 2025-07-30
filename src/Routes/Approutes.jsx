import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layouts/Layout";
import ProtectRoute from "./ProtectRoute";
import Login from "../components/login/Login";
import Product from "../pages/Product";
import FormCreateOrder from "../components/Form/FormCreateOrder";
import FormEditProduct from "../components/Form/FormEditProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "panel",
    element: <ProtectRoute element={<Layout />} />,
    children: [
      // {
      //     index:true,element:<Product/>,
      // },
      {
        path: "createproduct",
        element: <Product />,
      },
      {
        path: "editproduct/:id",
        element: <FormEditProduct />,
      },
      ,
      {
        path: "createorder",
        element: <FormCreateOrder />,
      },
    ],
  },
]);

const Approutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default Approutes;

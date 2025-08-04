import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layouts/Layout";
import ProtectRoute from "./ProtectRoute";
import Login from "../components/login/Login";
import Product from "../pages/Product";
import FormCreateOrder from "../components/Form/FormCreateOrder";
import FormEditProduct from "../components/Form/FormEditProduct";
import FormCategory from "../components/Form/FormCategory";
import FormEditCategory from "../components/Form/FormEditCategory";
import FormViewOrders from "../components/Form/FormViewOrder";

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
      {
        path: "createcategory",
        element: <FormCategory/>,
      },
      {
        path: "editcategory/:id",
        element: <FormEditCategory/>,
      },
      {
        path: "vieworder",
        element: <FormViewOrders/>,
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

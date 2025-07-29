import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layouts/Layout";
import ProtectRoute from "./ProtectRoute";
import Login from "../components/login/Login";
import Product from "../pages/Product";
import FormListFood from "../components/Form/FormListFood";
import FormCreateOrder from "../components/Form/FormCreateOrder";

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
            path:"createproduct",element:<Product/>,
        }
        ,{
            path:"listfood",element:<FormListFood/>
        }
        ,{
            path:"createorder",element:<FormCreateOrder/>
        }
    ],
  },
]);

const Approutes = () => {
  return <>
    <RouterProvider router={router}/>
    </>;
};
export default Approutes;

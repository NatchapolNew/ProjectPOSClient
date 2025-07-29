import { useContext, useEffect, useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { StoreContext } from "./context/StoreContext";
import Approutes from "./Routes/Approutes";
function App() {
  const { token, setToken } = useContext(StoreContext);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  });
  return (
    <>
      <ToastContainer />
      <Approutes/>
    </>
  );
}

export default App;

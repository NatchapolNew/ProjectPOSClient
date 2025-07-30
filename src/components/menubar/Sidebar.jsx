import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const Sidebar = () => {
  return (
    <>
       <div className="border-end bg-white" id="sidebar-wrapper">
                <div className="sidebar-heading border-bottom bg-light">
                  <img src="" alt="" height={100} width={100} className="ml-2"/>
                </div>
                <div className="list-group list-group-flush">
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/panel/createproduct"}>
                      <i className="bi bi-plus-circle me-2"/>เพิ่มข้อมูลสินค้า</Link>
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/panel/createorder"}>
                      <i className="bi bi-cart me-2"/>จำนวนออเดอร์</Link>
                    
                </div>
            </div>
            
    </>
  );
};
export default Sidebar;

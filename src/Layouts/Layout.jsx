import { Outlet } from "react-router-dom"
import Sidebar from "../components/menubar/sidebar"

const Layout = () => {
  return (
    <div className="flex h-screen">
      <div className="w-40">
        <Sidebar/>
      </div>

      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto"> 
        <Outlet/>
      </main>
    </div>
  )
}
export default Layout
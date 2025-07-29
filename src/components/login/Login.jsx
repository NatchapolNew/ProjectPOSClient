import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { login } from "../../services/AuthService";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const onChangeHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const onSubmitHadle = async (e) => {
    e.preventDefault();
    try {
      const res = await login(data);
  
      if (res.status === 200) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate("/panel");
      }
    } catch (err) {
      console.log(err);
      toast.error("ไม่สามารถล็อคอินได้ กรุณาลองใหม่");
    }
  };

  return (
   <>
   <div className="container" onSubmit={onSubmitHadle}>
    <div className="row justify-content-center mt-5">
        <div className="col-md-6">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Login</h4>
                </div>
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label for="username" className="form-label">Username</label>
                            <input 
                            className="form-control" 
                            placeholder="Enter your Username"
                            name="username"
                            onChange={onChangeHandle}
                            required
                            />
                        </div>
                        <div className="mb-3">
                            <label for="password" className="form-label">Password</label>
                            <input 
                            onChange={onChangeHandle}
                            type="password" 
                            className="form-control" 
                            placeholder="Enter your password"
                            name="password"
                            required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
   </>
    
  );
};
export default Login;

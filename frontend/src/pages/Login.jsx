import React from "react";
// Import using a direct import statement with explicit file path
import logo from "../assets/logo1.jpg";
import google from "../assets/google.jpg";
import { IoEye, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify"
function Login() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
     const [loading,setLoading]= useState(false)

     //handles login
     const handleLogin = async()=>{
      setLoading(true)
      try {
        const result = await axios.post(serverUrl+"/api/auth/login",{email:email,password:password},{withCredentials:true})
        console.log(result.data)
        setLoading(false)
        toast.success("Login Successfully✅")
        navigate("/") // Navigate to home page after successful login
      } catch (error) {
        console.log(error)
        setLoading(false)
        toast.error(error.response.data.message)
      }
     }
  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center">
      <form className="w-[90%] md:w-200 h-150 bh-[white] shadow-xl rounded-2xl flex" onSubmit={(e)=>e.preventDefault}>
        {/* left div */}

        <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3 ">
          <div>
            <h1 className="font-semibold text-[black] text-2xl">
              Welcome Back
            </h1>
            <h2 className="text-[#999797] text-[18px]"> Login your account </h2>
          </div>

          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="email" className="font font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] "
              placeholder=" Enter Your Email"
                onChange={(e)=>setEmail(e.target.value)} value={email}
            />
          </div>

          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative">
            <label htmlFor="password" className="font font-semibold">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              id="password"
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] "
              placeholder="Enter Your password "
                onChange={(e)=>setPassword(e.target.value)} value={password}
            />
            {!show ? (
              <IoEyeOutline
                className="absolute w-[20px] h-[20px] curosr-pointer  right-[5%] bottom-[10%]  "
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <IoEye
                className="absolute w-[20px] h-[20px] curosr-pointer  right-[5%] bottom-[10%] "
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>

          <button className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px] " disabled={loading} onClick={handleLogin}>
            {loading?<ClipLoader size={30} color="white"/> : "Login"}
          </button>
          <span className="text-[13px] cursor-pointer text-[#585757]">Forgot password?</span>
          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4] "></div>
            <div className="w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center">
              Or Continue
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
          </div>
          <div className=" w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center">
            <img src={google} className="w-[25px]" alt="" />
            <span className="text-[18px] text-gray-500">google</span>
          </div>
          <div className="text-[#6f6f6f] ">Create new account</div>
          <span
            className="underline underline-offset-1 text-[blue] cursor-pointer "
            onClick={() => navigate("/SignUp")}
          >
            Signup
          </span>
        </div>
        {/* right div */}

        <div className="w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden">
          <img
            src={logo}
            alt="logo"
            className="w-30 h-30 shadow-2xl object-contain"
            style={{ width: "120px", height: "120px", display: "block" }}
          />
          <span className="text-2xl text-blue-600 mt-4">😊 </span>
        </div>
      </form>
    </div>
  );
}

export default Login;

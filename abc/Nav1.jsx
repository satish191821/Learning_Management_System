import React, { useState } from "react";
import logo from "../assets/logo1.jpg";
import { IoPersonCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../frontend/src/App";
import { setUserData } from "../frontend/src/redux/userSlice";
import { toast } from "react-toastify";
import axios from "axios";

function Nav() {
  const { userData } = useSelector((state) => state.user); //get user data
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  //handle logout
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      toast.success(result?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <div className="w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10">
        <div className="lg:w-[20%] w-[40%] lg:pl-[50px]">
          <img
            src={logo}
            alt=""
            className="w-[60px] rounded-[5px] border-2 border-white"
          />
        </div>
        <div className="w-[30%] ig:flex  flex items-center justify-center gap-4 ">
          {!userData && (
            <IoPersonCircle
              className="w-[50px] h-[50px] fill-black cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          )}

          {userData && (
            <div
              className="w-[50px] h-[50px]  rounded-full text-white flex  items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {userData?.name.slice(0, 1).toUpperCase()}
            </div>
          )}

          {userData?.role === "educator" && (
            <div
              style={{ padding: "10px 20px" }}
              className="border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer"
            >
              Dashboard
            </div>
          )}
          {!userData ? (
            <span
              style={{ padding: "10px 20px" }}
              className="border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5]"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          ) : (
            <span
              style={{ padding: "10px 20px" }}
              className="bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer"
              onClick={handleLogOut}
            >
              Logout
            </span>
          )}
          {userData && show && (
            <div className="absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-white px-[15px] py-[10px] border-[2px] border-black hover:border-white hover:text-white cursor-pointer hover:bg-black">
              <span className=" bg-black text-white px-[30px] py-[10px] rounded-1xl hover:bg-gray-600  ">
                My Profile
              </span>

              <span className=" bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600  ">
                My Courses
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;

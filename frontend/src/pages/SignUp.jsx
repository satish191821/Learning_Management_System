import React from "react";
// Import using a direct import statement with explicit file path
import logo from "../assets/logo1.jpg";

function SignUp() {
  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center">
      <form className="w-[90%] md:w-200 h-150 bh-[white] shadow-xl rounded-2xl flex">
        {/* left div */}

        <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3"></div>
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

export default SignUp;

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ForgetPassword() {
    const [step,setStep]=useState(3)
    const navigate= useNavigate()
  return (
    <div className='min-h-screen flex item-center justify-center bg-gray-100 px-4'>
        {/* step-1 */}

       
        

        {step == 1 && <div className='bg-white shadow-md rounded-2xl lg:p-8 max-w-md  w-full'>
            <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Forgot Your Password</h2>
            <form className='space-y-4'>
                <div>
                    <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Enter your email address</label>
                    <input type="text" id='email' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]' placeholder='demonslayer@example.com'required />
                </div>
                <button className='w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4  rounded-md font-medium cursor-pointer mt-3 '>Send OTP</button>
            </form>
            <div className='text-sm text-center mt-4 cursor-pointer text-blue-950 active:text-blue-700'  onClick={()=>navigate("/login") } >Back to Login</div>
            </div>}
            {/* step-2 */}

      

        {step==2 &&<div className='bg-white shadow-md rounded-2xl p-8 m-30 max-w-md  mx-h-md w-full'>
            <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Enter OTP</h2>
            <form className='space-y-4'>
                <div>
                    <label htmlFor="otp" className='block text-sm font-medium text-gray-700'>Please Enter the 4-digit code sent to you email</label>
                    <input type="otp" id='email' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]' placeholder='* * * *'required />
                </div>
                <button className='w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4  rounded-md font-medium cursor-pointer mt-3 '>Verify  OTP</button>
            </form>
            <div className='text-sm text-center mt-4 cursor-pointer text-blue-950 active:text-blue-700'  onClick={()=>navigate("/login") } >Back to Login</div>
            </div>}
            
              {/* step-3*/}
               {step == 3 && <div className='bg-white shadow-md rounded-2xl p-8 m-30 max-w-md  mx-h-md w-full'>
            <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Reset Your Password</h2>
            <p className='text-sm text-gray-500 text-center mb-6'>Enter the new password to regain access to your account</p>
            <form className='space-y-4'>
                <div>
                    <label htmlFor="password" className='block text-sm font-medium text-gray-700'>New Password</label>
                    <input type="password" id='password' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]' placeholder='********'required />
                </div>
                   <div>
                    <label htmlFor="conpassword" className='block text-sm font-medium text-gray-700'>Confirm Password</label>
                    <input type="conpassword" id='password' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]' placeholder='********'required />
                </div>
                <button className='w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4  rounded-md font-medium cursor-pointer mt-3 '>Reset Password</button>
            </form>
            <div className='text-sm text-center mt-4 cursor-pointer text-blue-950 active:text-blue-700'  onClick={()=>navigate("/login") } >Back to Login</div>
            </div>}
    </div>
  )
}

export default ForgetPassword
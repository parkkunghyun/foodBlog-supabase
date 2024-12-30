"use client";

import Link from 'next/link';
import React, { useState } from 'react'
import { CiMail } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { supabase } from "../../../../utils/SupabaseClient.js";


const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !checkPassword) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    // 비밀번호가 일치하는지 확인
    if (password !== checkPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // Supabase 회원가입 API 호출
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message); // Supabase에서 반환된 오류 메시지
      } else {
        // 회원가입 성공 시 로그인 페이지로 이동
        window.location.href = "/auth/login";
      }
    } catch (error) {
      setError("회원가입 중 오류가 발생했습니다.");
    }

    
  }
  
  return (
    <div 
      className="flex items-center justify-center h-screen text-black bg-center bg-cover" 
      style={{ backgroundImage: "url('/assets/food1.jpg')" }}
    >
      <div className='min-w-[300px] flex flex-col pt-20 gap-4 items-center w-[600px] h-[600px] border-2 rounded-md shadow-[-7px_7px_0px_#000000] bg-white bg-opacity-60'>
        <h1 className='mb-4 dark:text-black'>회원가입</h1>
        <form className='flex flex-col w-full gap-4 p-4'>
          <div className='relative w-[60%] mx-auto'>
            <input
              value={email} onChange={e => setEmail(e.target.value)}
              className='w-full p-2 font-bold border-2 rounded-md focus:outline-none'
              type="text" placeholder='Email을 입력해주세요.' />
            <CiMail className='absolute text-4xl right-3 top-1 text-slate-400'/>
          </div>

          <div className='relative w-[60%] mx-auto'>
            <input
              value={password} onChange={e => setPassword(e.target.value)}
              className='w-full p-2 font-bold border-2 rounded-md focus:outline-none'
              type={showPassword ? "text" : "password"} placeholder='PassWord를 입력해주세요.' />
            <div 
              className='absolute text-4xl cursor-pointer right-3 top-1 text-slate-400'
              onClick={() => setShowPassword(!showPassword)} // 클릭 시 showPassword 상태 변경
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* 비밀번호 보이기/숨기기 아이콘 변경 */}
            </div>
          </div>
                  
            <div className='relative w-[60%] mx-auto'>
                <input value={checkPassword} onChange={e => setCheckPassword(e.target.value)}
                    className='w-full p-2 font-bold border-2 rounded-md focus:outline-none'
                    type={showCheckPassword ? "text" : "password"} placeholder='PassWord를 한번 더 입력해주세요.' />
                <div 
                  className='absolute text-4xl cursor-pointer right-3 top-1 text-slate-400'
                  onClick={() => setShowCheckPassword(!showCheckPassword)} // 클릭 시 showPassword 상태 변경
                >
                  {showCheckPassword ? <FaEyeSlash /> : <FaEye />} {/* 비밀번호 보이기/숨기기 아이콘 변경 */}
            </div>
          </div>
                          

          <button type='submit'
            onClick={handleSignup}
            className='mt-16  bg-black  w-[60%] mx-auto text-white rounded-md py-2 px-4'>회원가입</button>
          <Link className='mt-2 w-[60%] p-2 mx-auto flex justify-center' href={"/auth/login"}>
            <button className='flex-1 font-extrabold border-b-4 border-black dark:text-black'>회원가입 했었나요?  <span className='pl-2 text-xl text-slate-700'> 로그인</span>으로 이동하기</button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default SignupPage;

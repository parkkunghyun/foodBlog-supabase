"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { CiMail } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { supabase } from "../../../../utils/SupabaseClient.js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) {
      // 로그인 성공 시 홈 페이지로 이동
      window.location.href = "/";
    } else {
      alert(error.message); // 로그인 실패 시 오류 메시지 표시
    }
  };

  return (
    <div 
      className="flex items-center justify-center h-screen text-black bg-center bg-cover" 
      style={{ backgroundImage: "url('/assets/food1.jpg')" }}
    >
      <div className='min-w-[300px] flex flex-col pt-20 gap-4 items-center w-[600px] h-[600px] border-2 rounded-md shadow-[-7px_7px_0px_#000000] bg-white bg-opacity-60'>
        <h1 className='mb-4 dark:text-black'>로그인</h1>
        <form onSubmit={handleLogin} className='flex flex-col w-full gap-4 p-4'>
          <div className='relative w-[60%] mx-auto'>
            <input
              className='w-full p-2 font-bold border-2 rounded-md focus:outline-none'
              type="text" 
              placeholder='Email을 입력해주세요.'
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
            <CiMail className='absolute text-4xl right-3 top-1 text-slate-400'/>
          </div>

          <div className='relative w-[60%] mx-auto'>
            <input
              className='w-full p-2 font-bold border-2 rounded-md focus:outline-none'
              type={showPassword ? "text" : "password"} 
              placeholder='PassWord를 입력해주세요.'
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
            <div 
              className='absolute text-4xl cursor-pointer right-3 top-1 text-slate-400'
              onClick={() => setShowPassword(!showPassword)} // 클릭 시 showPassword 상태 변경
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* 비밀번호 보이기/숨기기 아이콘 변경 */}
            </div>
          </div>

          <button 
            type="submit"
            className='mt-16 bg-black w-[60%] mx-auto text-white rounded-md py-2 px-4'
          >
            로그인
          </button>
          <Link className='mt-2 w-[60%] p-2 mx-auto flex justify-center' href={"/auth/signup"}>
            <button className='flex-1 font-extrabold border-b-4 border-black dark:text-black'>회원가입 페이지로 이동</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { supabase } from "../../utils/SupabaseClient.js";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null); // 로그인된 유저 상태 관리

  // 페이지가 로드될 때 localStorage에서 다크 모드 상태를 확인
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.body.classList.remove('dark');
    }

    // 로그인 상태 확인
    const currentUser = supabase.auth.getUser();
    setUser(currentUser);

    // Supabase 세션 상태 변경 시 로그인 상태 업데이트
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null); // 로그인한 유저 정보 업데이트
    });

    return () => {
      authListener?.unsubscribe(); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, []);

  // 다크 모드 토글 함수
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.classList.remove('dark');
      localStorage.removeItem('theme');
    } else {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  // 로그아웃 함수
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); // 로그아웃 후 user 상태 초기화
  };

  return (
    <div className='flex items-center justify-between mx-4 my-4'>
      <Link href={"/"}>
        <Image src="/assets/logo.png" alt='logo' width={60} height={60} />
      </Link>

      <div className='hidden gap-6 font-bold sm:flex'>
        <Link href={"/"}><p className='cursor-pointer hover:scale-105'>홈</p></Link>
        <p className='cursor-pointer hover:scale-105'>마이페이지</p>
      </div>

      <div className='flex items-center gap-4'>
        {/* 로그인한 유저가 있으면 로그아웃 버튼과 이메일 표시 */}
        {user ? (
          <>
            <span className="font-semibold">{user.email}</span>
            <button onClick={handleLogout} className="px-2 py-1 border-2 rounded-md hover:scale-105">
              로그아웃
            </button>
          </>
        ) : (
          <Link href={"/auth/login"}>
            <button className="px-2 py-1 border-2 rounded-md hover:scale-105">로그인</button>
          </Link>
        )}

        {/* 다크 모드 토글 버튼 */}
        <button className="px-2 py-1 border-2 rounded-md hover:scale-105" onClick={toggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
};

export default Header;

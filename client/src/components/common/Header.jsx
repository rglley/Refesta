import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Mypage from '../mypage/Mypage';
import text_logo from '../../assets/text_logo.png';
import search from '../../assets/search.png';
import menu from '../../assets/menu.png';
import useUserStore from '../../store/userStore';

const Header = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { userInfo, getUserInfo } = useUserStore();

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <header className='sticky top-0 bg-white z-10 py-4 bg-white-800 h-[70px]'>
      <div className='container flex items-center justify-between mx-auto'>
        {/* 검색 버튼 */}
        <div className='flex text-center'>
          <Link
            to='/search'
            className='cursor-pointer'
          >
            <img
              src={search}
              alt='Logo'
              className='w-5 h-5 ml-5'
            />
          </Link>
        </div>

        {/* 로고 */}
        <div className='flex items-center'>
          <Link
            to='/'
            className='cursor-pointer'
          >
            <img
              src={text_logo}
              alt='Logo'
              className='w-20 h-9'
            />
          </Link>
        </div>

        {/* 햄버거 버튼 */}
        <div
          className='flex items-center'
          onClick={() => setModalOpen(true)}
        >
          <img
            src={menu}
            alt='Logo'
            className='w-5 h-5 mr-5'
          />
        </div>
        <Mypage
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          nickname={userInfo.nickname}
          profileUrl={userInfo.profileUrl}
        />
      </div>
    </header>
  );
};
export default Header;
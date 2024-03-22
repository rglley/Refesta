import React, { useState } from 'react';
import SetListWrapper from './SetListWrapper';
import ReviewWrapper from './ReviewWrapper';

// 완료된 페스티벌 탭(셋리스트/후기게시판)
const FestivalInfoContainer = () => {
  const [openInfoTab, setOpenInfoTab] = useState(1);

  return (
    <div className=''>
      <ul className='flex h-[60px]'>
        {/* 셋리스트 */}
        <li className={`w-1/2 text-center ${openInfoTab === 1 ? 'border-b-2 border-ourIndigo' : ''}`}>
          <button
            className={'w-full h-full text-xs px-2 py-2'}
            onClick={() => {
              setOpenInfoTab(1);
            }}
          >
            <span className={openInfoTab === 1 ? 'text-ourIndigo' : 'text-gray-400'}>셋리스트</span>
          </button>
        </li>
        {/* 후기게시판 */}
        <li className={`w-1/2 text-center ${openInfoTab === 2 ? 'border-b-2 border-ourIndigo' : ''}`}>
          <button
            className={'w-full h-full text-xs px-5 py-2'}
            onClick={() => {
              setOpenInfoTab(2);
            }}
          >
            <span className={openInfoTab === 2 ? 'text-ourIndigo' : 'text-gray-400'}>후기 게시판</span>
          </button>
        </li>
      </ul>
      <div className='flex flex-col min-w-0 mx-6 mt-4 text-center break-words  h-[600px]'>
        <div className='flex-auto'>
          <div className={openInfoTab === 1 ? 'block' : 'hidden'}>
            1번 컴포넌트(셋리스트)
            <SetListWrapper />
          </div>
          <div className={openInfoTab === 2 ? 'block' : 'hidden'}>
            2번 컴포넌트(후기)
            <ReviewWrapper />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FestivalInfoContainer;

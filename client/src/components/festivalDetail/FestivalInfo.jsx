import { useState, useEffect } from 'react';
import useFestivalInfoStore from '@store/festivalInfoStore';

import instance from '@util/token_interceptor';

import heart from '@assets/heart.png';
import heart_full from '@assets/heart_full.png';

// 페스티벌 상세 정보
const FestivalInfo = () => {
  const { festivalInfoData } = useFestivalInfoStore();
  const [likedFestival, setLikedFestival] = useState(festivalInfoData && festivalInfoData.liked);

  // 페스티벌 정보가 변경될 때
  // 페스티벌 좋아요 초기 정보를 설정하는 함수 실행
  useEffect(() => {
    if (festivalInfoData) {
      setLikedFestival(festivalInfoData.liked);
    }
  }, [festivalInfoData]);

  //
  const handleLike = async () => {
    try {
      const response = await instance.patch(`festivals/${festivalInfoData.id}`);
      if (response.data.status === 'success') {
        setLikedFestival((prevLiked) => !prevLiked);
      }
    } catch (error) {
      console.error('페스티벌 좋아요 실패', error);
    }
  };

  return (
    <article className='m-6 mb-12 min-h-60'>
      {festivalInfoData && (
        <div className='flex'>
          <div className='flex items-center flex-1'>
            <img className='object-fill h-60' src={festivalInfoData.posterUrl} alt='' />
          </div>
          <div className='relative items-start flex-1 ml-2'>
            <div className='text-sm font-semibold'>{festivalInfoData.name}</div>
            <div className='mt-2 border-b border-b-black'></div>
            <div className='p-2'>
              <div className='pb-1 text-sm'>장소</div>
              <div className='pb-4 pl-1 text-xs'>{festivalInfoData.location}</div>
              <div className='pb-1 text-sm '>날짜</div>
              <div className='pb-4 pl-1 text-xs'>{festivalInfoData.date}</div>
              <div className='pb-1 text-sm'>가격</div>
              <div className='pb-4 pl-1 text-xs'>{festivalInfoData.price.toLocaleString()}원</div>
            </div>
            <div className='absolute bottom-0 right-0 flex justify-end pr-1 w-9'>
              <img
                className='w-full'
                src={likedFestival ? heart_full : heart}
                alt='페스티벌 좋아요 버튼'
                onClick={handleLike}
              />
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default FestivalInfo;

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useArtistStore from '@store/artistStore';

import instance from '@util/token_interceptor';

import FestivalList from '@components/artistDetail/FestivalList';

import heartFull from '@assets/heart_full.png';
import heart from '@assets/heart.png';

const ArtistDetail = () => {
  const { addArtist, artist, toggleLike, updateArtistLike } = useArtistStore();
  const { id } = useParams();

  useEffect(() => {
    addArtist(id);

    // 아티스트 상세 페이지 접근 데이터 제공
    const increaseArtistViewCount = async () => {
      try {
        const res = await instance.patch(`artists/${id}/views`);
        console.log(res);
      } catch (e) {
        console.error('Error:', e);
      }
    };

    increaseArtistViewCount();
  }, [addArtist, id]);

  const handleLikeBtn = () => {
    toggleLike();
    updateArtistLike(id);
  };

  return (
    <div className='flex-col'>
      <section>
        <div className='flex-col justify-center mt-10 text-center'>
          <div>
            <div className='relative'>
              <div className='z-0 mx-20 overflow-hidden rounded-full w-13 h-13'>
                <img
                  className='object-cover h-full'
                  src={artist.pictureUrl}
                  alt='사진'
                />
              </div>
              <div
                className='absolute w-12 h-12 py-2.5 bottom-0 right-12'
                onClick={handleLikeBtn}
              >
                <img
                  src={artist.liked ? `${heartFull}` : `${heart}`}
                  className='h-full'
                />
              </div>
            </div>
          </div>
          <div className='mt-5'>
            <div className='mt-5 text-2xl'>{artist.name}</div>
            <div className='mt-4 text-sm text-gray-500'>
              대표 장르 :{' '}
              {artist.genreList &&
                artist.genreList.map((genre, index) => (
                  <span key={index}>
                    {genre}
                    {index < artist.genreList.length - 1 ? ', ' : ''}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </section>
      <section className='mx-5 mt-5'>
        <div className='font-bold'>참여 페스티벌</div>
        <div>
          <FestivalList festivalList={artist.performanceList} />
        </div>
      </section>
    </div>
  );
};
export default ArtistDetail;

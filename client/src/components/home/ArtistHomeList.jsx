import { useEffect, useRef, useState } from 'react';
import instance from '../../util/token_interceptor';

import ArtistHomeItem from './ArtistHomeItem';
import ListTitle from './ListTitle';

const ArtistHomeList = () => {
  const [artistData, setArtistData] = useState([]);

  // 페이지 번호
  const [page, setPage] = useState(1);

  // 추천 아티스트 정보 요청
  const getRecommendArtists = async () => {
    //const response = await instance.get('recommendations/artists', {
    const response = await instance.get(`artists/${page}`, {
      params: { page },
    });
    setArtistData([
      response.data.data,
      response.data.data,
      response.data.data,
    ]);
  };

  useEffect(() => {
    getRecommendArtists();
  }, [page]);

  const onClickRefresh = () => {
    setPage(page + 1);
  };

  return (
    <div className='h-[283px]'>
      <ListTitle
        title={'추천 아티스트'}
        description={'아티스트가 참여한 페스티벌을 알아보세요!'}
        btn={<button onClick={onClickRefresh}>새로고침</button>}
      />
      <div className='flex overflow-x-scroll gap-x-3 scrollbar-hide '>
        {artistData.map((item) => (
          <ArtistHomeItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
export default ArtistHomeList;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import instance from '../util/token_interceptor';

// 통합검색 결과
const TestPage = () => {
  // 요청방법 1
  // const baseURL = `${import.meta.env.VITE_PUBLIC_API_SERVER}/festivals/2`;
  // const token =
  //   'eyJhbGciOiJIUzUxMiJ9.eyJhdXRoIjpbIlJPTEVfQURNSU4iXSwiYXVkIjoiaHR0cHM6Ly9qMTBhNjAxLnAuc3NhZnkuaW8vIiwic3ViIjoiMTA3OTQ4MDU4MzM1NzA4NjY1MjYwIiwiaXNzIjoiaHR0cHM6Ly9qMTBhNjAxLnAuc3NhZnkuaW8vIiwiaWF0IjoxNzExMDA0MzM2LCJleHAiOjE3MTI4MDQzMzZ9.vZzSd4v5rA1pGDeWNpkFt5HpMzYzAdFZUJIHKKwIl80KaI6rheI1fXiaQIQV9RGvDDdy-snwVOSmmZ2a0CAoUA';
  // const accessToken = `Bearer ${token}`;
  // const headers = {
  //   'Content-Type': 'application/json',
  //   Authorization: accessToken,
  // };

  // const getFestivalDetailInfo = async () => {
  //   try {
  //     const response = await axios.get(baseURL, {
  //       headers: headers,
  //       withCredentials: true,
  //     });
  //     if (response.data.status == 'success') {
  //       console.log(response);
  //       console.log(response.data);
  //       console.log(response.data.data.name);
  //       console.log(response.data.data.location);
  //       console.log(response.data.data.posterUrl);
  //       console.log(response.data.data.price);
  //       console.log(response.data.data.ended);
  //       console.log(response.data.data.liked);
  //     } else {
  //       console.log('성공아냐');
  //       console.log(response);
  //     }
  //   } catch (error) {
  //     console.log('토큰 재발급이 필요합니다');
  //     console.log(error);
  //   }
  // };

  // interceptor이용해서 요청 보내는 코드 예시
  // 위에서 instance import 해야함
  // 페이지에 들어왔을 때 토큰으로 사용자 정보 가져오기
  // const getUserProfile = async () => {
  //   const response = await instance.get('/members');

  //   if (response.data.status == 'success') {
  //     console.log(response.data);
  //   }
  // };

  // useEffect(() => {
  //   getUserProfile();
  // }, []);

  // 셋리스트 받아오는 코드 ///////////////////////////////
  // const getSetList = async () => {
  //   const response = await instance.get('festivals/96/songs');

  //   if (response.data.status == 'success') {
  //     console.log(response.data.data);
  //     console.log(response.data.data.lineupList.name);
  //   }
  // };

  // useEffect(() => {
  //   getSetList();
  // }, []);

  // 페스티벌 정보 받는 코드
  // const getFestivalDetail = async () => {
  //   try {
  //     const response = await axios.get(baseURL, {
  //       headers: headers,
  //       withCredentials: true,
  //     });
  //     if (response.data.status == 'success') {
  //       console.log(response);
  //       console.log(response.data);
  //       console.log(response.data.data.name);
  //       console.log(response.data.data.location);
  //       console.log(response.data.data.posterUrl);
  //       console.log(response.data.data.price);
  //       console.log(response.data.data.ended);
  //       console.log(response.data.data.liked);
  //     } else {
  //       console.log('성공아냐');
  //       console.log(response);
  //     }
  //   } catch (error) {
  //     console.log('토큰 재발급이 필요합니다');
  //     console.log(error);
  //   }

  // 페스티벌 정보 받아오는 코드
  // const getFestivalInfo = async () => {
  //   const response = await instance.get('festivals/96');

  //   if (response.data.status == 'success') {
  //     console.log(response.data.data);
  //   }
  // };

  // useEffect(() => {
  //   getFestivalInfo();
  // }, []);

  // 페스티벌 목록에서 페스티벌 상세 띄워주는 코드
  const navigate = useNavigate();
  const [festivalInfo, setFestivalInfo] = useState(null);

  // useEffect(() => {
  //   const getFestivalInfo = async () => {
  //     try {
  //       const response = await axios.get('festivals/96');
  //       if (response.data.status === 'success') {
  //         const festival = response.data.data;
  //         setFestivalInfo(festival); // 페스티벌 정보를 상태로 설정

  //         if (festival.ended) {
  //           navigate(`/festival/done/${festival.id}`);
  //         } else {
  //           navigate(`/festival/${festival.id}`);
  //         }
  //       }
  //     } catch (error) {
  //       console.error('페스티벌 상세 페이지 이동 실패', error);
  //     }
  //   };
  //   getFestivalInfo();
  // }, [navigate]);

  // 페스티벌 목록에서 페스티벌 정보 확인해서 적당한 페이지로 라우팅하는 코드
  // const onClickBtn = async () => {
  //   console.log('버튼클릭');
  //   try {
  //     const response = await instance.get('festivals/12');
  //     console.log(response.data);
  //     if (response.data.status === 'success') {
  //       const festival = response.data.data;

  //       if (festival.ended) {
  //         navigate(`/festival/done/${festival.id}`);
  //       } else {
  //         navigate(`/festival/${festival.id}`);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error fetching festival info:', error);
  //   }
  // };

  // 테스트 버튼
  const onClickBtn = async () => {
    console.log('버튼클릭');
    try {
      const response = await instance.get('recommendations/festivals');
      if (response.data.status === 'success') {
        const festival = response.data.data;

        if (festival.ended) {
          navigate(`/festival/done/${festival.id}`);
        } else {
          navigate(`/festival/${festival.id}`);
        }
      }
    } catch (error) {
      console.error('Error fetching festival info:', error);
    }
  };

  return (
    <>
      <div>
        <h2>테스트 페이지</h2>
        <button onClick={onClickBtn}>테스트 버튼</button>
      </div>
    </>
  );
};
export default TestPage;

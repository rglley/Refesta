import axios from 'axios';

import { useEffect, useRef, useState } from 'react';

import defaultImg from '../../assets/default_img.jpg';
import editPencil from '../../assets/edit_pencil.png';

// Authorization

const baseURL = `${import.meta.env.VITE_PUBLIC_API_SERVER}/members`;
const accessToken = `Bearer ${localStorage.getItem('accessToken')}`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: accessToken,
};

const ProfileInfo = ({ setStep, stepParam }) => {
  const [nickname, setNickname] = useState('');
  const [imgInfo, setImgInfo] = useState({
    url: '',
    file: null,
  });

  // 페이지에 들어왔을 때 토큰으로 사용자 정보 가져오기
  const getUserProfile = async () => {
    try {
      const response = await axios.get(baseURL, {
        headers: headers,
        withCredentials: true,
      });
      if (response.data.status == 'success') {
        const nickname = response.data.data.nickname;
        const url = response.data.data.profileUrl;
        setNickname(nickname ? nickname : '');
        //setImgURL(url ? url : defaultImg);
        setImgInfo({ ...imgInfo, url: url });
      } else {
        console.log('성공아냐');
        console.log(response);
      }
    } catch (error) {
      // 401 에러가 났으면 리프레시 토큰 보내서 재발급
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  // 닉네임 변경
  const onChangeNickName = (e) => {
    setNickname(e.target.value);
  };

  // 파일 변경
  const inputFile = useRef();
  // 연필을 눌렀을 때, 파일 인풋 누른것 처럼 동작
  const onClickInputFile = (e) => {
    e.preventDefault(); // 혹시 모르니 기존 동작 막고
    inputFile.current.click(); // 파일인풋 클릭
  };
  // 이미지 변경되었을 때, 미리보기
  const onChangeImgFile = (e) => {
    setImgInfo((preState) => {
      return {
        url: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      };
    });
  };

  // 사용자 입력 정보 서버로 전달
  const onClickRegist = () => {
    alert('프로필 설정 완료');
    setStep(stepParam.step2);
  };

  return (
    <div className='grid gap-y-5'>
      <div className='text-2xl font-bold leading-9 tracking-tight text-center text-ourIndigo'>
        프로필 설정하기
      </div>
      <div className='relative w-full'>
        <input
          type='file'
          ref={inputFile}
          className='hidden'
          onChange={onChangeImgFile}
        />
        <img
          className='object-cover w-full border rounded-full border-zinc-300'
          src={imgInfo.url}
        />
        <div
          className='absolute bottom-7 right-3 overflow-hidden flex justify-center bg-[#D9D9D9] rounded-full w-10 h-10 cursor-pointer'
          onClick={onClickInputFile}
        >
          <img
            className='object-contain w-1/2 h-full'
            src={editPencil}
          />
        </div>
      </div>
      <input
        className='flex items-center justify-center w-full pl-5 rounded-md bg-ourBrightGray h-14'
        type='text'
        placeholder='닉네임 입력'
        value={nickname}
        onChange={onChangeNickName}
      />
      <button
        className='flex items-center justify-center w-full text-white rounded-md bg-ourIndigo h-14'
        onClick={onClickRegist}
      >
        회원가입 완료
      </button>
    </div>
  );
};
export default ProfileInfo;

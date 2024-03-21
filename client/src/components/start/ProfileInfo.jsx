import { useLocation } from 'react-router-dom';
import defaultImg from '../../assets/default_img.jpg';
import editPencil from '../../assets/edit_pencil.png';
import { useEffect } from 'react';

const ProfileInfo = ({ setStep, stepParam }) => {
  // navigate로 값 받으려면 이거 사용
  const location = useLocation();

  const getUserProfile = async () => {
    try {
      //const response = await instance.get('/login');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const onClickRegist = () => {
    alert('프로필 설정 완료');
    setStep(stepParam.step2);
  };

  return (
    <div className='grid gap-y-5'>
      <div className='text-2xl font-bold leading-9 tracking-tight text-center text-ourIndigo'>
        프로필 설정하기
      </div>
      <div className='relative w-full p-2'>
        <img className='w-full rounded-full' src={defaultImg} />
        <div
          className='absolute bottom-5 right-2 overflow-hidden flex justify-center bg-[#D9D9D9] rounded-full w-10 h-10 cursor-pointer'
          onClick={() => {
            alert('사진 선택');
          }}
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
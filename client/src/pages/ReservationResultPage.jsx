import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useKakaoStore from '@store/kakaoStore';

import BillingResult from '@components/reservation/BillingResult';

import billImg from '@assets/billImg.png';

const ReservationResultPage = () => {
  const [reservationNum, setReservationNum] = useState();
  const nav = useNavigate();
  const { billingResult, getBillingResult } = useKakaoStore();
  const { id } = useParams();

  useEffect(() => {
    getBillingResult(id);
  }, []);

  useEffect(() => {
    setReservationNum(
      id +
        'JR' +
        new Date(billingResult.paymentDate).getMonth() +
        new Date(billingResult.paymentDate).getDate() +
        billingResult.count +
        'JY'
    );
  }, [billingResult]);

  return (
    <div className='flex flex-col items-center justify-between w-full min-h-[800] h-lvh'>
      <div>
        <div className='w-full mt-10'>
          <img
            className='w-full'
            src={billImg}
          />
        </div>
        <div className='w-full mt-5 text-sm text-center text-gray-400'>예매번호 : {reservationNum}</div>
        <BillingResult billingResult={billingResult} />
      </div>
      <button
        className='flex items-center justify-center w-11/12 mb-5 text-white rounded-md bg-ourIndigo h-14'
        onClick={() => {
          nav('/', { replace: true });
        }}
      >
        홈으로
      </button>
    </div>
  );
};

export default ReservationResultPage;

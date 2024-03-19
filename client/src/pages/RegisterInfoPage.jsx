import { useParams } from 'react-router-dom';
import RegisterInfo from '../components/start/RegistInfo';
const RegisterInfoPage = () => {
  const { step } = useParams();

  return (
    <div className='w-full mx-0 my-auto'>
      <RegisterInfo step={step} />
    </div>
  );
};

export default RegisterInfoPage;

import { useNavigate } from 'react-router-dom';

import logo from '../../assets/refesta_logo.png';

const Login = () => {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleGoogleLogin = () => {
    // 구글 로그인 화면으로 이동시키기
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
		&redirect_uri=${import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI}
		&response_type=code
		&scope=email profile`;
  };

  return (
    <div className='grid place-items-center bg-emerald-200'>
      <img src={logo} />
      <button onClick={handleGoogleLogin}>Google로 시작하기</button>
    </div>
  );
};
export default Login;

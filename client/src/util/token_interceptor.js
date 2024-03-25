import axios from 'axios';

// 헤더에 토큰이 들어간 axiosInstance
const instance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_SERVER,
  headers: {
    'Access-Control-Allow-Origin': 'http://http://localhost:5173',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  },
});

// 토큰 만료시 재발급을 위한 axiosInstance
const refreshInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_SERVER,
});

// 토큰 재발급 요청 - 리프레시 토큰은 바디에 담아서 보냄
const regenerateRefreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const res = await refreshInstance.post('/login/oauth/token', refreshToken);

  return res;
};

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    // 요청 전달 전 작업 수행 : 헤더에 토큰 넣기
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
  },
  (error) => {
    // 요청 오류 시 작업 수행
    console.log(error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    // 2xx 상태 코드 시 이 함수 트리거
    // 응답 데이터가 있는 작업 수행
    if (response.status == 404) {
      console.log('404 페이지로 넘기기');
    }
    return response;
  },
  async (error) => {
    // 2xx 이외 상태 코드 시 이 함수 트리거
    // 응답 오류가 있는 작업 수행
    if (error.response.status == 401) {
      const originRequest = error.config;
      try {
        console.log('재발급');
        const res = await regenerateRefreshToken();
        const newAccessToken = res.data.data.accessToken;
        localStorage.setItem('accessToken', res.data.data.accessToken);
        localStorage.setItem('refreshToken', res.data.data.refreshToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(originRequest);
      } catch (error) {
        alert('로그아웃 되었습니다. 다시 로그인해주세요!');
        // 리프레시 토큰으로 재발급이 안된거니까 로그인 다시!
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.replace('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
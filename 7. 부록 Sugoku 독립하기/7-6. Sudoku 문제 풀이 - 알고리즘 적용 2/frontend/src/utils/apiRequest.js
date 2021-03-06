import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export default async function (options) {
  const { url, method, headers = {}, params, data } = options;
  const token = localStorage.getItem('token');
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const res = await axios({ url, method, headers, params, data });
    return res.data;
  } catch (err) {
    // 공통 에러 처리
    alert(err.response.data.message);
    throw err;
  }
};
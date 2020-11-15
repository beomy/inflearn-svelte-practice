import axios from 'axios';

axios.defaults.baseURL = __buildEnv__ === 'development'
  ? 'http://localhost:3000'
  : 'https://svelte-sudoku-api.herokuapp.com';

export default async function (options) {
  const { url, method, headers = {}, params, data } = options;
  const token = localStorage.getItem('token');
  if (token) headers['access-token'] = token;

  try {
    const res = await axios({ url, method, headers, params, data });
    return res.data;
  } catch (err) {
    // 공통 에러 처리
    alert(err.response.data.message);
    throw err;
  }
};
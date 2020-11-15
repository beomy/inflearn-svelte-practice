import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export default async function (options) {
  const { url, method, headers = {}, params, data } = options;
  try {
    const res = await axios({ url, method, headers, params, data });
    return res.data;
  } catch (err) {
    // 공통 에러 처리
    throw err;
  }
};
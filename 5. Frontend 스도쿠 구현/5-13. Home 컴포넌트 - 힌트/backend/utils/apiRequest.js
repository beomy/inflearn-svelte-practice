import axios from 'axios';

axios.defaults.baseURL = 'https://sugoku.herokuapp.com';

export default async function (options) {
  const { url, method, headers = {}, params, data } = options;
  try {
    const res = await axios({ url, method, headers, params, data });
    return res.data;
  } catch (err) {
    throw err;
  }
};
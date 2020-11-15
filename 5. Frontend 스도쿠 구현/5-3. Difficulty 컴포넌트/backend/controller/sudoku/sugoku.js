import apiRequest from '../../utils/apiRequest';

export function getSudoku (params) {
  return apiRequest({
    method: 'get',
    url: '/board',
    params,
  });
};

export function getSolve (data) {
  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
  const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');
  return apiRequest({
    method: 'post',
    url: '/solve',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: encodeParams(data),
  });
};
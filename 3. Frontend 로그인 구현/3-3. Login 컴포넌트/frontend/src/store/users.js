import apiRequest from '@/utils/apiRequest';

export function getUser () {
  return apiRequest({
    method: 'get',
    url: '/user',
  });
};

export function login (data) {
  return apiRequest({
    method: 'post',
    url: '/users/login',
    data,
  })
};
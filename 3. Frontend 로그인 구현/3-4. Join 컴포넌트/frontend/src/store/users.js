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
  });
};

export function valid (params) {
  return apiRequest({
    method: 'get',
    url: '/users/valid',
    params,
  });
};

export function join (data) {
  return apiRequest({
    method: 'post',
    url: '/users',
    data,
  });
}
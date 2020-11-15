import apiRequest from '@/utils/apiRequest';

export function getUser () {
  return apiRequest({
    method: 'get',
    url: '/user',
  });
};

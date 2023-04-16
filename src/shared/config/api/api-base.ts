import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { API_BASE, TOKEN } from '@/shared/lib/constants';

const tezPayApi = axios.create({
  baseURL: API_BASE,
});

tezPayApi.interceptors.request.use((config) => {
  const authToken = Cookies.get(TOKEN.AUTH_TOKEN);
  config.headers['Fcm-Token'] = 'test';
  config.headers['authorization'] = `Bearer ${authToken}`;
  return config;
});

tezPayApi.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    // notifyError(error.message);

    const errorStatus = error?.response?.status;

    if (errorStatus === 401) {
      return error.response;
    } else throw error;
    // return error;
  },
);

// eslint-disable-next-line import/no-default-export
export default tezPayApi;

import { userAPI } from 'apis';
import axios, { AxiosError } from 'axios';
import { Cookies } from 'react-cookie';
import { parseJwt } from 'utils/parseJwt';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';

const cookies = new Cookies();

function setToken(key: 'ACCESS_TOKEN' | 'REFRESH_TOKEN', token: string) {
  const expires = new Date();
  expires.setDate(expires.getDate() + 14);

  cookies.set(key, token, {
    path: '/',
    expires: key === 'REFRESH_TOKEN' ? expires : undefined,
  });
}

async function authorizeFetch({
  accessToken,
  refreshToken,
  apiURL,
}: {
  accessToken: string;
  refreshToken: string;
  apiURL: string;
}) {
  const headers = {
    ...(accessToken ? { accessToken: accessToken } : {}),
  };

  try {
    const { data } = await axios.get(apiURL, {
      headers,
    });
    return { isAuth: true, data: data.data };
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response && e.response.status === 401) {
        const { userId } = parseJwt(accessToken as string);

        try {
          const { data: newTokenData } = await userAPI.reissueToken({
            userId: parseInt(userId),
            accessToken,
            refreshToken,
          });

          const newAccessToken = newTokenData.data.accessToken;
          setToken('ACCESS_TOKEN', newAccessToken);

          const { data: newAuthData } = await axios.get(apiURL, {
            headers: {
              accessToken: newAccessToken,
            },
          });

          return { isAuth: true, data: newAuthData.data };
        } catch (e) {
          const { data } = await axios.get(apiURL);
          return { isAuth: false, data: data.data };
        }
      }
    }
    const { data } = await axios.get(apiURL);
    return { isAuth: false, data: data.data };
  }
}

function removeToken(key: 'ACCESS_TOKEN' | 'REFRESH_TOKEN') {
  cookies.remove(key, { path: '/' });
}

function removeTokenAll() {
  removeToken(ACCESS_TOKEN);
  removeToken(REFRESH_TOKEN);
}

function getAccessToken() {
  return cookies.get(ACCESS_TOKEN);
}

function getRefreshToken() {
  return cookies.get(REFRESH_TOKEN);
}

export { setToken, authorizeFetch, removeToken, removeTokenAll, getAccessToken, getRefreshToken };

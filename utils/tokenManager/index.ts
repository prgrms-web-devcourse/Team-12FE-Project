import cookie from 'react-cookies';

function setToken(key: 'ACCESS_TOKEN' | 'REFRESH_TOKEN', token: string) {
  // 개발 환경에 따라서 설정
  const expires = new Date();

  expires.setDate(expires.getDate() + 14);

  cookie.save(key, token, {
    path: '/',
    expires: key === 'REFRESH_TOKEN' ? expires : undefined,
    // httpOnly: HTTP_ONLY,
  });
}

export { setToken };

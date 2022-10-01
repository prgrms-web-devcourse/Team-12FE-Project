import { userAPI } from 'apis';
import { atom, selector } from 'recoil';
import { Cookies } from 'react-cookie';
import { SIGNOUT_USER_STATE } from '../constants';

const cookies = new Cookies();

const cookieEffect =
  (accessTokenKey: string, refreshTokenKey: string) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ setSelf, onSet }: any) => {
    onSet(async () => {
      console.log('onSet');

      try {
        if (!cookies.get(accessTokenKey) || !cookies.get(refreshTokenKey)) {
          cookies.remove('ACCESS_TOKEN');
          cookies.remove('REFRESH_TOKEN');
          return SIGNOUT_USER_STATE;
        }

        const { data } = await userAPI.getMyInfo();
        const { userId, email, nickname, profileImage } = data.data;
        return { userId, email, nickname, profileImage, isLoggedIn: true };
      } catch (error: unknown) {
        cookies.remove('ACCESS_TOKEN');
        cookies.remove('REFRESH_TOKEN');
        console.error(error);

        return SIGNOUT_USER_STATE;
      }
    });
  };

const userAtom = atom({
  key: `user/${new Date().getUTCMilliseconds() * Math.random()}`,
  effects: [cookieEffect('ACCESS_TOKEN', 'REFRESH_TOKEN')],
  default: SIGNOUT_USER_STATE,
});

export default userAtom;

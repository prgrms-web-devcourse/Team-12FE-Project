import { unAuthRequest } from 'apis/common';

const exhibitionAPI = {
  getUpcoming: (page: number, size: number) => {
    return unAuthRequest.get(`/api/v1/exhibitions/upcoming?page=${page}&size=${size}`);
  },
  getMostLike: (page: number, size: number, includeEnd: boolean) => {
    return unAuthRequest.get(
      `/api/v1/exhibitions/mostlike?page=${page}&size=${size}&include-end=${includeEnd}`,
    );
  },
  getDetail: (exhibitionId: number) => {
    return unAuthRequest.get(`/api/v1/exhibitions/${exhibitionId}`);
  },
  search: (query: string, page: number, size: number, includeEnd: boolean) => {
    return unAuthRequest.get(
      `/api/v1/exhibitions?query=${query}&page=${page}&size=${size}&include-end=${includeEnd}`,
    );
  },
  custom: (area?: string, month?: string, page?: number, size?: number) => {
    return unAuthRequest.get(
      `/api/v1/exhibitions/custom?areas=${area}&months=${month}&page=${page}&size=${size}`,
    );
  },
};

export default exhibitionAPI;

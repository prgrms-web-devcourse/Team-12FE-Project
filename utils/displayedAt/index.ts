export const displayDate = (createdAt: string) => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60 * 1000; // KST와 UTC의 차이를 밀리초로 계산
  const milliSeconds = now.getTime() + offset - new Date(createdAt).getTime();

  const seconds = milliSeconds / 1000;
  if (seconds < 60) {
    return `방금 전`;
  }
  const minutes = seconds / 60;
  if (minutes < 60) {
    return `${Math.floor(minutes)}분 전`;
  }
  const hours = minutes / 60;
  if (hours < 24) {
    return `${Math.floor(hours)}시간 전`;
  }
  const days = hours / 24;
  if (days < 7) {
    return `${Math.floor(days)}일 전`;
  }
  const weeks = days / 7;
  if (weeks < 5) {
    return `${Math.floor(weeks)}주 전`;
  }
  const months = days / 30;
  if (months < 12) {
    return `${Math.floor(months)}개월 전`;
  }
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
};

export const displayDday = (startDate: string) => {
  const milliSeconds = new Date(startDate).getTime() - new Date().getTime();
  const seconds = milliSeconds / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  return Math.ceil(days);
};

export const displayFormattedDate = (startDate: string) => {
  return startDate.slice(5).replace('-', '/');
};

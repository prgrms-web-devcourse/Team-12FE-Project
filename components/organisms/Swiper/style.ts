import styled from '@emotion/styled';

export const SwiperWrapper = styled.div`
  padding: 10px;
  position: relative;
  margin-bottom: 30px;
  height: 500px;

  .swiper-container {
    width: 80%;
    height: 500px;
    padding-left: 50px;
    padding-right: 50px;
  }

  .swiper-button-next {
    background-size: 50% auto;
    background-position: center;
    color: ${({ theme }) => theme.color.blue.main};
    position: absolute;
    right: -20px;
    z-index: 5;
  }

  .swiper-button-prev {
    color: ${({ theme }) => theme.color.blue.main};
  }
`;

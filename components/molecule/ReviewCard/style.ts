import styled from '@emotion/styled';
import { Avatar, Card, Image } from 'antd';

export const ReviewCard = styled(Card)`
  width: 600px;
  height: 270px;
  border: none;
  border-radius: 30px;
  padding: 10px 5px 10px 5px;
  cursor: default;
`;

export const Title = styled.div`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 5px;
  cursor: pointer;
`;

export const Content = styled.div`
  width: 500px;
  font-weight: 400;
  font-size: 18px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  cursor: pointer;
`;

export const UserInfoAvatar = styled(Avatar)`
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    filter: brightness(70%);
  }
`;

export const UserInfoContainer = styled.div`
  display: flex;
  width: fit-content;
  margin-bottom: 15px;
`;

export const UserInfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserInfoName = styled.span`
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
`;

export const UserInfoDate = styled.span`
  font-weight: 300;
  color: ${({ theme }) => theme.color.font.light};
`;

export const PhotoWrapper = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
`;

export const Photo = styled(Image)`
  width: 110px;
  height: 110px;
  border-radius: 20px;
`;

export const HoverContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 110px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  gap: 5px;
  color: white;
  cursor: pointer;
  position: relative;
  top: -110px;
`;

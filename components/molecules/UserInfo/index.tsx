import { Avatar } from 'antd';
import styled from '@emotion/styled';
import Link from 'next/link';
import { displayDate } from 'utils';
import { UserProps } from 'types/model';
import { UserAvatar } from 'components/atoms';
interface UserInfoProps extends UserProps {
  createdDate: string;
}

const UserInfo = ({ profileImage, nickname, createdDate, userId }: UserInfoProps) => {
  return (
    <UserInfoContainer>
      <UserAvatar profileImage={profileImage} userId={userId} />
      <UserInfoTextWrapper>
        <Link href={`/users/${userId}`}>
          <a>
            <UserInfoName>{nickname}</UserInfoName>
          </a>
        </Link>
        <UserInfoDate>{displayDate(createdDate)}</UserInfoDate>
      </UserInfoTextWrapper>
    </UserInfoContainer>
  );
};

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
`;

const UserInfoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  margin-left: 10px;
`;

const UserInfoName = styled.span`
  cursor: pointer;
  white-space: nowrap;
`;

const UserInfoDate = styled.span``;

export default UserInfo;

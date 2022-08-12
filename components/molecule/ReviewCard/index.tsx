import { useState } from 'react';
import { HeartOutlined, MessageOutlined } from '@ant-design/icons';
import * as S from './style';
import Link from 'next/link';
import { displayDate } from 'utils';
import { PhotoProps } from 'types/model';

interface ReviewCardProps {
  reviewId: number;
  thumbnail: string;
  title: string;
  content: string;
  createdAt: string;
  userId: number;
  profileImage: string;
  nickname: string;
  likeCount: number;
  commentCount: number;
  photo: PhotoProps[] | null;
}

const ReviewCard = ({
  reviewId,
  thumbnail,
  title,
  content,
  createdAt,
  userId,
  profileImage,
  nickname,
  likeCount,
  commentCount,
  photo,
}: ReviewCardProps) => {
  const [isHover, setIsHover] = useState(false);
  const mouseHover = () => setIsHover((isHover) => !isHover);

  return (
    <Link href={`/reviews/detail/${reviewId}`}>
      <a>
        <S.ReviewCard>
          <S.PhotoWrapper onMouseEnter={mouseHover} onMouseLeave={mouseHover}>
            <S.Photo preview={false} src={photo && photo.length > 0 ? photo[0].path : thumbnail} />
            {isHover ? (
              <S.HoverContent>
                <HeartOutlined /> {likeCount} <MessageOutlined /> {commentCount}
              </S.HoverContent>
            ) : null}
          </S.PhotoWrapper>
          <S.UserInfoContainer>
            <Link href={`/user/${userId}`}>
              <S.UserInfoAvatar src={profileImage} />
            </Link>
            <S.UserInfoTextContainer>
              <Link href={`/user/${userId}`}>
                <S.UserInfoName>{nickname}</S.UserInfoName>
              </Link>
              <S.UserInfoDate>{displayDate(createdAt)}</S.UserInfoDate>
            </S.UserInfoTextContainer>
          </S.UserInfoContainer>
          <S.Title>{title}</S.Title>
          <S.Content>{content}</S.Content>
        </S.ReviewCard>
      </a>
    </Link>
  );
};

export default ReviewCard;

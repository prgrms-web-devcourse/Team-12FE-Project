import { useState } from 'react';
import { HeartOutlined, MessageOutlined } from '@ant-design/icons';
import * as S from './style';
import Link from 'next/link';
import { displayDate } from 'utils';
import { PhotoProps } from 'types/model';
import DEFAULT_IMAGE from 'constants/defaultImage';

interface ReviewCardProps {
  data: {
    reviewId: number;
    user: {
      userId: number;
      nickname: string;
      profileImage: string;
    };
    title: string;
    content: string;
    createdAt: string;
    likeCount: number;
    commentCount: number;
    photos: PhotoProps[] | null;
  };
  thumbnail: string;
}

const ReviewCard = ({ data, thumbnail }: ReviewCardProps) => {
  const [isHover, setIsHover] = useState(false);
  const mouseHover = () => setIsHover((isHover) => !isHover);

  if (!data) {
    return null;
  }

  const {
    reviewId,
    title,
    content,
    createdAt,
    likeCount,
    commentCount,
    photos,
    user: { userId, nickname, profileImage },
  } = data;

  return (
    <Link href={`/reviews/detail/${reviewId}`}>
      <a>
        <S.ReviewCard>
          <S.PhotoWrapper onMouseEnter={mouseHover} onMouseLeave={mouseHover}>
            <S.Photo
              src={photos && photos.length > 0 ? photos[0].path : thumbnail}
              alt="review photo"
              layout="fixed"
              width={110}
              height={110}
              placeholder="blur"
              blurDataURL={DEFAULT_IMAGE.BLUR_DATA_URL}
            />
            {isHover ? (
              <S.HoverContent>
                <HeartOutlined /> {likeCount} <MessageOutlined /> {commentCount}
              </S.HoverContent>
            ) : null}
          </S.PhotoWrapper>
          <S.UserInfoContainer>
            <Link href={`/users/${userId}`}>
              <S.UserInfoAvatar
                src={profileImage || DEFAULT_IMAGE.USER_PROFILE}
                size={60}
                alt={'user atavar'}
              />
            </Link>
            <S.UserInfoTextContainer>
              <Link href={`/users/${userId}`}>
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

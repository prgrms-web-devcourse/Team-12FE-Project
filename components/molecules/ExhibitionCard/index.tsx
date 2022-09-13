import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { HeartFilled, HeartOutlined, MessageOutlined } from '@ant-design/icons';
import * as S from './style';
import Link from 'next/link';
import { ExhibitionProps } from 'types/model';
import { displayDday, displayFormattedDate } from 'utils';
import Image from 'next/image';
import DEFAULT_IMAGE from 'constants/defaultImage';

const { Meta } = Card;

const ExhibitionCard = ({
  exhibitionId,
  name,
  thumbnail,
  startDate,
  endDate,
  likeCount,
  reviewCount,
  isLiked,
}: Required<ExhibitionProps>) => {
  const [isHover, setIsHover] = useState(false);
  const dDay = displayDday(startDate);
  const mouseHover = () => setIsHover((isHover) => !isHover);

  return (
    <Link href={`/exhibitions/detail/${exhibitionId}`}>
      <S.ExhibitionCard>
        <Card
          className="exhibition-card"
          onMouseEnter={mouseHover}
          onMouseLeave={mouseHover}
          cover={
            <Image
              src={thumbnail}
              alt="card image"
              layout="fixed"
              width={250}
              height={300}
              placeholder="blur"
              blurDataURL={DEFAULT_IMAGE.BLUR_DATA_URL}
              className="card-image"
            />
          }
        >
          {isHover && (
            <S.HoverContent>
              {' '}
              {isLiked ? <HeartFilled className="heart-icon" /> : <HeartOutlined />}
              {likeCount} <MessageOutlined /> {reviewCount}{' '}
            </S.HoverContent>
          )}
        </Card>
        <S.Description>
          <h3 className="title">{name}</h3>
          <div>
            <h3>
              {displayFormattedDate(startDate)} - {displayFormattedDate(endDate)}
            </h3>
            <S.Dday>
              D{dDay < 0 ? '+' : '-'}
              {Math.abs(dDay)}
            </S.Dday>
          </div>
        </S.Description>
      </S.ExhibitionCard>
    </Link>
  );
};

export default ExhibitionCard;

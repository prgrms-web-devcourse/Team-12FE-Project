import ExhibitionCard from 'components/molecule/ExhibitionCard';
import SwiperWrapper from 'components/organism/Swiper';
import SwiperContainer from 'components/organism/SwiperContainer';
import type { NextPage } from 'next';
import React, { useState } from 'react';

const Home: NextPage = () => {
  const ret = {
    exhibitionId: 1,
    name: '번아웃증후군',
    thumbnail: 'https://www.culture.go.kr/upload/rdf/22/07/show_2022071816261910020.jpg',
    startDate: '2022-08-04',
    endDate: '2022-08-10',
    area: 'SEOUL',
    url: 'http://galleryraon.com/?page_id=2472#upcoming',
    placeUrl: 'http://galleryraon.com/?page_id=2472#upcoming',
    inquiry: '010-8425-8082',
    fee: '무료',
    genre: '',
    description: '',
    likeCount: 5,
    placeAddr: '서울특별시 종로구 자하문로41길 4 갤러리라온',
    lat: 37.597625,
    lng: 126.962292,
    isLiked: false,
    reviews: [
      {
        reviewId: 111,
        user: {
          userId: 11,
          profileImage: 'https~',
          nickname: 'Emily',
        },
        title: '번아웃증후군 전시회 다녀옴~',
        content: '오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~',
        createdAt: '2022-03-22T22:33:11',
        isLiked: false,
        likeCount: 32,
        commentCount: 2,
        photos: ['https~', 'https~'],
      },
      {
        reviewId: 111,
        user: {
          userId: 11,
          profileImage: 'https~',
          nickname: 'Emily',
        },
        title: '번아웃증후군 전시회 다녀옴~',
        content: '오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~',
        createdAt: '2022-03-22T22:33:11',
        isLiked: false,
        likeCount: 32,
        commentCount: 2,
        photos: ['https~', 'https~'],
      },
      {
        reviewId: 111,
        user: {
          userId: 11,
          profileImage: 'https~',
          nickname: 'Emily',
        },
        title: '번아웃증후군 전시회 다녀옴~',
        content: '오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~',
        createdAt: '2022-03-22T22:33:11',
        isLiked: false,
        likeCount: 32,
        commentCount: 2,
        photos: ['https~', 'https~'],
      },
      {
        reviewId: 111,
        user: {
          userId: 11,
          profileImage: 'https~',
          nickname: 'Emily',
        },
        title: '번아웃증후군 전시회 다녀옴~',
        content: '오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~',
        createdAt: '2022-03-22T22:33:11',
        isLiked: false,
        likeCount: 32,
        commentCount: 2,
        photos: ['https~', 'https~'],
      },
    ],
  };

  //TODO : 맞춤전시회로 이동해야함
  const [selectedArea, setSelectedArea] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState([]);

  return (
    <div>
      <SwiperContainer title="다가오는 전시회" type="upcoming">
        <SwiperWrapper
          items={[
            <ExhibitionCard
              key={1}
              exhibitionId={ret.exhibitionId}
              name={ret.name}
              thumbnail={ret.thumbnail}
              startDate={ret.startDate}
              endDate={ret.endDate}
              likeCount={ret.likeCount}
              reviewCount={ret.reviews.length}
            />,
            <ExhibitionCard
              key={2}
              exhibitionId={ret.exhibitionId}
              name={ret.name}
              thumbnail={ret.thumbnail}
              startDate={ret.startDate}
              endDate={ret.endDate}
              likeCount={ret.likeCount}
              reviewCount={ret.reviews.length}
            />,
            <ExhibitionCard
              key={3}
              exhibitionId={ret.exhibitionId}
              name={ret.name}
              thumbnail={ret.thumbnail}
              startDate={ret.startDate}
              endDate={ret.endDate}
              likeCount={ret.likeCount}
              reviewCount={ret.reviews.length}
            />,
            <ExhibitionCard
              key={4}
              exhibitionId={ret.exhibitionId}
              name={ret.name}
              thumbnail={ret.thumbnail}
              startDate={ret.startDate}
              endDate={ret.endDate}
              likeCount={ret.likeCount}
              reviewCount={ret.reviews.length}
            />,
            <ExhibitionCard
              key={5}
              exhibitionId={ret.exhibitionId}
              name={ret.name}
              thumbnail={ret.thumbnail}
              startDate={ret.startDate}
              endDate={ret.endDate}
              likeCount={ret.likeCount}
              reviewCount={ret.reviews.length}
            />,
            <ExhibitionCard
              key={6}
              exhibitionId={ret.exhibitionId}
              name={ret.name}
              thumbnail={ret.thumbnail}
              startDate={ret.startDate}
              endDate={ret.endDate}
              likeCount={ret.likeCount}
              reviewCount={ret.reviews.length}
            />,
            <ExhibitionCard
              key={7}
              exhibitionId={ret.exhibitionId}
              name={ret.name}
              thumbnail={ret.thumbnail}
              startDate={ret.startDate}
              endDate={ret.endDate}
              likeCount={ret.likeCount}
              reviewCount={ret.reviews.length}
            />,
            <ExhibitionCard
              key={8}
              exhibitionId={ret.exhibitionId}
              name={ret.name}
              thumbnail={ret.thumbnail}
              startDate={ret.startDate}
              endDate={ret.endDate}
              likeCount={ret.likeCount}
              reviewCount={ret.reviews.length}
            />,
            <ExhibitionCard
              key={9}
              exhibitionId={ret.exhibitionId}
              name={ret.name}
              thumbnail={ret.thumbnail}
              startDate={ret.startDate}
              endDate={ret.endDate}
              likeCount={ret.likeCount}
              reviewCount={ret.reviews.length}
            />,
          ]}
        />
      </SwiperContainer>

      <SwiperContainer title="인기많은 전시회" type="popular">
        <SwiperWrapper
          items={[
            <ExhibitionCard
              key={10}
              exhibitionId={ret.exhibitionId}
              name={ret.name}
              thumbnail={ret.thumbnail}
              startDate={ret.startDate}
              endDate={ret.endDate}
              likeCount={ret.likeCount}
              reviewCount={ret.reviews.length}
            />,
            <ExhibitionCard
              key={11}
              exhibitionId={ret.exhibitionId}
              name={ret.name}
              thumbnail={ret.thumbnail}
              startDate={ret.startDate}
              endDate={ret.endDate}
              likeCount={ret.likeCount}
              reviewCount={ret.reviews.length}
            />,
            <ExhibitionCard
              key={12}
              exhibitionId={ret.exhibitionId}
              name={ret.name}
              thumbnail={ret.thumbnail}
              startDate={ret.startDate}
              endDate={ret.endDate}
              likeCount={ret.likeCount}
              reviewCount={ret.reviews.length}
            />,
            <ExhibitionCard
              key={13}
              exhibitionId={ret.exhibitionId}
              name={ret.name}
              thumbnail={ret.thumbnail}
              startDate={ret.startDate}
              endDate={ret.endDate}
              likeCount={ret.likeCount}
              reviewCount={ret.reviews.length}
            />,
            <ExhibitionCard
              key={14}
              exhibitionId={ret.exhibitionId}
              name={ret.name}
              thumbnail={ret.thumbnail}
              startDate={ret.startDate}
              endDate={ret.endDate}
              likeCount={ret.likeCount}
              reviewCount={ret.reviews.length}
            />,
            <ExhibitionCard
              key={15}
              exhibitionId={ret.exhibitionId}
              name={ret.name}
              thumbnail={ret.thumbnail}
              startDate={ret.startDate}
              endDate={ret.endDate}
              likeCount={ret.likeCount}
              reviewCount={ret.reviews.length}
            />,
            <ExhibitionCard
              key={16}
              exhibitionId={ret.exhibitionId}
              name={ret.name}
              thumbnail={ret.thumbnail}
              startDate={ret.startDate}
              endDate={ret.endDate}
              likeCount={ret.likeCount}
              reviewCount={ret.reviews.length}
            />,
            <ExhibitionCard
              key={17}
              exhibitionId={ret.exhibitionId}
              name={ret.name}
              thumbnail={ret.thumbnail}
              startDate={ret.startDate}
              endDate={ret.endDate}
              likeCount={ret.likeCount}
              reviewCount={ret.reviews.length}
            />,
            <ExhibitionCard
              key={18}
              exhibitionId={ret.exhibitionId}
              name={ret.name}
              thumbnail={ret.thumbnail}
              startDate={ret.startDate}
              endDate={ret.endDate}
              likeCount={ret.likeCount}
              reviewCount={ret.reviews.length}
            />,
          ]}
        />
      </SwiperContainer>
    </div>
  );
};

export default Home;

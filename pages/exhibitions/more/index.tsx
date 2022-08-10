import type { NextPage } from 'next';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Banner, ExhibitionCard } from 'components/molecule';
import * as S from '../../../styles/pages/exhibitionsMore';
import { exhibitionAPI } from 'apis';
import { ExhibitionProps } from 'types/model';

//exhibitions/more
const ExhibitionsMore: NextPage = () => {
  const router = useRouter();
  const { type } = router.query;
  const [currentPage, setCurrentPage] = useState(0);
  const [exhibitions, setExhibitions] = useState<ExhibitionProps[]>([]);
  //TODO : 서버애서 받은 total 값 넣을 예정
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (type === 'upcoming') {
      exhibitionAPI
        .getUpcoming(currentPage, 8)
        .then((res) => {
          setTotal(res.data.data.totalPage);
          setExhibitions(res.data.data.content);
          console.log(res.data.data);
        })
        .catch((err) => console.log(err));
    } else {
      exhibitionAPI
        .getMostLike(currentPage, 8, true)
        .then((res) => {
          setTotal(res.data.data.totalPage);
          setExhibitions(res.data.data.content);
          console.log(res.data.data.content);
        })
        .catch((err) => console.log(err));
    }
  }, [currentPage]);

  return (
    <S.ExhibitionsMore>
      <div>
        <Banner title={type === 'upcoming' ? '다가오는 전시회' : '인기많은 전시회'} />
      </div>
      <S.ExhibitionsMoreContent>
        {exhibitions.map((exhibition) => (
          <ExhibitionCard
            exhibitionId={exhibition.exhibitionId}
            key={exhibition.exhibitionId}
            name={exhibition.name}
            thumbnail={exhibition.thumbnail}
            startDate={exhibition.startDate!}
            endDate={exhibition.endDate!}
            likeCount={exhibition.likeCount!}
            reviewCount={exhibition.reviewCount!}
            isLiked={exhibition.isLiked!}
          />
        ))}
      </S.ExhibitionsMoreContent>
      <Pagination
        className="pagination"
        defaultCurrent={1}
        current={currentPage + 1}
        total={total}
        defaultPageSize={10}
        showSizeChanger={false}
        pageSize={10}
        onChange={(page) => {
          setCurrentPage(page - 1);
          console.log(page - 1);
        }}
      />
    </S.ExhibitionsMore>
  );
};
export default ExhibitionsMore;

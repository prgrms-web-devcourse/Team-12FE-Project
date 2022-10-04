import SearchToolbar from 'components/organisms/SearchToolbar';
import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { Pagination } from 'antd';
import * as S from '../../../styles/pages/exhibitionsCustom';
import { ExhibitionProps } from 'types/model';
import { exhibitionAPI } from 'apis';
import { ExhibitionCard } from 'components/molecules';
import styled from '@emotion/styled';
import Head from 'next/head';

//exhibitions/custom
const ExhibitionCustom: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [exhibitions, setExhibitions] = useState<Required<ExhibitionProps>[]>([]);
  const [selectedArea, setSelectedArea] = useState<{ id: number; value: string; name: string }[]>(
    [],
  );
  const [selectedPeriod, setSelectedPeriod] = useState<
    { id: number; value: string; name: string }[]
  >([]);
  const [selectedGenre, setSelectedGenre] = useState<{ id: number; value: string; name: string }[]>(
    [],
  );

  const [total, setTotal] = useState(0);

  const getSelectedValue = (values: { id: number; value: string; name: string }[]) => {
    if ((values.length > 0 && values[0]!.value === 'ALL') || values.length === 0) {
      return 'ALL';
    }
    const areas: string[] = [];
    values.map((it) => areas.push(it.value));

    return areas.join(',');
  };
  useEffect(() => {
    exhibitionAPI
      .custom(
        getSelectedValue(selectedArea),
        getSelectedValue(selectedPeriod),
        getSelectedValue(selectedGenre),
        currentPage,
        8,
      )
      .then((res) => {
        setTotal(res.data.data.totalPage);
        setExhibitions(res.data.data.content);
      });
  }, [currentPage, selectedArea, selectedPeriod, selectedGenre]);

  useEffect(() => {
    exhibitionAPI.custom('ALL', 'ALL', 'ALL', 0, 10).then((res) => {
      setTotal(res.data.data.totalPage);
      setExhibitions(res.data.data.content);
    });
  }, []);
  return (
    <>
      <Head>
        <title>ArtZip | 맞춤 전시회</title>
      </Head>
      <S.ExhibitionsCustom>
        <SearchToolbar
          type="place"
          selectedValues={selectedArea}
          setSelectedValues={setSelectedArea}
        />
        <SearchToolbar
          type="period"
          selectedValues={selectedPeriod}
          setSelectedValues={setSelectedPeriod}
        />
        <SearchToolbar
          type="genre"
          selectedValues={selectedGenre}
          setSelectedValues={setSelectedGenre}
        />
        <S.ExhibitionsCustomContent>
          {exhibitions.length > 0 ? (
            exhibitions.map((exhibition) => (
              <ExhibitionCard key={exhibition.exhibitionId} data={exhibition} />
            ))
          ) : (
            <div>
              <Logo>Art.zip</Logo>
              <h4>해당하는 전시회가 없습니다. </h4>
            </div>
          )}
        </S.ExhibitionsCustomContent>
        <Pagination
          className="pagination"
          defaultCurrent={1}
          current={currentPage + 1}
          total={total * 10}
          defaultPageSize={10}
          showSizeChanger={false}
          pageSize={10}
          onChange={(page) => setCurrentPage(page - 1)}
        />
      </S.ExhibitionsCustom>
    </>
  );
};
export default ExhibitionCustom;

const Logo = styled.div`
  font-size: 5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.blue.main};
  margin-bottom: 30px;
  cursor: pointer;
`;

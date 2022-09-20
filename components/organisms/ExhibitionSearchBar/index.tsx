import React from 'react';
import styled from '@emotion/styled';
import { Input, Image, message } from 'antd';
import DEFAULT_IMAGE from 'constants/defaultImage';
import { useState, useRef, useCallback } from 'react';
import { getErrorMessage, show, hide } from 'utils';
import { useDebounce } from 'hooks';
import { reviewAPI } from 'apis';

interface ExhibitionSearchBarProps {
  query: {
    name?: string;
    thumbnail?: string;
  };
}

interface SearchResult {
  exhibitionId: number;
  name: string;
  thumbnail: string;
}

const ExhibitionSearchBar = ({ query }: ExhibitionSearchBarProps) => {
  const [searchWord, setSearchWord] = useState('');
  const [exhibitionName, setExhibitionName] = useState((query.name as string) || '');
  const [posterImage, setPosterImage] = useState(
    query.thumbnail || DEFAULT_IMAGE.EXHIBITION_THUMBNAIL,
  );
  const [searchResults, setSearchResults] = useState<SearchResult[]>(); //
  const resultList = useRef<HTMLUListElement>(null);

  const handleSearch = useCallback(async () => {
    const isEmpty = !/\S/.test(searchWord);
    if (isEmpty) {
      setSearchResults([]);
      return;
    }
    try {
      const { data } = await reviewAPI.searchExhibition(searchWord);
      const { exhibitions } = data.data;
      setSearchResults([...exhibitions]);
      resultList.current && show(resultList.current);
      !exhibitions.length && message.warning('검색 결과가 없습니다.');
    } catch (error) {
      message.error(getErrorMessage(error));
      console.error(error);
    }
  }, [searchWord]);
  useDebounce(handleSearch, 500, searchWord);

  return (
    <SearchContainer>
      <InnerContainer>
        <SearchBar
          placeholder="전시회 제목을 검색해 주세요"
          value={exhibitionName || searchWord}
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
          onFocus={() => {
            setExhibitionName('');
            resultList.current && show(resultList.current);
          }}
        />
        <ResultList ref={resultList}>
          {searchResults?.map(({ exhibitionId, name, thumbnail }) => (
            <ResultItem
              key={exhibitionId}
              onClick={() => {
                // submitData.current['exhibitionId'] = exhibitionId;
                setPosterImage(thumbnail);
                setExhibitionName(name);
                resultList.current && hide(resultList.current);
              }}
            >
              {name}
            </ResultItem>
          ))}
        </ResultList>
      </InnerContainer>
      <Poster
        src={posterImage}
        alt="전시회 포스터 이미지"
        preview={posterImage !== DEFAULT_IMAGE.EXHIBITION_THUMBNAIL}
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 200px;
  margin-right: 20px;
`;

const SearchBar = styled(Input.Search)`
  font-size: 1.6rem;
  position: relative;
  z-index: 1;

  .ant-input {
    height: 36px;
  }

  .ant-input-search-button {
    height: 36px;
  }
`;

const ResultList = styled.ul`
  width: 100%;
  max-height: 168px;
  border: 1px solid ${({ theme }) => theme.color.border.light};
  position: relative;
  top: -2px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.color.white};
`;

const ResultItem = styled.li`
  font-size: 1.6rem;
  cursor: pointer;
  margin: 8px;
`;

const Poster = styled(Image)`
  width: 150px;
  height: 200px;
  flex-shrink: 0;
`;

export default React.memo(ExhibitionSearchBar);

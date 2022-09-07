import styled from '@emotion/styled';
import { Tabs, Image, Spin, Pagination } from 'antd';
import { ReviewCard, ExhibitionCard, SideNavigation } from 'components/molecules';
import { userAPI } from 'apis';
import { CSSProperties, useEffect, useState } from 'react';
import { ReviewCardProps, ExhibitionProps } from 'types/model';
import { useRouter } from 'next/router';
import useSWR from 'swr';

interface UserActivity<T> {
  payload: T[];
  currentPage: number;
  pageSize: number;
  totalSize: number;
}

const initialReview = {
  payload: [],
  currentPage: 1,
  pageSize: 4,
  totalSize: 0,
};

const initialExhibition = {
  payload: [],
  currentPage: 1,
  pageSize: 8,
  totalSize: 0,
};

const UserPage = () => {
  const { id } = useRouter().query;
  const { data: userInfo } = useSWR(`api/v1/users/${id}/info`);
  const [myReview, setMyReview] = useState<UserActivity<ReviewCardProps>>(initialReview);
  const [likedReview, setLikedReview] = useState<UserActivity<ReviewCardProps>>(initialReview);
  const [likedExhibition, setLikedExhibition] =
    useState<UserActivity<Required<ExhibitionProps>>>(initialExhibition);

  useEffect(() => {
    userInfo && handleTabClick('MY_REVIEW');
  }, [userInfo]);

  const handleTabClick = (tabName: string) => {
    switch (tabName) {
      case 'MY_REVIEW': {
        handleMyReviewChange(myReview.currentPage);
        return;
      }
      case 'LIKED_REVIEW': {
        handleLikedReviewChange(likedReview.currentPage);
        return;
      }
      case 'LIKED_EXHIBITION': {
        handleLikedExhibitionChange(likedExhibition.currentPage);
        return;
      }
      default:
        console.error('Invalid key');
    }
  };

  const handleMyReviewChange = async (page: number) => {
    if (userInfo) {
      const { data } = await userAPI.getMyReview(userInfo.userId, page - 1, myReview.pageSize);

      setMyReview({
        ...myReview,
        payload: data.data.content,
        currentPage: page,
      });
    }
  };

  const handleLikedReviewChange = async (page: number) => {
    if (userInfo) {
      const { data } = await userAPI.getLikedReview(userInfo.userId, page - 1, myReview.pageSize);

      setLikedReview({
        ...likedReview,
        payload: data.data.content,
        currentPage: page,
      });
    }
  };

  const handleLikedExhibitionChange = async (page: number) => {
    if (userInfo) {
      const { data } = await userAPI.getLikedExhibition(
        userInfo.userId,
        page - 1,
        likedExhibition.pageSize,
      );

      setLikedExhibition({
        ...likedExhibition,
        payload: data.data.content,
        currentPage: page,
      });
    }
  };

  if (!userInfo) {
    return <Spinner size="large" />;
  }

  const {
    userId,
    profileImage,
    nickname,
    email,
    reviewCount,
    reviewLikeCount,
    exhibitionLikeCount,
  } = userInfo;

  return (
    <PageContainer>
      <ProfileContainer>
        <ProfileImage src={profileImage} alt="프로필 이미지" />
        <UserName>{nickname}</UserName>
        <UserEmail>{email}</UserEmail>
      </ProfileContainer>
      <TabCardContainer type="card" tabPosition="top" centered onTabClick={handleTabClick}>
        <Tab tab={`작성한 후기 (${reviewCount})`} key="MY_REVIEW">
          <ReviewContainer>
            {myReview.payload?.map((review) => (
              <ReviewCard
                key={review.reviewId}
                data={review}
                thumbnail={review.exhibition.thumbnail}
              />
            ))}
          </ReviewContainer>
          <Pagination
            defaultCurrent={myReview.currentPage}
            pageSize={myReview.pageSize}
            total={reviewCount}
            onChange={handleMyReviewChange}
            hideOnSinglePage={true}
            style={paginationStyle}
          />
        </Tab>
        <Tab tab={`좋아하는 후기 (${reviewLikeCount})`} key="LIKED_REVIEW">
          <ReviewContainer>
            {likedReview ? (
              likedReview.payload.map((review) => (
                <ReviewCard
                  key={review.reviewId}
                  data={review}
                  thumbnail={review.exhibition.thumbnail}
                />
              ))
            ) : (
              <Spinner size="large" />
            )}
          </ReviewContainer>
          <Pagination
            defaultCurrent={likedReview.currentPage}
            pageSize={likedReview.pageSize}
            total={reviewLikeCount}
            onChange={handleLikedReviewChange}
            hideOnSinglePage={true}
            style={paginationStyle}
          />
        </Tab>
        <Tab tab={`좋아하는 전시회 (${exhibitionLikeCount})`} key="LIKED_EXHIBITION">
          <ExhibitionContainer>
            {likedExhibition ? (
              likedExhibition.payload.map((exhibition) => (
                <ExhibitionCard
                  key={exhibition.exhibitionId}
                  exhibitionId={exhibition.exhibitionId}
                  name={exhibition.name}
                  thumbnail={exhibition.thumbnail}
                  startDate={exhibition.startDate}
                  endDate={exhibition.endDate}
                  likeCount={exhibition.likeCount}
                  reviewCount={exhibition.reviewCount}
                  isLiked={exhibition.isLiked}
                />
              ))
            ) : (
              <Spinner size="large" />
            )}
          </ExhibitionContainer>
          <Pagination
            defaultCurrent={likedExhibition.currentPage}
            pageSize={likedExhibition.pageSize}
            total={userInfo.exhibitionLikeCount}
            hideOnSinglePage={true}
            onChange={handleLikedExhibitionChange}
            style={paginationStyle}
          />
        </Tab>
      </TabCardContainer>
      <SideNavigation
        paths={[
          {
            href: `/users/${userId}`,
            pageName: '사용자 정보',
          },
          {
            href: `/users/${userId}/edit`,
            pageName: '프로필 수정',
          },
          {
            href: `/users/${userId}/edit-password`,
            pageName: '비밀번호 변경',
          },
        ]}
      />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
`;

const ProfileContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  padding: 20px;
`;

const ProfileImage = styled(Image)`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const UserName = styled.span`
  font-size: 2.4rem;
  font-weight: 700;
`;

const UserEmail = styled.span`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.color.font.dark};
`;

const TabCardContainer = styled(Tabs)`
  margin-top: 30px;
`;

const Tab = styled(Tabs.TabPane)`
  text-align: left;
`;

const ReviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  justify-items: center;
  gap: 10px;
  padding: 0 70px 30px 70px;

  @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ExhibitionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  justify-items: center;
  gap: 10px;
  padding-bottom: 30px;

  @media screen and (max-width: ${({ theme }) => theme.breakPoint.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Spinner = styled(Spin)`
  margin-bottom: 400px;
`;

const paginationStyle: CSSProperties = {
  textAlign: 'center',
  marginBottom: '24px',
};

export default UserPage;

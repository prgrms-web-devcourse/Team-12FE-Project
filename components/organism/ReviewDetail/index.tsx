import { Button, message } from 'antd';
import { reviewAPI } from 'apis';
import { LinkButton } from 'components/atom';
import { UserInfo, ImageGroup, ReviewExhibitionInfo } from 'components/molecule';
import { InfoGroup } from 'components/organism';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';
import { ReviewSingleReadData } from 'types/apis/review';
import * as S from './style';

interface ReviewDetailProps extends Omit<ReviewSingleReadData, 'comments'> {
  onDeleteButtonClick: () => void;
}

const ReviewDetail = ({
  reviewId,
  createdAt,
  user,
  exhibition,
  date,
  title,
  isPublic,
  isEdited,
  content,
  isLiked,
  likeCount,
  commentCount,
  photos,
  onDeleteButtonClick,
}: ReviewDetailProps) => {
  const { userId, nickname, profileImage } = user;
  const isMyReview = useRecoilValue(userAtom).userId === userId;
  const [detailLikeCount, setDetailLikeCount] = useState(likeCount);
  const [isLikeDetail, setIsLikedFeed] = useState(isLiked);
  const [likeLoading, setLikeLoading] = useState(false);

  const handleLikeClick = async (reviewId: number) => {
    if (!userId) {
      message.warning('로그인 해주세요');
      return;
    }

    if (likeLoading) {
      return;
    }

    setLikeLoading(true);
    // 낙관적 업데이트
    setIsLikedFeed(!isLikeDetail);
    setDetailLikeCount(isLikeDetail ? detailLikeCount - 1 : detailLikeCount + 1);

    const { data } = await reviewAPI.likeToggle(reviewId);
    const { likeCount, isLiked } = data.data;
    setIsLikedFeed(isLiked);
    setDetailLikeCount(likeCount);

    setLikeLoading(false);
  };

  return (
    <S.ReviewDetailContainer>
      <S.ReviewDetailHeader>
        <UserInfo
          profileImage={profileImage}
          nickname={nickname}
          createdDate={createdAt}
          userId={userId}
        />
        <S.ReviewDetailTitle>
          <h1>{title}</h1>
          {isEdited && <S.ReviewDetailEdited>수정됨</S.ReviewDetailEdited>}
          {isPublic ? (
            <S.ReviewDetailPublic>전체 공개</S.ReviewDetailPublic>
          ) : (
            <S.ReviewDetailPublic>비공개</S.ReviewDetailPublic>
          )}
        </S.ReviewDetailTitle>
      </S.ReviewDetailHeader>

      <S.ReviewDetailSection>
        <S.ReviewDetailContent>
          <S.ReviewDetailContentText> {content} </S.ReviewDetailContentText>
          <ImageGroup imageSources={photos} />
        </S.ReviewDetailContent>
      </S.ReviewDetailSection>

      <S.ReviewDetailBottom>
        <ReviewExhibitionInfo exhibition={exhibition} />
        <S.ReviewDetailContentUtils>
          <InfoGroup
            isLiked={isLikeDetail}
            likeCount={detailLikeCount}
            commentCount={commentCount}
            onLikeClick={() => handleLikeClick(reviewId)}
          />

          {/* TODO: 전역 유저 로그인 상태에 따라서, 수정 / 삭제 버튼 렌더링 */}
          {isMyReview && (
            <S.ButtonGroup>
              <LinkButton href={`/reviews/${reviewId}/edit`}>수정</LinkButton>
              <Button type="text" onClick={onDeleteButtonClick}>
                삭제
              </Button>
            </S.ButtonGroup>
          )}
        </S.ReviewDetailContentUtils>
      </S.ReviewDetailBottom>
    </S.ReviewDetailContainer>
  );
};

export default ReviewDetail;

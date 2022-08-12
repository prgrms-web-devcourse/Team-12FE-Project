import Head from 'next/head';
import ReviewCard from 'components/molecule/ReviewCard';
import { exhibitionsStyle as S } from '../../../../styles/pages';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ExhibitionDetail } from 'components/organism';
import { GetServerSidePropsContext } from 'next';
import { exhibitionAPI } from 'apis';
import { ExhibitionDetailResponse } from 'types/apis/exhibition';
import Map from 'components/atoms/Map';

const ExhibitionDetailPage = ({ data }: ExhibitionDetailResponse) => {
  const router = useRouter();
  const { id } = router.query;

  const {
    exhibitionId,
    name,
    thumbnail,
    startDate,
    endDate,
    url,
    placeAddress,
    placeUrl,
    area,
    inquiry,
    genre,
    isLiked,
    description,
    lat,
    lng,
    likeCount,
    reviews,
  } = data;

  const onLikeClick = async () => {
    await exhibitionAPI.likeToggle(exhibitionId);
  };

  const onCopyClick = () => {
    navigator.clipboard.writeText(placeAddress);
  };

  return (
    <>
      <Head>
        <title>ArtZip | ExhibitionDetail</title>
      </Head>
      <S.ExhibitionPageContainer>
        <ExhibitionDetail
          exhibitionId={exhibitionId}
          name={name}
          thumbnail={thumbnail}
          startDate={startDate}
          endDate={endDate}
          url={url}
          placeAddr={placeAddress}
          placeUrl={placeUrl}
          area={area}
          fee="무료"
          inquiry={inquiry}
          genre={genre}
          isLiked={isLiked}
          likeCount={likeCount}
          onLikeClick={onLikeClick}
        ></ExhibitionDetail>
        <h3>전시 소개</h3>
        <S.DescriptionWrapper>{description}</S.DescriptionWrapper>
        <h3>위치 안내</h3>
        <S.PlaceInfo>
          장소 | {placeAddress}{' '}
          {
            <S.StyledCopyButton>
              <S.Clipboard onClick={onCopyClick}></S.Clipboard>
            </S.StyledCopyButton>
          }
        </S.PlaceInfo>
        <Map lat={lat} lng={lng} width={800} height={450} title={'지도'} address={placeAddress} />
        <h3>후기({reviews && reviews.length}개)</h3>
        {reviews && (
          <S.ReviewContainer>
            {reviews.map((review) => (
              <ReviewCard
                key={review.reviewId}
                reviewId={review.reviewId}
                thumbnail={thumbnail}
                title={review.title}
                content={review.content}
                createdAt={review.createdAt}
                likeCount={review.likeCount}
                commentCount={review.commentCount}
                photo={review.photos}
                userId={review.user.userId}
                nickname={review.user.nickname}
                profileImage={review.user.profileImage}
              ></ReviewCard>
            ))}
          </S.ReviewContainer>
        )}
        <S.ButtonContainer>
          <Link href={`/community/${exhibitionId}`}>
            <S.StyledButton type="primary">후기 모두 보기</S.StyledButton>
          </Link>
          <Link
            href={{
              pathname: `/reviews/create`,
              query: { exhibitionId: exhibitionId },
            }}
          >
            <S.StyledButton type="primary">후기 작성하기</S.StyledButton>
          </Link>
        </S.ButtonContainer>
      </S.ExhibitionPageContainer>
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  if (!context.params) {
    return;
  }

  const { id } = context.params;
  const { data } = await exhibitionAPI.getDetail(Number(id));
  return {
    props: {
      data: data.data,
    },
  };
};

export default ExhibitionDetailPage;

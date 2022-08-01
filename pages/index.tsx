import ExhibitionCard from 'components/molecule/ExhibitionCard';
import SwiperWrapper from 'components/organism/Swiper';
import SwiperContainer from 'components/organism/SwiperContainer';
import type { NextPage } from 'next';

const Home: NextPage = () => {
const ret = {
  "exhibitionId" : 1,
          "name": "번아웃증후군",
          "thumbnail": "https://www.culture.go.kr/upload/rdf/22/07/show_2022071816261910020.jpg", 
          "startDate": "2022-08-04",
          "endDate": "2022-08-10",
          "area": "SEOUL",
          "url": "http://galleryraon.com/?page_id=2472#upcoming",
          "placeUrl": "http://galleryraon.com/?page_id=2472#upcoming",
          "inquiry": "010-8425-8082",
          "fee": "무료",
  				"genre": "",
          "description": "",
          "likeCount": 5,
          "placeAddr": "서울특별시 종로구 자하문로41길 4 갤러리라온",
          "lat": 37.597625,
          "lng": 126.962292, 
          "isLiked": false,
          "reviews": [
						{
								"reviewId": 111,
								"user" : {
										"userId" : 11,
										"profileImage" : "https~",
										"nickname" : "Emily"
								},
								"title" : "번아웃증후군 전시회 다녀옴~",
								"content" : "오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~",
								"createdAt" : "2022-03-22T22:33:11",
								"isLiked" : false,
								"likeCount" : 32,
								"commentCount" : 2,
								"photos" : [
									"https~",
									"https~"
								]
						},
						{
								"reviewId": 111,
								"user" : {
										"userId" : 11,
										"profileImage" : "https~",
										"nickname" : "Emily"
								},
								"title" : "번아웃증후군 전시회 다녀옴~",
								"content" : "오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~",
								"createdAt" : "2022-03-22T22:33:11",
								"isLiked" : false,
								"likeCount" : 32,
								"commentCount" : 2,
								"photos" : [
									"https~",
									"https~"
								]
						},
						{
								"reviewId": 111,
								"user" : {
										"userId" : 11,
										"profileImage" : "https~",
										"nickname" : "Emily"
								},
								"title" : "번아웃증후군 전시회 다녀옴~",
								"content" : "오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~",
								"createdAt" : "2022-03-22T22:33:11",
								"isLiked" : false,
								"likeCount" : 32,
								"commentCount" : 2,
								"photos" : [
									"https~",
									"https~"
								]
						},
						{
								"reviewId": 111,
								"user" : {
										"userId" : 11,
										"profileImage" : "https~",
										"nickname" : "Emily"
								},
								"title" : "번아웃증후군 전시회 다녀옴~",
								"content" : "오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~",
								"createdAt" : "2022-03-22T22:33:11",
								"isLiked" : false,
								"likeCount" : 32,
								"commentCount" : 2,
								"photos" : [
									"https~",
									"https~"
								]
						}
				]
      }
  return (
	<div>
		<SwiperContainer title="다가오는 전시회" >
			<SwiperWrapper items={[
				<ExhibitionCard exhibitionId={ret.exhibitionId} name={ret.name} thumbnail={ret.thumbnail} startDate={ret.startDate} endDate={ret.endDate} likeCount={ret.likeCount} reviewCount={ret.reviews.length}/>,
					<ExhibitionCard exhibitionId={ret.exhibitionId} name={ret.name} thumbnail={ret.thumbnail} startDate={ret.startDate} endDate={ret.endDate} likeCount={ret.likeCount} reviewCount={ret.reviews.length}/>,
					<ExhibitionCard exhibitionId={ret.exhibitionId} name={ret.name} thumbnail={ret.thumbnail} startDate={ret.startDate} endDate={ret.endDate} likeCount={ret.likeCount} reviewCount={ret.reviews.length}/>,
					<ExhibitionCard exhibitionId={ret.exhibitionId} name={ret.name} thumbnail={ret.thumbnail} startDate={ret.startDate} endDate={ret.endDate} likeCount={ret.likeCount} reviewCount={ret.reviews.length}/>,
					<ExhibitionCard exhibitionId={ret.exhibitionId} name={ret.name} thumbnail={ret.thumbnail} startDate={ret.startDate} endDate={ret.endDate} likeCount={ret.likeCount} reviewCount={ret.reviews.length}/>,
					<ExhibitionCard exhibitionId={ret.exhibitionId} name={ret.name} thumbnail={ret.thumbnail} startDate={ret.startDate} endDate={ret.endDate} likeCount={ret.likeCount} reviewCount={ret.reviews.length}/>,
					<ExhibitionCard exhibitionId={ret.exhibitionId} name={ret.name} thumbnail={ret.thumbnail} startDate={ret.startDate} endDate={ret.endDate} likeCount={ret.likeCount} reviewCount={ret.reviews.length}/>,
					<ExhibitionCard exhibitionId={ret.exhibitionId} name={ret.name} thumbnail={ret.thumbnail} startDate={ret.startDate} endDate={ret.endDate} likeCount={ret.likeCount} reviewCount={ret.reviews.length}/>,
					<ExhibitionCard exhibitionId={ret.exhibitionId} name={ret.name} thumbnail={ret.thumbnail} startDate={ret.startDate} endDate={ret.endDate} likeCount={ret.likeCount} reviewCount={ret.reviews.length}/>
			]} />
		</SwiperContainer>
    <h3>인기 많은 전시회</h3>
	<SwiperWrapper items={[
			  <ExhibitionCard exhibitionId={ret.exhibitionId} name={ret.name} thumbnail={ret.thumbnail} startDate={ret.startDate} endDate={ret.endDate} likeCount={ret.likeCount} reviewCount={ret.reviews.length}/>,
			    <ExhibitionCard exhibitionId={ret.exhibitionId} name={ret.name} thumbnail={ret.thumbnail} startDate={ret.startDate} endDate={ret.endDate} likeCount={ret.likeCount} reviewCount={ret.reviews.length}/>,
				<ExhibitionCard exhibitionId={ret.exhibitionId} name={ret.name} thumbnail={ret.thumbnail} startDate={ret.startDate} endDate={ret.endDate} likeCount={ret.likeCount} reviewCount={ret.reviews.length}/>,
				<ExhibitionCard exhibitionId={ret.exhibitionId} name={ret.name} thumbnail={ret.thumbnail} startDate={ret.startDate} endDate={ret.endDate} likeCount={ret.likeCount} reviewCount={ret.reviews.length}/>,
			    <ExhibitionCard exhibitionId={ret.exhibitionId} name={ret.name} thumbnail={ret.thumbnail} startDate={ret.startDate} endDate={ret.endDate} likeCount={ret.likeCount} reviewCount={ret.reviews.length}/>,
				<ExhibitionCard exhibitionId={ret.exhibitionId} name={ret.name} thumbnail={ret.thumbnail} startDate={ret.startDate} endDate={ret.endDate} likeCount={ret.likeCount} reviewCount={ret.reviews.length}/>,
				<ExhibitionCard exhibitionId={ret.exhibitionId} name={ret.name} thumbnail={ret.thumbnail} startDate={ret.startDate} endDate={ret.endDate} likeCount={ret.likeCount} reviewCount={ret.reviews.length}/>,
			    <ExhibitionCard exhibitionId={ret.exhibitionId} name={ret.name} thumbnail={ret.thumbnail} startDate={ret.startDate} endDate={ret.endDate} likeCount={ret.likeCount} reviewCount={ret.reviews.length}/>,
				<ExhibitionCard exhibitionId={ret.exhibitionId} name={ret.name} thumbnail={ret.thumbnail} startDate={ret.startDate} endDate={ret.endDate} likeCount={ret.likeCount} reviewCount={ret.reviews.length}/>
		]} />
	</div>
  );
};

export default Home;

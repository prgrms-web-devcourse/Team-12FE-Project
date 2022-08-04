import { Content } from './../../../components/molecule/ReviewCard/style';
import { rest } from 'msw';

//  기준 데이터 : 43번 리뷰 (코멘트 갯수가 안맞을 지도)

const COMMENTS = {
  data: {
    content: [
      {
        commentId: 0,
        content: '꼭 가고 싶네요. 근데 시간이 될지ㅠㅠ',
        createdAt: '2022-07-26T11:26:24',
        updatedAt: '2022-07-26T11:28:49',
        isEdited: true,
        isDeleted: false,
        user: {
          userId: 0,
          nickname: '미스터공공',
          profileImage: 'https://i.pravatar.cc/300?1​',
        },
        children: [
          {
            commentId: 1,
            content: '같이 가용~',
            createdAt: '2022-07-26T11:26:24',
            updatedAt: null,
            isEdited: false,
            isDeleted: false,
            user: {
              userId: 1,
              nickname: '그린',
              profileImage: 'https://i.pravatar.cc/300?​2',
            },
          },
        ],
      },
    ],
    numberOfElements: 2, //content의 요소가 몇개인지
    offset: 0, // 현재 페이지에서 시작하는 요소의 index 번호
    pageNumber: 0, //페이지 넘버
    pageSize: 20, //페이지 사이즈
    totalElements: 2, // 전체 요소 수
    totalPages: 1, //전체 페이지 수
  },
};

const ReviewHandlers = [
  // 후기의 댓글 조회
  rest.get(
    `${process.env.MOCKING_API_END_POINT}api/v1/reviews/:reviewId/comments`,
    (req, res, ctx) => {
      // 43번 기준이므로 무조건 43
      // const { reviewId } = req.params;
      const page = req.url.searchParams.get('page');
      const size = req.url.searchParams.get('size');

      const single_review_success = {
        message: '후기 단건 성공',
        code: 200,
        data: {
          ...COMMENTS,
        },
      };
      return res(ctx.json(single_review_success));
    },
  ),
  // 댓글 삭제
  rest.delete(`${process.env.MOCKING_API_END_POINT}api/v1/comments/:commentId`, (req, res, ctx) => {
    const { commentId } = req.params;

    const COMMENTS_DELETED = COMMENTS.data.content.filter(
      (comment) => Number(commentId) !== comment.commentId,
    );

    COMMENTS.data.content = COMMENTS_DELETED;
    const DELETE_COMMENT_SUCCESS = {
      message: '댓글 삭제 성공',
      code: 200,
      data: {
        commentId: commentId,
        createdAt: '2022-07-26T11:26:24',
        isDeleted: true,
      },
    };
    return res(ctx.json(DELETE_COMMENT_SUCCESS));
  }),

  // 댓글 수정
  rest.patch(
    `${process.env.MOCKING_API_END_POINT}api/v1/comments/:commentId`,
    async (req, res, ctx) => {
      const { commentId } = req.params;
      const UPDATE_CONTENT = await req.json();

      // 값 수정
      const targetIndex = COMMENTS.data.content.findIndex(
        (comment) => comment.commentId === Number(commentId),
      );

      COMMENTS.data.content[targetIndex].content = UPDATE_CONTENT;

      const DELETE_COMMENT_SUCCESS = {
        message: '댓글 삭제 성공',
        code: 200,
        data: {
          ...COMMENTS.data.content[targetIndex],
        },
      };
      return res(ctx.json(DELETE_COMMENT_SUCCESS));
    },
  ),
  // 리뷰에 댓글 생성
  rest.post(
    `${process.env.MOCKING_API_END_POINT}api/v1/reviews/:reviewId/comments`,
    async (req, res, ctx) => {
      const commentId = COMMENTS.data.content.length + 3;
      const { content, parentId } = await req.json();

      // parentId가 없는 경우
      if (parentId) {
        const parentIndex = COMMENTS.data.content.findIndex(
          (comment) => comment.commentId.toString() === parentId,
        );

        COMMENTS.data.content[parentIndex].children.push({
          commentId: commentId,
          content: content,
          createdAt: '2022-07-26T11:26:24',
          updatedAt: null,
          isEdited: false,
          isDeleted: false,
          user: {
            userId: 1,
            nickname: '그린',
            profileImage: 'https://i.pravatar.cc/300?​2',
          },
        });
      } else {
        COMMENTS.data.content.push({
          commentId: 0,
          content: content,
          createdAt: '2022-07-26T11:26:24',
          updatedAt: '2022-07-26T11:28:49',
          isEdited: true,
          isDeleted: false,
          user: {
            userId: 0,
            nickname: '미스터공공',
            profileImage: 'https://i.pravatar.cc/300?1',
          },
          children: [],
        });
      }
      // parentId가 있는 경우
      return res(
        ctx.delay(100),
        ctx.status(200),
        ctx.json({
          message: '댓글 생성 성공',
          code: 201,
          data: {
            reviewId: Math.floor(Math.random() * 101),
          },
        }),
      );
    },
  ),
];

export default ReviewHandlers;
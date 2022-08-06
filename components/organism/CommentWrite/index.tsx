import styled from '@emotion/styled';
import { Input, Button } from 'antd';
import { UserAvatar, NotLoginAvatar } from 'components/atom';
import { useRef, useState } from 'react';
import { UserProps } from 'types/model';
import { useClickAway } from 'hooks';

const CommentWrite = ({ user }: { user: UserProps | null | undefined }) => {
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState('');
  const commentContainerRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCancel = () => {
    setComment('');
    setShow(false);
  };

  const clickAwayHandler = () => {
    setShow(false);
  };

  useClickAway(commentContainerRef, clickAwayHandler);

  const handleOnClick = () => {
    // TODO: 댓글 작성 api 호출하는 로직
    console.log('댓글 작성 api 호출');
    console.log('보낼 content', comment);
    setShow(false);
    setComment('');
  };

  {
    return !user ? (
      <CommentWriteContainer>
        <NotLoginAvatar size={36} />
        <CommentInput placeholder="로그인해야 댓글을 작성할 수 있습니다." disabled />
      </CommentWriteContainer>
    ) : (
      <CommentWriteWrapper ref={commentContainerRef}>
        <CommentWriteContainer>
          <UserAvatar userId={user.userId} profileImage={user.profileImage} />
          <CommentInput
            value={comment}
            placeholder="댓글을 작성하세요."
            onClick={() => setShow(true)}
            onChange={handleChange}
          />
        </CommentWriteContainer>
        {show && (
          <CommentWriteUtilContainer>
            <CancelButton type="text" onClick={handleCancel}>
              취소
            </CancelButton>
            <CommentButton
              disabled={comment.length <= 0}
              type="primary"
              onClick={() => handleOnClick()}
            >
              댓글
            </CommentButton>
          </CommentWriteUtilContainer>
        )}
      </CommentWriteWrapper>
    );
  }
};

const CommentWriteContainer = styled.div`
  display: flex;
`;

const CommentWriteWrapper = styled.div``;

const CommentWriteUtilContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
`;

const CommentButton = styled(Button)`
  background-color: ${({ theme }) => theme.color.blue.main};
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.color.blue.dark};
  }
`;
const CancelButton = styled(Button)`
  margin-right: 10px;
`;

const CommentInput = styled(Input)``;

export default CommentWrite;

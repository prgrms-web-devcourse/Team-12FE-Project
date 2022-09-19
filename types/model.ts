import { ReviewSingleReadData } from './apis/review/index';
import { CSSProperties } from 'react';

export interface ExhibitionProps {
  exhibitionId: number;
  name: string;
  thumbnail: string;
  startDate?: string;
  endDate?: string;
  likeCount?: number;
  reviewCount?: number;
  isLiked?: boolean;
}

export interface ReviewFeedProps {
  feed: ReviewSingleReadData;
  isMyFeed: boolean;
  onDeleteButtonClick: () => void;
}

export interface ReviewProps {
  reviewId: number;
  name: string;
  thumbnail: string;
  likeCount: number;
  isPublic: boolean;
  commentCount: number;
  isLiked: boolean;
  title: string;
  content: string;
  photos: PhotoProps[] | null;
  createdAt: string;
  user: UserProps;
}

export interface ReviewCardProps {
  reviewId: number;
  user: UserProps;
  exhibition: ExhibitionProps;
  date: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isEdited: boolean;
  isLiked: boolean;
  isPublic: boolean;
  likeCount: number;
  commentCount: number;
  photos: PhotoProps[];
}

export interface CommentProps {
  commentId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  isEdited: boolean;
  isDeleted: boolean;
  user: UserProps;
  likeCount: number;
  isLiked: boolean;
  childrenCount?: number; // 대 댓글이 아닐때만
}

export interface UserProps {
  userId: number;
  nickname: string;
  profileImage: string;
}

export interface PhotoProps {
  photoId: number;
  path: string;
}

export interface UserAtomProps {
  userId: number | null;
  email: string | null;
  nicknamae: string | null;
  profileImage: string | null;
}

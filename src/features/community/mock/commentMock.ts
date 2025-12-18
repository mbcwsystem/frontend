export type PostType = 'notice' | 'freeboard';

export interface Comment {
  id: number;
  post_id: number;
  post_type: PostType;
  author_id: number;
  author_name: string;
  author_position: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const commentMockList: Comment[] = [
  {
    id: 1,
    post_id: 3,
    post_type: 'notice',
    author_id: 1,
    author_name: '하늘',
    author_position: '점장',
    content: '좋은 글이네요!',
    created_at: '2025-12-18T16:30:00.000Z',
    updated_at: '2025-12-18T16:30:00.000Z',
  },
  {
    id: 2,
    post_id: 3,
    post_type: 'freeboard',
    author_id: 2,
    author_name: '익명',
    author_position: '알바',
    content: '공감하고 갑니다.',
    created_at: '2025-12-18T16:40:00.000Z',
    updated_at: '2025-12-18T16:40:00.000Z',
  },
];

type CommentType = {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
    image: string;
    name: string;
  };
};

type PostType = {
  id: string;
  authorId: string;
  content: string;
  image: string;
  fileKey: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    image: string;
    username: string;
  };
  comments: CommentType[];
  likes: { userId: string }[];
  _count: { likes: number; comments: number };
};

export type { PostType };

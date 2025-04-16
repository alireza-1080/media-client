type UserPlusStatsType = {
  id: string;
  email: string;
  clerkId: string;
  username: string;
  name: string;
  image: string;
  bio: string | null;
  location: string | null;
  website: string | null;
  createdAt: string;
  updatedAt: string;
  _count: {
    followers: number;
    followings: number;
    posts: number;
  };
};

export type { UserPlusStatsType };

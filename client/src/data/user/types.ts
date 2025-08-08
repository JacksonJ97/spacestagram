export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  likedPosts: string[];
};

export type CreateUserInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

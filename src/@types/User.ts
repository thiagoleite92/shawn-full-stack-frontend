export type UserListType = {
  list: Array<UserType>;
  nextLink: string;
};

export type UserType = {
  login: string;
  id: 1;
  avatar_url: string;
};

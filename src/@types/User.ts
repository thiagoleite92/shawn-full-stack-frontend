export type UserListType = {
  list: Array<UserType>;
  sinceId: string;
};

export type UserType = {
  login: string;
  id: number;
  avatar_url: string;
};

export type UserDetailsType = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string;
  location: string;
  email: string | null;
  hireable: boolean;
  bio: string;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
};

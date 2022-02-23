declare namespace USER {
  type User = {
    id: number;
    name: string;
  };
  type LoginParams = {
    username: string;
    password: string;
  };
  type Response = {
    user: User;
    access_token: string;
  };
}

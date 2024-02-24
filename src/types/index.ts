export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IServerResponse<T> {
  result: T | null;
  error: string | null;
}

export interface IUserLogin {
  email: string;
  password: string;
}

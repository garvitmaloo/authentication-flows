export type UserLoginDetails = {
  email: string;
  password: string;
};

export type UserSignupDetails = {
  email: string;
  password: string;
  imageUrl?: string;
};

export type StandardResponse<T> = {
  error: string | null;
  result: T | null;
};

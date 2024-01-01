export interface CreateUserRequestBody {
  username: string;
  email: string;
  password: string;
}
export interface CreateUserResponse {
  user: {
    id: number;
    username: string;
    email: string;
  };
  token: string;
}

export interface LoginUserRequestBody {
  username: string;
  password: string;
}
export interface LoginUserResponse {
  user: {
    id: number;
    username: string;
    email: string;
  };
  token: string;
}

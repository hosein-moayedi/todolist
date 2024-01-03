export type Tokens = {access: string; refresh: string; expiry: number};
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
  tokens: Tokens;
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
  tokens: Tokens;
}

export interface RefreshTokenRequestBody {
  refreshToken: string;
}
export interface RefreshTokenResponse {
  tokens: Tokens;
}

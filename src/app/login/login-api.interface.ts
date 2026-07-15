export interface LoginSuccessResponse {
  message: string;
  user: UserResponse;
  token: string;
}
export interface UserResponse {
  name: string;
  email: string;
  role: string;
}

export interface LoginFailureResponse {
  statusMsg: string;
  message: string;
}



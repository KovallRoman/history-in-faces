export interface UserResponseModel {
  id?: string;
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
  accessToken?: string;
}

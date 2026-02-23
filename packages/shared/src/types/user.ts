export interface IUser {
  id: string;
  email: string;
  username: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface ICreateUserDto {
  email: string;
  username: string;
}

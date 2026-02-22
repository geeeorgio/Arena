export interface User {
  id: number;
  email: string;
  username: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface CreateUserDto {
  email: string;
  username: string;
  password?: string;
}

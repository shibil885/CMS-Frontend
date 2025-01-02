import { UserType } from '../enum/userType.enum';

export interface IUser {
  _id: string
  username: string;
  email: string;
  password: string;
  role: UserType;
  isVerified: boolean;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date; 
}

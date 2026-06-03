import { _items, _meta } from './devices.interface';
export interface _user {
  email: string;
  password: string;
  role?: 'ADMIN' | 'TECHNICIAN';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: [
    {
      field: string;
      message: string;
    },
  ];
}

export interface _RegisterData {
  id: string;
  email: string;
  role: 'ADMIN' | 'TECHNICIAN';
  createdAt?: string;
}
export interface _LoginData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
export interface _profileData extends _RegisterData {
  createdAt: string;
}
export interface _getUserData {
  items: _profileData[];
  meta: _meta;
}
export interface _ErrorAuth {
  success: boolean;
  errors?: [
    {
      field: string;
      message: string;
    },
  ];
  error?: string;
}
export interface _AccessToken {
  exp: number;
  iat: number;
  role: 'ADMIN' | 'TECHNICIAN';
  sub: string;
  type: string;
}
export interface logoutData {
  loggedOut: string;
}

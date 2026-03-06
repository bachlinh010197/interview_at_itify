export interface User {
  id: number;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

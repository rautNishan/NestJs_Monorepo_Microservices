export interface IAuthenticatedUser {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

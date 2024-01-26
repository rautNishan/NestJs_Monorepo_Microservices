import { ApiParamOptions } from '@nestjs/swagger';

export interface IDocOptions {
  summary?: string;
  description?: string;
  deprecated?: boolean;
  operation?: string;
}

export interface IDocRequestOptions {
  params?: ApiParamOptions[];
  query?: ApiParamOptions[];
}

export interface IDocAuthOptions {
  jwtAccessToken?: boolean;
  jwtRefreshToken?: boolean;
}

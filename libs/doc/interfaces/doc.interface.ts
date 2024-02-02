import { ApiParamOptions, ApiQueryOptions } from '@nestjs/swagger';

export interface IDocOptions {
  summary?: string;
  description?: string;
  deprecated?: boolean;
  operation?: string;
}

export interface IDocRequestOptions {
  params?: ApiParamOptions[];
  queries?: ApiQueryOptions[];
}

export interface IDocAuthOptions {
  jwtAccessToken?: boolean;
  jwtRefreshToken?: boolean;
}

import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  secret: process.env.SECRET_KEY,
}));

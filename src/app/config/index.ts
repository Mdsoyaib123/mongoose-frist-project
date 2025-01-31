import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV:process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_pass: process.env.DEFAULT_PASS,
  bcrypt_saltRound:process.env.BCRYPT_SALTROUND,
  jwt_access_token:process.env.jWT_ACCESS_SECRET,
  jwt_refresh_token:process.env.JWT_REFRESH_SECRET
};

import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export default {
  server: {
    port: process.env.PORT || 4000,
  },
  db: {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: process.env.DATABASE_PORT || 5432,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: process.env.DATABASE_DIALECT || 'postgres',
  },
  jwt: {
    secret: process.env.JWT_SECRET || '$u2kD6L8BXMjNRkg2RZ[Qbb5ze*d`HAV',
    expiresIn: {
      token: process.env.JWT_EXPIRE_TOKEN || '1h',
      refreshToken: process.env.JWT_EXPIRE_REFRESH_TOKEN || '30 days',
    },
  },
};

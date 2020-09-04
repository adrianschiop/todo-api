import dotenv from 'dotenv';

dotenv.config();

// Database Settings
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'todo';
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'todo';
export const DATABASE_NAME = process.env.DATABASE_NAME || 'todoapp';

// JWT Secret
export const jwtSecret = process.env.JWT_SECRET || '$u2kD6L8BXMjNRkg2RZ[Qbb5ze*d`HAV';

export const port = process.env.PORT || 4000;

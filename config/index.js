import dotenv from 'dotenv';

dotenv.config();

// Database Settings
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'todo';
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'todo';
export const DATABASE_NAME = process.env.DATABASE_NAME || 'todoapp';

export const port = process.env.PORT || 4000;

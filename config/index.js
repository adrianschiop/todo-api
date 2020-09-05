import dotenv from "dotenv";

dotenv.config();

// Database Settings
// @Feedback: I can't see any of these DATABASE variables used in any import from other files. Seems redundant.
// It is great to follow the same naming convention for variables of same type. Either go CAPS for all of them or camelCase for all of them.
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME || "todo";
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "todo";
export const DATABASE_NAME = process.env.DATABASE_NAME || "todoapp";

// JWT Secret
export const jwtSecret =
  process.env.JWT_SECRET || "$u2kD6L8BXMjNRkg2RZ[Qbb5ze*d`HAV";

export const port = process.env.PORT || 4000;

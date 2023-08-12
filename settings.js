import dotenv from "dotenv";

dotenv.config();

const { env } = process;

export const { API_URL } = env;

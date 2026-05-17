// lib/db.ts

import { Pool } from "pg";

export const poolInstance =
  new Pool({
    connectionString:
      process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

export async function query(
  text: string,
  params?: any[]
) {
  return poolInstance.query(
    text,
    params
  );
}

export async function getClient() {
  return poolInstance.connect();
}
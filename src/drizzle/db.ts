// import "dotenv/config"
// import { Client } from "pg"
// import {drizzle} from "drizzle-orm/node-postgres";
// import * as schema from "./schema"


// export const client = new Client({
//     connectionString: process.env.DATABASE_URL as string
// });

// const main = async () =>{
//     await client.connect(); //connect to the database   
// }

// main().catch(console.error)

// const db = drizzle(client,{schema, logger:true});
// export default db;


import "dotenv/config";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

// ✅ Create a PostgreSQL connection pool (recommended for Neon)
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
  ssl: {
    rejectUnauthorized: false, // Important for Neon
  },
});

// ✅ Optional: Log when a new connection is made (for debugging)
pool.on("connect", () => {
  console.log("🟢 Connected to Neon DB pool");
});

// ✅ Set up Drizzle with the pool
const db = drizzle(pool, {
  schema,
  logger: true,
});

export default db;

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.BETTER_AUTH_MONGO_DB_URL)
const db = client.db('bazar-dor');


export const auth = betterAuth({
      emailAndPassword: { 
    enabled: true, 
  },
    database: mongodbAdapter(db,{
      client
    }),
});
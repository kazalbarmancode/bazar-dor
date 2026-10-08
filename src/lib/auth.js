import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "@/db"; // your mongodb client

export const auth = betterAuth({
      emailAndPassword: { 
    enabled: true, 
  },
    database: mongodbAdapter(client.db(), { client }),
});
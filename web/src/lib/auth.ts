import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";
import db from "@/lib/db";

const { AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET } = process.env;

if (!AUTH_GOOGLE_ID || !AUTH_GOOGLE_SECRET) {
  throw new Error("AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET must be set");
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  appName: "socialstack",
  plugins: [nextCookies()],
  user: {
    deleteUser: {
      enabled: true,
      beforeDelete: async (user, request) => {
        // TODO: Delete stripe customer and subscription
        console.log(`User, ${user.id}, is being deleted`);
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: AUTH_GOOGLE_ID,
      clientSecret: AUTH_GOOGLE_SECRET,
    },
  },
});

/**
 * Gets the session user using better-auth api.
 * @param headers
 * @returns {} Returns user object if logged in otherwise null
 */
export async function getSessionUser(headers: Headers) {
  const results = await auth.api.getSession({ headers });

  if (!results || !results.user) return null;

  return results.user;
}

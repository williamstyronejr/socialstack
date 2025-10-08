import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const { signIn, signUp, useSession, signOut, $ERROR_CODES, deleteUser } =
  createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    plugins: [inferAdditionalFields<typeof auth>()],
  });

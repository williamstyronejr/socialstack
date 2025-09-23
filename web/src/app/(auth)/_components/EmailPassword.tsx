"use client";

import { useState } from "react";
import { signIn, $ERROR_CODES } from "@/lib/auth-client";

export default function EmailPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div className="">
        <label htmlFor="email">
          <span className="text-sm text-black font-medium block pb-1">
            Email
          </span>

          <input
            id="email"
            name="email"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div className="py-4">
        <label htmlFor="password">
          <span className="text-sm text-black font-medium block pb-1">
            Password
          </span>

          <input
            id="password"
            name="password"
            type="password"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button
        className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 w-full cursor-pointer"
        type="button"
        onClick={async () => {
          const { error } = await signIn.email({
            email: email,
            password: password,
            callbackURL: "/dashboard",
            rememberMe: true,
          });
          
          if (error) {
            switch (error.code) {
              case 'INVALID_EMAIL':
                console.log("Invalid email");
                break;
              default:
                console.log(error);
            }
          }
        }}
      >
        Sign In
      </button>
    </div>
  );
}

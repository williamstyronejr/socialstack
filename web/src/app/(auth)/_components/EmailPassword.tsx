"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import Loading from "@/components/Loading";

export default function EmailPassword({ type = "signin" }: { type?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
    name: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div className="pb-2">
        <span className="text-red-500 text-md text-center block pb-1">
          {error.general}
        </span>
        <label htmlFor="email">
          <span className="text-sm text-black font-medium block pb-1">
            Email
          </span>

          <input
            id="email"
            name="email"
            className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error.email ? "border-red-500" : ""
            }`}
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <span className="text-red-500 text-sm">{error.email}</span>
        </label>
      </div>

      <div className="pb-2">
        <label htmlFor="password">
          <span className="text-sm text-black font-medium block pb-1">
            Password
          </span>

          <input
            id="password"
            name="password"
            type="password"
            className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error.password ? "border-red-500" : ""
            }`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span className="text-red-500 text-sm">{error.password}</span>
        </label>
      </div>

      {type === "signup" ? (
        <div className="pb-2">
          <label htmlFor="Name">
            <span className="text-sm text-black font-medium block pb-1">
              Name
            </span>

            <input
              id="name"
              name="name"
              type="text"
              className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error.name ? "border-red-500" : ""
              }`}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <span className="text-red-500 text-sm">{error.name}</span>
          </label>
        </div>
      ) : null}

      <button
        className="flex flex-row gap-2 relative items-center justify-center bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 w-full cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        type="button"
        disabled={loading}
        onClick={async () => {
          // Better Auth accepts empty name for signup, so we need to check if the name is empty and the type is signup
          if (name === "" && type === "signup") {
            return setError({
              name: "Name is required",
              email: "",
              password: "",
              general: "",
            });
          }

          setLoading(true);
          setError({
            email: "",
            password: "",
            name: "",
            general: "",
          });

          const { error } =
            type === "signin"
              ? await signIn.email({
                  email: email,
                  password: password,
                  callbackURL: "/dashboard",
                  rememberMe: true,
                })
              : await signUp.email({
                  email: email,
                  password: password,
                  name: name,
                  callbackURL: "/dashboard",
                });

          console.log(error);

          if (error) {
            switch (error.code) {
              case "INVALID_EMAIL":
                setError({
                  email: "Invalid email",
                  password: "",
                  name: "",
                  general: "",
                });
                break;
              case "INVALID_EMAIL_OR_PASSWORD":
                setError({
                  email: "",
                  password: "",
                  name: "",
                  general: "Invalid email or password",
                });
                break;
              case "INVALID_PASSWORD":
                setError({
                  name: "",
                  email: "",
                  password: "Invalid password",
                  general: "",
                });
                break;
              case "PASSWORD_TOO_SHORT":
                setError({
                  name: "",
                  email: "",
                  password: "Password must be at least 8 characters long",
                  general: "",
                });
                break;
              case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
                setError({
                  name: "",
                  email: "Email is already in use",
                  password: "",
                  general: "",
                });
                break;
              default:
                setError({
                  name: "",
                  email: "",
                  password: "",
                  general: "An error occurred, please try again",
                });
            }
          }
          setLoading(false);
        }}
      >
        {loading ? (
          <Loading className="w-6 h-6 stroke-white animate-spin absolute left-6 top-1/2 -translate-y-1/2" />
        ) : null}
        {type === "signin" ? "Sign In" : "Sign Up"}
      </button>
    </div>
  );
}

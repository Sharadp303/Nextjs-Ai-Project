"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactFormState } from "react-dom/client";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      console.log(res?.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      <h1>Login</h1>
    <form onSubmit={handleSubmit}>
    <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-lg p-0.5 "
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-lg p-0.5 "
        />
    </form>
    <div>
        Don't have an account ? <button onClick={()=>router.push("/register")}> Resister</button>
    </div>
    <button type="submit" className="border rounded-full w-fit p-2">Login</button>

   
    </div>
  );
}

export default LoginPage;

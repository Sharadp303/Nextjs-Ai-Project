"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
        //react-query
      const res = await fetch("api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = res.json();

      if (!res.ok) {
        throw new Error("Registration Failed");
      }

      console.log(data);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-amber-500/20 p-8 relative">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-4">
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
        <input
          type="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border rounded-lg p-0.5"
        />
        <button type="submit" className="border rounded-full w-fit p-2">Register</button>
      </form>
      <div>
        <p>
          Already have an account <a href="/login" className="text-blue-600 hover:text-base">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

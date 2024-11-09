"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChefHat } from "lucide-react";
import Link from "next/link";
// import { redirect } from "next/navigation";
// import { useState } from "react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-yellow-100 flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <ChefHat className="h-12 w-12 text-orange-500 mr-2" />
          <h1 className="text-4xl font-bold text-orange-800">RecipeMaster</h1>
        </div>
        <p className="text-lg text-orange-700">
          Your personal recipe assistant
        </p>
      </header>

      <main className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Sign Up
          </h2>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                required
                autoComplete="name"
                // onChange={(event) => setFullName(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                autoComplete="email"
                // onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                required
                autoComplete="current-password"
                // onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 font-bold"
              // onClick={handleSubmit}
            >
              Sign Up
            </Button>
            {/* {error && <p className="text-red-600 text-sm ">{error}</p>} */}
          </form>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Why RecipeMaster?
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <span className="bg-orange-200 rounded-full p-1 mr-2">🍳</span>
              Personalized recipe suggestions
            </li>
            <li className="flex items-center">
              <span className="bg-orange-200 rounded-full p-1 mr-2">📅</span>
              Meal planning made easy
            </li>
          </ul>
        </div>

        <p className="mt-8 text-center text-gray-600">
          Already have an account?
          <Link href="/" className="text-orange-600 hover:underline">
            Sign in
          </Link>
        </p>
      </main>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} RecipeMaster. All rights reserved.
      </footer>
    </div>
  );
}

// const [fullName, setFullName] = useState("");
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");
// const [error, setError] = useState("");

// // const handleSubmit = async (event: React.FormEvent) => {
// //   event.preventDefault();
// //   try {
// //     if (!fullName || !email || !password)
// //       return setError("Please fill in all fields");

// //     const response = await fetch("/api/signup", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ fullName, email, password }),
// //     });
// //     console.log(fullName, email, password);

// //     if (response.ok) {
// //       console.log("Signup successful");
// //       console.log(response);
// //       redirect("/");
// //     } else {
// //       console.error("Signup failed");
// //     }
// //   } catch (error) {
// //     console.error("An error occurred during signup, please try again", error);
// //   }
// // };

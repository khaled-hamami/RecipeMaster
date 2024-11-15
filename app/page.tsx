import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { ChefHat } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";



export default async function Page() {
  const session = await auth();

  if (session && session.user) {
    return redirect("/recipes");
  }

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
            Login
          </h2>
          <form
            className="space-y-4"
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/recipes" });
            }}
          >
            {/* <div className="space-y-2">
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
                required
                placeholder="********"
                autoComplete="current-password"
                // onChange={(event) => setPassword(event.target.value)}
              />
            </div> */}
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 font-bold"
              // onClick={handleSubmit}
            >
              Sign In
            </Button>
            {/* {error && <p className="text-red-600 text-sm ">{error}</p>} */}
          </form>
          <div className="mt-4 text-center">
            <Link
              href="/forgotPassword"
              className="text-sm text-orange-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
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
          Dont have an account?
          <Link href="/signup" className="text-orange-600 hover:underline">
            Sign up now
          </Link>
        </p>
      </main>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} RecipeMaster. All rights reserved.
      </footer>
    </div>
  );
}

// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");
// const [error, setError] = useState("");

// const handleSubmit = async (event: React.FormEvent) => {
//   event.preventDefault();

//   try {
//     if (!email || !password) return setError("Please fill in all fields");

//     console.log(email, password);
//     const response = await fetch("/api/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     if (response.ok) {
//       //TODO set the global user state
//       redirect("/recipes");
//     } else {
//       console.error("Login failed");
//       setError("something went wrong, please try again");
//     }
//   } catch (error) {
//     console.error("An error occurred during login, please try again", error);
//     setError("an error occurred during login, please try again");
//   }

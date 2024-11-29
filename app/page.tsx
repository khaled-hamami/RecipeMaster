import { auth, signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { ChefHat } from "lucide-react"
import { redirect } from "next/navigation"

export default async function Page() {
  const session = await auth()

  // If the user is already logged in, redirect to the recipes page
  if (session && session.user) {
    return redirect("/recipes")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-yellow-200 flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <ChefHat className="h-12 w-12 text-orange-500 mr-2" />
          <h1 className="text-4xl font-bold text-orange-800">RecipeMaster</h1>
        </div>
        <p className="text-lg text-orange-700">Your personal recipe assistant</p>
      </header>

      <main className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login</h2>
          <form
            className="space-y-4"
            action={async () => {
              // new next js server action feature. only in server side rendering
              "use server"
              await signIn("google", { redirectTo: "/recipes" })
            }}
          >
            <Button
              type="submit"
              className="w-full
              bg-black font-bold flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="24px"
                height="24px"
                className="mr-2"
              >
                <path
                  fill="#4285F4"
                  d="M24 9.5c3.2 0 5.9 1.1 8.1 3.1l6-6C34.8 3.5 29.7 1 24 1 14.8 1 7.1 6.8 4 15l7 5.5C12.3 14.5 17.7 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M46.5 24c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.4 5.5-4.9 7.2l7 5.5C42.9 37.8 46.5 31.4 46.5 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M7 28.5c-1.5-2.5-2.5-5.4-2.5-8.5s1-6 2.5-8.5L0 7C-1.5 10.5-2.5 14.2-2.5 18s1 7.5 2.5 11l7-5.5z"
                />
                <path
                  fill="#EA4335"
                  d="M24 46c6.5 0 12-2.2 16.5-6l-7-5.5c-2.3 1.5-5.2 2.5-8.5 2.5-6.3 0-11.7-4.2-13.6-10L4 33.5C7.1 41.2 14.8 46 24 46z"
                />
              </svg>
              Sign In with Google
            </Button>
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
      </main>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} RecipeMaster. All rights reserved.
      </footer>
    </div>
  )
}

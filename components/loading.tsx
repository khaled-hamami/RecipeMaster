import { ChefHat } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-amber-50">
      <div className="text-center">
        <div className="inline-block animate-bounce">
          <ChefHat size={64} />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-amber-800">Recipe Master</h1>
        <p className="mt-2 text-lg text-amber-600">Cooking up something delicious...</p>
        <div className="mt-4 flex justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-full bg-amber-600 animate-pulse"
              style={{ animationDelay: `${index * 0.15}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

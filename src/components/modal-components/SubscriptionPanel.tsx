"use client"

import { Dot } from "lucide-react"
import { useAppContext } from "../../context/app-context"

export default function SubscriptionPanel() {
  const { currentPlan, handleUpgrade, handleDowngrade, getPlanDisplayName } = useAppContext()

  return (
    <div className="p-4">
      <h3 className="text-xl sm:text-2xl font-semibold mt-2">
        You are currently on the {getPlanDisplayName(currentPlan)} Plan
      </h3>
      <h3 className="text-lg sm:text-xl font-medium mt-2">Upgrade today to access more features</h3>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mt-3">
        <div>
          <div
            className={`border rounded-lg p-4 lg:h-80 ${currentPlan === "free" ? "border-gray-500 " : "border-gray-400"}`}
          >
            <h4 className="font-semibold mb-2 text-left">Present Free</h4>
            <p className="text-gray-900 text-left">$0 / Month</p>
            <ul className="text-zinc-950 font-medium mt-4">
              <li className="flex justify-start">
                <Dot /> Unlimited Events
              </li>
              <li className="flex justify-start">
                <Dot /> Unlimited Check-ins
              </li>
              <li className="flex justify-start">
                <Dot /> 1 Group
              </li>
              <li className="flex justify-start">
                <Dot /> 24 members per group
              </li>
            </ul>
          </div>
          <button
            className={`cursor-pointer border rounded-lg px-4 py-1.5 text-center mt-2 w-full ${
              currentPlan === "free" ? "border-gray-400 text-black" : "border-gray-400"
            }`}
            onClick={() => currentPlan !== "free" && handleDowngrade("free")}
            disabled={currentPlan === "free"}
          >
            {currentPlan === "free" ? "Your Plan" : "Downgrade"}
          </button>
        </div>

        <div>
          <div
            className={`border rounded-lg p-4 lg:h-80 ${currentPlan === "plus" ? "border-gray-500 " : "border-gray-400"}`}
          >
            <h4 className="font-semibold mb-2 text-left">Present Plus</h4>
            <p className="text-gray-900 text-left">$12 / Month</p>
            <ul className="text-zinc-950 font-medium mt-4">
              <li className="flex justify-start">
                <Dot /> Unlimited Events
              </li>
              <li className="flex justify-start">
                <Dot /> Unlimited Check-ins
              </li>
              <li className="flex justify-start">
                <Dot /> 5 Groups
              </li>
              <li className="flex justify-start">
                <Dot /> 100 members per group
              </li>
              <li className="flex justify-start">
                <Dot /> Export check-in data
              </li>
            </ul>
          </div>
          <button
            className={`cursor-pointer rounded-lg px-4 py-1.5 text-center mt-2 w-full transition-all ${
              currentPlan === "plus"
                ? "border border-gray-400 text-black"
                : "bg-black hover:bg-zinc-900 text-white border border-gray-400"
            }`}
            onClick={() => currentPlan !== "plus" && handleUpgrade("plus")}
            disabled={currentPlan === "plus"}
          >
            {currentPlan === "plus" ? "Your Plan" : "Upgrade"}
          </button>
        </div>

        <div>
          <div
            className={`border rounded-lg p-4 lg:h-80 ${currentPlan === "pro" ? "border-gray-500 " : "border-gray-400"}`}
          >
            <h4 className="font-semibold mb-2 text-left">Present Pro</h4>
            <p className="text-gray-900 text-left">$25 / Month</p>
            <ul className="text-zinc-950 font-medium mt-4">
              <li className="flex justify-start">
                <Dot /> Unlimited Events
              </li>
              <li className="flex justify-start">
                <Dot /> Unlimited Check-ins
              </li>
              <li className="flex justify-start">
                <Dot /> 10 Groups
              </li>
              <li className="flex justify-start">
                <Dot /> 300 members per group
              </li>
              <li className="flex justify-start">
                <Dot /> 4 account admins
              </li>
              <li className="flex justify-start">
                <Dot /> export check-in data
              </li>
              <li className="flex justify-start">
                <Dot /> export group data
              </li>
            </ul>
          </div>
          <button
            className={`cursor-pointer rounded-lg px-4 py-1.5 text-center mt-2 w-full transition-all ${
              currentPlan === "pro"
                ? "border border-gray-400 text-black"
                : "bg-black hover:bg-zinc-900 text-white border border-gray-400"
            }`}
            onClick={() => currentPlan !== "pro" && handleUpgrade("pro")}
            disabled={currentPlan === "pro"}
          >
            {currentPlan === "pro" ? "Your Plan" : "Upgrade"}
          </button>
        </div>
      </div>
    </div>
  )
}

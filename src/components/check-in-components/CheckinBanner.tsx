import { Check } from "lucide-react"
import type { CheckinBannerProps } from "../../types"



export function CheckinBanner({ type, checkInDate, checkInTime }: CheckinBannerProps) {
  if (type === "success") {
    return (
      <div className="border border-gray-300 rounded-lg p-6 mb-8 bg-white">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-6 h-6 border-2 border-black rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-black" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">You've checked-in</h2>
        </div>
        <p className="text-center text-gray-600 mb-4">Thanks for marking yourself Present</p>
        <div className="flex items-center justify-center gap-8 text-lg font-semibold text-gray-900">
          <span>{checkInDate}</span>
          <span>{checkInTime}</span>
        </div>
      </div>
    )
  }

  if (type === "unavailable") {
    return (
      <div className="border border-gray-300 rounded-lg p-6 mb-8 bg-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Check-in for this event is not available</h2>
          <p className="text-gray-600">Please check with the event organizer if this is not correct</p>
        </div>
      </div>
    )
  }

  if (type === "alreadyCheckedIn") {
    return (
      <div className="border border-gray-300 rounded-lg p-6 mb-8 bg-white">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-6 h-6 border-2 border-black rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-black" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Already checked-in</h2>
        </div>
        <p className="text-center text-gray-600 mb-4">You have already marked yourself present</p>
        <div className="flex items-center justify-center gap-8 text-lg font-semibold text-gray-900">
          <span>{checkInDate}</span>
          <span>{checkInTime}</span>
        </div>
      </div>
    )
  }

  return null
}

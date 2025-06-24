import type { StatusIndicatorsProps } from "../../types"



export function StatusIndicators({ event }: StatusIndicatorsProps) {
  return (
    <div className="space-y-6">
      {/* Event Type Status */}
      <div className="flex items-start gap-4">
        <div className="w-6 h-6  rounded flex items-center justify-center mt-0.5">
          {event.checkInType === "open" ? (
            <img className="w-5 h-5" src="/check-in-icon.png" alt="" />
          ) : (
            <img className="w-5 h-5" src="/checkin-user-icon.png" alt="" />

          )}
        </div>
        <div>
          <p className="font-semibold text-gray-900">
            {event.checkInType === "open" ? "This is an open event" : "Check-in restricted to group members"}
          </p>
          <p className="text-sm text-gray-500">
            {event.checkInType === "open" ? "Anyone can check-in" : event.description}
          </p>
        </div>
      </div>

      {/* Location Status */}
      <div className="flex items-start gap-4">
        <div className="w-6 h-6  rounded flex items-center justify-center mt-0.5">
          <img className="w-5 h-5" src="/check-in-location.png" alt="" />
        </div>
        <div>
          <p className="font-semibold text-gray-900">
            {event.requiresLocation ? "Organizer checks your location" : "No location check"}
          </p>
          <p className="text-sm text-gray-500">
            {event.requiresLocation
              ? "You must be close enough to the event to check-in"
              : "Organizer does not check your location"}
          </p>
        </div>
      </div>
    </div>
  )
}

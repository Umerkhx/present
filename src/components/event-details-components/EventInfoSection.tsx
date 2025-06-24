import { Users, MapPin } from "lucide-react"


export default function EventInfoSection({
  eventData,
  showLocation = true,
  isOpenEvent = false,
}: any) {
  return (
    <div className="rounded-lg p-6 shadow-sm space-y-4">
      <div className="flex items-start space-x-3">
        <Users className="w-5 h-5 text-gray-400 mt-0.5" />
        <div>
          <p className="font-semibold text-gray-900">
            {isOpenEvent ? "This is an open event" : "Check-in restricted to group members"}
          </p>
          <p className="text-sm text-gray-500">{isOpenEvent ? "Anyone can check-in" : eventData.description}</p>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
        <div>
          <p className="font-semibold text-gray-900">
            {showLocation ? `Location: ${eventData.location}` : "No location check"}
          </p>
          <p className="text-sm text-gray-500">
            {showLocation
              ? "Attendees must be within 1000 feet to check in"
              : "Attendees don't share their location for this event"}
          </p>
        </div>
      </div>
    </div>
  )
}

import type { EventInfoProps } from "../../types"



export function CheckinInfo({ event }: EventInfoProps) {
  return (
    <div className="space-y-8">
      {/* Event Title */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">{event.name}</h1>
        <p className="text-sm text-gray-500">Event name</p>
      </div>

      {/* Creator Info */}
      <div className="flex items-center gap-4">
        <img
          src={event.creator.avatar || "/placeholder.svg"}
          alt={event.creator.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-900">{event.creator.name}</p>
          <p className="text-sm text-gray-500">Created by</p>
        </div>
      </div>

      {/* Date and Time */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-2xl font-semibold text-gray-900">{event.date}</p>
          <p className="text-sm text-gray-500">Check-in date</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold text-gray-900">{event.timeWindow}</p>
          <p className="text-sm text-gray-500">Check-in window</p>
        </div>
      </div>
    </div>
  )
}

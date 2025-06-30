"use client"

import type React from "react"
import { useState } from "react"
import { format } from "date-fns"
import { Clock, Pencil, ChevronDown } from "lucide-react"
import type { EventData } from "../types"

interface EventDetailsProps {
  eventData: EventData
  onChange: (name: string, value: any) => void
  creator: {
    name: string
  }
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventData, onChange, creator }) => {
  const [isEditingName, setIsEditingName] = useState(!eventData.name)

  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return format(new Date(), "MMM do yyyy")
    return format(new Date(dateString), "MMM do yyyy")
  }

  const formatTimeDisplay = (time: string) => {
    if (!time) return "---:---"
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    if (isNaN(hour) || !minutes) return "---:---"
    const ampm = hour >= 12 ? "pm" : "am"
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  return (
    <div className="mb-6">
      <div className="mb-4">
        {isEditingName ? (
          <input
            type="text"
            id="eventName"
            className="w-full text-3xl placeholder:text-[#B1B1B1] font-semibold pb-2 text-gray-800 focus:outline-none focus:border-blue-500"
            value={eventData.name}
            placeholder="Add a name"
            onChange={(e) => onChange("name", e.target.value)}
            onBlur={() => eventData.name.trim() && setIsEditingName(false)}
            autoFocus
          />
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold text-gray-800">{eventData.name}</p>
            <button
              onClick={() => setIsEditingName(true)}
              className="text-sm text-blue-600 hover:underline flex items-center cursor-pointer"
            >
              <Pencil size={14} className="mr-1" /> Edit
            </button>
          </div>
        )}
        <label htmlFor="eventName" className="block text-sm text-gray-800 font-medium mt-1">
          Event Name
        </label>
      </div>

      <div className="flex items-center gap-3 my-4">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src="/profile.png" alt={creator.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-bold text-gray-900">{creator.name}</p>
          <p className="text-sm font-semibold text-gray-800">Created by</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-6 justify-between">
        <div className="flex items-start">
          {/* Date Field */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <div className="relative">
                <input
                  type="date"
                  id="eventDate"
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  value={eventData.date || format(new Date(), "yyyy-MM-dd")}
                  onChange={(e) => onChange("date", e.target.value)}
                />
                <div className="flex items-center gap-2 cursor-pointer">
                  <span className="text-lg font-medium text-gray-900">{formatDateDisplay(eventData.date)}</span>
                </div>
              </div>
            </div>
            <label htmlFor="eventDate" className="text-sm text-gray-700">
              Check-in date
            </label>
          </div>
          </div>

          {/* Time Fields Group */}
          <div className="flex gap-8 items-start">
            {/* Start Time Field */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-gray-500" />
                <div className="relative">
                  <input
                    type="time"
                    id="startTime"
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    value={eventData.startTime || ""}
                    onChange={(e) => onChange("startTime", e.target.value)}
                  />
                  <div className="flex items-center gap-1 cursor-pointer">
                    <span className="text-lg font-medium text-gray-900">
                      {eventData.startTime ? formatTimeDisplay(eventData.startTime) : "12:20 pm"}
                    </span>
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>
              <label htmlFor="startTime" className="text-sm font-medium text-gray-700">
                Check-in start time
              </label>
            </div>

            {/* End Time Field */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-gray-500" />
                <div className="relative">
                  <input
                    type="time"
                    id="endTime"
                    placeholder="--:--"
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    value={eventData.endTime || ""}
                    onChange={(e) => onChange("endTime", e.target.value)}
                  />
                  <div className="flex items-center gap-1 cursor-pointer">
                    <span className="text-lg font-medium text-gray-900">
                      {eventData.endTime ? formatTimeDisplay(eventData.endTime) : "12:06 pm"}
                    </span>
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>
              <label htmlFor="endTime" className="text-sm font-medium text-gray-700">
                Check-in end time
              </label>
            </div>
          </div>
        </div>
      </div>
  )
}

export default EventDetails

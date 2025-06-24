"use client"
import { Download, Check, X } from "lucide-react"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback } from "../ui/avatar"

interface Attendee {
  id: number
  firstName: string
  lastName: string
  avatar: string
  avatarColor: string
  checkedIn: boolean
  time: string
  answers?: Record<string, string>
}

interface AttendeesSectionAdvancedProps {
  attendees: Attendee[]
  onExportClick: () => void
}

export default function AttendeesSectionAdvanced({ attendees, onExportClick }: AttendeesSectionAdvancedProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">See who's present</h2>
          <p className="text-sm text-gray-500">Event check-ins</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={onExportClick}>
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Check-in</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Attendee</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">First Name</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Last Name</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Time</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                What is the answer to problem 1.a*
              </th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee) => (
              <tr key={attendee.id} className="border-b border-gray-100">
                <td className="py-4 px-2">
                  <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                    {attendee.checkedIn ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </td>
                <td className="py-4 px-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={`${attendee.avatarColor} text-white text-sm font-medium`}>
                      {attendee.avatar}
                    </AvatarFallback>
                  </Avatar>
                </td>
                <td className="py-4 px-2">
                  <span className="text-sm text-gray-900">{attendee.firstName}</span>
                </td>
                <td className="py-4 px-2">
                  <span className="text-sm text-gray-900">{attendee.lastName}</span>
                </td>
                <td className="py-4 px-2">
                  <span className="text-sm text-gray-900">{attendee.time}</span>
                </td>
                <td className="py-4 px-2">
                  <span className="text-sm text-gray-900">
                    {attendee.answers?.["What is the answer to problem 1.a*"] || ""}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

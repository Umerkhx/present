import { useMemo } from "react"
import type { AttendanceChartProps } from "../../types"



export default function AttendanceChart({ attendanceStats, showCount = false }: AttendanceChartProps) {
  const strokeDashoffset = useMemo(() => {
    const circumference = 251.2
    return circumference - (attendanceStats.percentage / 100) * circumference
  }, [attendanceStats.percentage])

  return (
    <div className="rounded-lg p-6 shadow-sm bg-white">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="75%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#progressGradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray="251.2"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-gray-900">
              {showCount ? attendanceStats.checkedIn : `${attendanceStats.percentage}%`}
            </span>
          </div>
        </div>
        <div>
          <p className="font-semibold text-gray-900">
            {showCount
              ? `${attendanceStats.checkedIn} attendees checked in`
              : `${attendanceStats.checkedIn} of ${attendanceStats.total} attendees checked in`}
          </p>
          <p className="text-sm text-gray-500">
            {showCount
              ? "Between 12:45 and 2:59 pm PST"
              : attendanceStats.checkedIn === 0
                ? "No one has checked-in yet"
                : `${attendanceStats.checkedIn} attendee${attendanceStats.checkedIn > 1 ? "s" : ""} within time window`}
          </p>
        </div>
      </div>
    </div>
  )
}

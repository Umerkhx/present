import { Download } from "lucide-react"
import { Button } from "../ui/button"
import type { AttendeesSectionProps } from "../../types"



export default function AttendeesSection({ checkIns, showQuestions = false, onExportClick }: AttendeesSectionProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">See who's present</h2>
          <p className="text-sm font-medium text-gray-500">Event check-ins</p>
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
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-500">Check-in</th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-500">Time</th>
              {showQuestions && (
                <>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-500">
                    What is the answer to problem 1.a*
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-500">
                    What is the answer to problem 1.b*
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {checkIns.map((checkIn, index) => (
              <tr key={checkIn.id} className="border-b border-gray-100">
                <td className="py-4 px-2 text-sm text-gray-900">{index + 1}</td>
                <td className="py-4 px-2 text-sm text-gray-900">{checkIn.time}</td>
                {showQuestions && (
                  <>
                    <td className="py-4 px-2 text-sm text-gray-900">
                      {checkIn.answers?.["What is the answer to problem 1.a*"] || ""}
                    </td>
                    <td className="py-4 px-2 text-sm text-gray-900">
                      {checkIn.answers?.["What is the answer to problem 1.b*"] || ""}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

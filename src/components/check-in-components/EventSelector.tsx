"use client"
import { useState } from "react"
import { ChevronDown, Settings } from "lucide-react"
import { Button } from "../ui/button"

interface EventSelectorProps {
  currentEventKey: string
  eventKeys: string[]
  onEventChange: (eventKey: string) => void
}

export function EventSelector({ currentEventKey, eventKeys, onEventChange }: EventSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const eventLabels: Record<string, string> = {
    open: "Open Event",
    groupNames: "Group (Names Only)",
    groupTextField: "Group (Text Field)",
    groupNamesAndText: "Group (Names + Text)",
    groupNamesLocation: "Group (Names + Location)",
    groupNamesLocationQuestions: "Group (Full Featured)",
    alreadyCheckedIn: "Already Checked In",
    unavailable: "Check-in Unavailable",
    success: "Success State",
  }

  const handleEventSelect = (eventKey: string) => {
    onEventChange(eventKey)
    setIsOpen(false)
  }

  const toggleSelector = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="fixed top-6 left-52 z-50">
      <Button
        onClick={toggleSelector}
        variant="outline"
        className="bg-white border-gray-300 shadow-lg hover:bg-gray-50 flex items-center gap-2"
      >
        <Settings className="w-4 h-4" />
        <span className="text-sm font-medium">Demo Types</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg min-w-[200px] max-h-[400px] overflow-y-auto">
          <div className="p-2">
            <div className="text-xs font-semibold text-gray-500 px-2 py-1 mb-1">Select Event Type:</div>
            <div className="space-y-1">
              {eventKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => handleEventSelect(key)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors hover:bg-gray-100 ${
                    currentEventKey === key ? "bg-gray-900 text-white hover:bg-gray-800" : "text-gray-700"
                  }`}
                >
                  {eventLabels[key] || key}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {isOpen && <div className="fixed inset-0 -z-10" onClick={() => setIsOpen(false)} />}
    </div>
  )
}

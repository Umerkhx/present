"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Toggle from "./Toggle"
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select"
import { useAppContext } from "../context/app-context"

interface CheckInSettingsProps {
  openCheckIn: boolean
  checkAttendeeLocation: boolean
  addQuestions: boolean
  onChange: (name: string, value: any) => void
}

const VERIFICATION_OPTIONS = [
  { value: "firstName_lastName", label: "First Name & Last Name" },
  { value: "id", label: "ID Only" },
  { value: "email", label: "Email Only" },
  { value: "phone", label: "Phone Only" },
  { value: "firstName_lastName_id", label: "First Name, Last Name & ID" },
]

const CheckInSettings: React.FC<CheckInSettingsProps> = ({ openCheckIn, checkAttendeeLocation, onChange }) => {
  const { createdGroups } = useAppContext()
  const [selectedGroupId, setSelectedGroupId] = useState<string>(createdGroups[0]?.id || "")
  const [selectedVerificationMethod, setSelectedVerificationMethod] = useState<string>("firstName_lastName")

  const selectedGroup = createdGroups.find((group) => group.id === selectedGroupId) || createdGroups[0]

  const getVerificationDisplayText = (method: string) => {
    const option = VERIFICATION_OPTIONS.find((opt) => opt.value === method)
    return option ? option.label : "First Name & Last Name"
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-4">
          <Toggle enabled={openCheckIn} onChange={(value) => onChange("openCheckIn", value)} />
          <p className="font-semibold text-gray-800">{openCheckIn ? "Group check-in" : "Open check-in"}</p>
        </div>

        {openCheckIn && selectedGroup && (
          <div className="mt-4 space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-gray-900">{selectedGroup.name}</p>
              <Select value={selectedGroupId} onValueChange={(value) => setSelectedGroupId(value)}>
                <SelectTrigger className="w-auto h-auto p-0 border-none bg-transparent hover:bg-gray-100 rounded-sm">
                </SelectTrigger>
                <SelectContent>
                  {createdGroups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      <div className="flex flex-col">
                        <span className="font-semibold">{group.name}</span>
                        <span className="text-xs text-gray-500">{group.memberCount} members</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Verification Method with Inline Dropdown */}
            <div className="flex items-center gap-2">
              <p className="text-base font-bold text-gray-900">
                {getVerificationDisplayText(selectedVerificationMethod)}
              </p>
              <Select
                value={selectedVerificationMethod}
                onValueChange={(value) => setSelectedVerificationMethod(value)}
              >
                <SelectTrigger className="w-auto h-auto p-0 border-none bg-transparent hover:bg-gray-100 rounded-sm">
                </SelectTrigger>
                <SelectContent>
                  {VERIFICATION_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <p className="text-sm font-semibold text-gray-600">Group verification</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Toggle enabled={checkAttendeeLocation} onChange={(value) => onChange("checkAttendeeLocation", value)} />
        <div>
          <p className="font-medium text-gray-800">Check attendee location</p>
        </div>
      </div>
    </div>
  )
}

export default CheckInSettings

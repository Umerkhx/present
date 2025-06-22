"use client"

import { useState } from "react"
import { Plus, X, ChevronDown, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Input } from "../ui/input"
import { useAppContext } from "../../context/app-context"

export default function ModalGroup() {
  const { groupName, members, setMembers, handleSaveGroup, currentPlan, limits, updateMember } = useAppContext()

  const [hasCustomField, setHasCustomField] = useState(false)
  const [customFieldName] = useState("New Field")

  const activeMembersCount = members.filter((m) => m.firstName && m.lastName).length
  const canAddMoreMembers = members.length < limits.maxMembersPerGroup

  const addNewMember = () => {
    if (!canAddMoreMembers) return

    const newId = Math.max(0, ...members.map((m) => m.id)) + 1
    const newMember = {
      id: newId,
      initials: "",
      firstName: "",
      lastName: "",
      bgColor: "bg-gray-400",
    }
    setMembers([...members, newMember])
  }

  const removeMember = (id: number) => {
    setMembers(members.filter((member) => member.id !== id))
  }

  const handleAddCustomField = () => {
    setHasCustomField(true)
  }

  return (
    <div className="p-4 w-full max-w-full">
      <h3 className="text-start text-xl sm:text-2xl font-semibold mt-3">Add Members to {groupName || "Group"}</h3>

      <div className="flex items-center gap-2 font-medium text-black text-lg sm:text-xl mt-4">
        <span className="truncate">{groupName || "2024/25 Freshman English Period 5"}</span>
        <Plus className="text-gray-500 w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
      </div>

      <div className="flex items-center justify-between mt-4 mb-2">
        <div className="text-sm text-gray-600">
          {activeMembersCount}/{limits.maxMembersPerGroup} members added
        </div>
        {!canAddMoreMembers && (
          <div className="flex items-center gap-1 text-amber-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            Member limit reached
          </div>
        )}
      </div>

      <button
        onClick={addNewMember}
        disabled={!canAddMoreMembers}
        className={`rounded-lg py-2 px-2.5 border font-medium mt-4 mb-6 text-sm sm:text-base ${
          canAddMoreMembers
            ? "border-gray-500 text-black hover:bg-gray-50"
            : "border-gray-300 text-gray-400 cursor-not-allowed"
        }`}
      >
        {canAddMoreMembers
          ? "Add a Member"
          : `Upgrade to add more members (${currentPlan === "free" ? "Plus" : "Pro"} plan)`}
      </button>

      <div className="hidden sm:grid sm:grid-cols-[40px_60px_1fr_1fr_1fr] sm:gap-4 mb-4 mt-6">
        <div></div>
        <div></div>
        <div className="font-medium text-black">First Name</div>
        <div className="font-medium text-black">Last Name</div>
        <div className={`font-medium flex items-center gap-2 ${hasCustomField ? "text-black" : "text-gray-400"}`}>
          <span className="truncate">{customFieldName}</span>
          {!hasCustomField && (
            <button className="w-6 h-6 p-0 hover:bg-gray-100 rounded-full" onClick={handleAddCustomField}>
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex sm:hidden items-center gap-2 mb-2 mt-6">
        <div className="w-8"></div>
        <div className="w-8"></div>
      </div>

      <div className="space-y-3">
        {members.map((member) => (
          <div key={member.id} className="flex sm:grid sm:grid-cols-[40px_60px_1fr_1fr_1fr] sm:gap-4 items-center">
            <button
              className="w-6 h-6 sm:w-8 sm:h-8 p-0 hover:bg-gray-100 flex-shrink-0 rounded-full"
              onClick={() => removeMember(member.id)}
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>

            <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
              <AvatarFallback className={`${member.bgColor} text-white font-medium text-xs sm:text-sm`}>
                {member.initials || ""}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 sm:hidden overflow-x-auto">
              <div className="flex gap-2 min-w-[400px] pr-4">
                <div className="flex-1">
                  <div className="text-xs font-medium text-black mb-1">First Name</div>
                  <Input
                    placeholder={member.firstName || "First Name"}
                    value={member.firstName}
                    onChange={(e) => updateMember(member.id, "firstName", e.target.value)}
                    className="border border-gray-300 rounded-md text-sm h-8 w-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-black mb-1">Last Name</div>
                  <Input
                    placeholder={member.lastName || "Last Name"}
                    value={member.lastName}
                    onChange={(e) => updateMember(member.id, "lastName", e.target.value)}
                    className="border border-gray-300 rounded-md text-sm h-8 w-full"
                  />
                </div>
                <div className="flex-1">
                  <div className={`text-xs font-medium mb-1 ${hasCustomField ? "text-black" : "text-gray-400"}`}>
                    {customFieldName}
                    {!hasCustomField && (
                      <button className="ml-1 hover:bg-gray-100 rounded-full" onClick={handleAddCustomField}>
                        <Plus className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <Input
                    placeholder=""
                    disabled={!hasCustomField}
                    className={`border rounded-md text-sm h-8 w-full ${hasCustomField ? "border-gray-300 bg-white" : "border-gray-200 bg-gray-50 cursor-not-allowed"}`}
                  />
                </div>
              </div>
            </div>

            <div className="hidden sm:block w-full">
              <Input
                placeholder={member.firstName || "First Name"}
                value={member.firstName}
                onChange={(e) => updateMember(member.id, "firstName", e.target.value)}
                className="border border-gray-300 rounded-md text-base h-10 w-full max-w-[200px]"
              />
            </div>
            <div className="hidden sm:block w-full">
              <Input
                placeholder={member.lastName || "Last Name"}
                value={member.lastName}
                onChange={(e) => updateMember(member.id, "lastName", e.target.value)}
                className="border border-gray-300 rounded-md text-base h-10 w-full max-w-[200px]"
              />
            </div>
            <div className="hidden sm:block w-full">
              <Input
                placeholder=""
                disabled={!hasCustomField}
                className={`border rounded-md text-base h-10 w-full max-w-[200px] ${hasCustomField ? "border-gray-300 bg-white" : "border-gray-200 bg-gray-50 cursor-not-allowed"}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 sm:mt-8">
        <h4 className="text-start font-semibold text-black mb-2 text-sm sm:text-base">Group member verification</h4>
        <button className="flex items-center gap-2 text-black font-medium p-0 h-auto hover:bg-transparent text-sm sm:text-base">
          First Name & Last Name
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={handleSaveGroup}
        className="w-full lg:w-1/4 bg-black text-white hover:bg-gray-800 mt-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base"
      >
        Save
      </button>
    </div>
  )
}

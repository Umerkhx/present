"use client"

import { useState } from "react"
import { Plus, X, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useAppContext } from "../../context/app-context"

type AdditionalField = "id" | "email" | "phone"
type VerificationMethod = "firstName_lastName" | "id" | "email" | "phone" | "firstName_lastName_id"

const ADDITIONAL_FIELDS: { key: AdditionalField; label: string; placeholder: string }[] = [
  { key: "id", label: "ID", placeholder: "Student ID" },
  { key: "email", label: "Email", placeholder: "Email Address" },
  { key: "phone", label: "Phone", placeholder: "Phone Number" },
]

const VERIFICATION_OPTIONS: { value: VerificationMethod; label: string }[] = [
  { value: "firstName_lastName", label: "First Name & Last Name" },
  { value: "id", label: "ID Only" },
  { value: "email", label: "Email Only" },
  { value: "phone", label: "Phone Only" },
  { value: "firstName_lastName_id", label: "First Name, Last Name & ID" },
]

export default function ModalGroup() {
  const { groupName, members, setMembers, handleSaveGroup, currentPlan, limits, updateMember } = useAppContext()

  const [activeFields, setActiveFields] = useState<AdditionalField[]>([])
  const [verificationMethod, setVerificationMethod] = useState<VerificationMethod>("firstName_lastName")

  const activeMembersCount = members.filter((m) => m.firstName && m.lastName).length
  const canAddMoreMembers = members.length < limits.maxMembersPerGroup

  const totalFieldSlots = Math.min(3 + activeFields.length, 5)
  const availableFields = ADDITIONAL_FIELDS.filter((field) => !activeFields.includes(field.key))
  const nextAvailableField = availableFields[0]

  const addNewMember = () => {
    if (!canAddMoreMembers) return

    const newId = Math.max(0, ...members.map((m) => m.id)) + 1
    const newMember = {
      id: newId,
      initials: "",
      firstName: "",
      lastName: "",
      studentId: "",
      email: "",
      phone: "",
      bgColor: "bg-gray-400",
    }

    setMembers([...members, newMember])
  }

  const removeMember = (id: number) => {
    setMembers(members.filter((member) => member.id !== id))
  }

  const handleAddField = (fieldKey: AdditionalField) => {
    if (!activeFields.includes(fieldKey) && activeFields.length < 3) {
      setActiveFields([...activeFields, fieldKey])
    }
  }

  const getFieldValue = (member: any, fieldKey: AdditionalField) => {
    switch (fieldKey) {
      case "id":
        return member.studentId || ""
      case "email":
        return member.email || ""
      case "phone":
        return member.phone || ""
      default:
        return ""
    }
  }

  const updateMemberField = (memberId: number, fieldKey: AdditionalField, value: string) => {
    const fieldMap = {
      id: "studentId",
      email: "email",
      phone: "phone",
    }
    updateMember(memberId, fieldMap[fieldKey] as any, value)
  }

  const gridCols = `40px 60px repeat(${totalFieldSlots}, 1fr)`

  return (
    <div className="p-4 w-full max-w-full">
      <h3 className="text-start text-xl sm:text-2xl font-bold mt-3">Add Members to {groupName || "Group"}</h3>

      <div className="flex items-center gap-2 font-semibold text-black text-lg sm:text-xl mt-4">
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
        className={`rounded-lg py-2 px-2.5 border font-semibold mt-4 mb-6 text-sm sm:text-base ${
          canAddMoreMembers
            ? "border-gray-500 text-black hover:bg-gray-50"
            : "border-gray-300 text-gray-400 cursor-not-allowed"
        }`}
      >
        {canAddMoreMembers
          ? "Add a Member"
          : `Upgrade to add more members (${currentPlan === "free" ? "Plus" : "Pro"} plan)`}
      </button>

      {/* Desktop Header */}
      <div className="hidden sm:grid sm:gap-4 mb-4 mt-6" style={{ gridTemplateColumns: gridCols }}>
        <div></div>
        <div></div>
        <div className="font-semibold text-black">First Name</div>
        <div className="font-semibold text-black">Last Name</div>

        {/* Show active fields */}
        {activeFields.map((fieldKey) => {
          const field = ADDITIONAL_FIELDS.find((f) => f.key === fieldKey)
          return (
            <div key={fieldKey} className="font-semibold text-black">
              {field?.label}
            </div>
          )
        })}

        {/* Show next available field slot if we haven't reached the limit */}
        {activeFields.length < 3 && nextAvailableField && (
          <div className="font-semibold flex items-center gap-2 text-gray-400">
            <span className="truncate">New Field</span>
            <button
              className="w-6 h-6 p-0 hover:bg-gray-100 rounded-full"
              onClick={() => handleAddField(nextAvailableField.key)}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Header */}
      <div className="flex sm:hidden items-center gap-2 mb-2 mt-6">
        <div className="w-8"></div>
        <div className="w-8"></div>
      </div>

      {/* Members List */}
      <div className="space-y-3">
        {members.map((member) => (
          <div key={member.id} className="flex sm:grid sm:gap-4 items-center" style={{ gridTemplateColumns: gridCols }}>
            {/* Remove Button */}
            <button
              className="w-6 h-6 sm:w-8 sm:h-8 p-0 hover:bg-gray-100 flex-shrink-0 rounded-full"
              onClick={() => removeMember(member.id)}
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>

            {/* Avatar */}
            <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
              <AvatarFallback className={`${member.bgColor} text-white font-semibold text-xs sm:text-sm`}>
                {member.initials || ""}
              </AvatarFallback>
            </Avatar>

            {/* Mobile Layout with Horizontal Scroll */}
            <div className="flex-1 sm:hidden overflow-x-auto">
              <div className="flex gap-2 pr-4" style={{ minWidth: `${totalFieldSlots * 130}px` }}>
                {/* First Name */}
                <div className="flex-1 min-w-[120px]">
                  <div className="text-xs font-semibold text-black mb-1">First Name</div>
                  <Input
                    placeholder="First Name"
                    value={member.firstName}
                    onChange={(e) => updateMember(member.id, "firstName", e.target.value)}
                    className="border border-gray-300 rounded-md text-sm h-8 w-full"
                  />
                </div>

                {/* Last Name */}
                <div className="flex-1 min-w-[120px]">
                  <div className="text-xs font-semibold text-black mb-1">Last Name</div>
                  <Input
                    placeholder="Last Name"
                    value={member.lastName}
                    onChange={(e) => updateMember(member.id, "lastName", e.target.value)}
                    className="border border-gray-300 rounded-md text-sm h-8 w-full"
                  />
                </div>

                {/* Active Additional Fields */}
                {activeFields.map((fieldKey) => {
                  const field = ADDITIONAL_FIELDS.find((f) => f.key === fieldKey)
                  return (
                    <div key={fieldKey} className="flex-1 min-w-[120px]">
                      <div className="text-xs font-semibold text-black mb-1">{field?.label}</div>
                      <Input
                        placeholder={field?.placeholder}
                        value={getFieldValue(member, fieldKey)}
                        onChange={(e) => updateMemberField(member.id, fieldKey, e.target.value)}
                        className="border border-gray-300 rounded-md text-sm h-8 w-full"
                      />
                    </div>
                  )
                })}

                {/* Next Available Field Slot for Mobile */}
                {activeFields.length < 3 && nextAvailableField && (
                  <div className="flex-1 min-w-[120px]">
                    <div className="text-xs font-semibold text-gray-400 mb-1 flex items-center gap-1">
                      <span>New Field</span>
                      <button
                        className="hover:bg-gray-100 rounded-full"
                        onClick={() => handleAddField(nextAvailableField.key)}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <Input
                      placeholder=""
                      disabled={true}
                      className="border border-gray-200 bg-gray-50 cursor-not-allowed rounded-md text-sm h-8 w-full"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block w-full">
              <Input
                placeholder="First Name"
                value={member.firstName}
                onChange={(e) => updateMember(member.id, "firstName", e.target.value)}
                className="border border-gray-300 rounded-md text-base h-10 w-full max-w-[200px]"
              />
            </div>

            <div className="hidden sm:block w-full">
              <Input
                placeholder="Last Name"
                value={member.lastName}
                onChange={(e) => updateMember(member.id, "lastName", e.target.value)}
                className="border border-gray-300 rounded-md text-base h-10 w-full max-w-[200px]"
              />
            </div>

            {/* Desktop Active Additional Fields */}
            {activeFields.map((fieldKey) => {
              const field = ADDITIONAL_FIELDS.find((f) => f.key === fieldKey)
              return (
                <div key={fieldKey} className="hidden sm:block w-full">
                  <Input
                    placeholder={field?.placeholder}
                    value={getFieldValue(member, fieldKey)}
                    onChange={(e) => updateMemberField(member.id, fieldKey, e.target.value)}
                    className="border border-gray-300 rounded-md text-base h-10 w-full max-w-[200px]"
                  />
                </div>
              )
            })}

            {/* Desktop Next Available Field Slot */}
            {activeFields.length < 3 && nextAvailableField && (
              <div className="hidden sm:block w-full">
                <Input
                  placeholder=""
                  disabled={true}
                  className="border border-gray-200 bg-gray-50 cursor-not-allowed rounded-md text-base h-10 w-full max-w-[200px]"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Group Member Verification */}
      <div className="mt-6 sm:mt-8">
        <h4 className="text-start font-bold text-black mb-2 text-sm sm:text-base">Group member verification</h4>
        <Select value={verificationMethod} onValueChange={(value: VerificationMethod) => setVerificationMethod(value)}>
          <SelectTrigger className="w-auto bg-transparent border-none p-0 h-auto hover:bg-transparent text-sm sm:text-base font-semibold">
            <SelectValue />
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

      <button
        onClick={handleSaveGroup}
        className="w-full lg:w-1/4 bg-black text-white hover:bg-gray-800 mt-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base"
      >
        Save
      </button>
    </div>
  )
}

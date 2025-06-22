"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Input } from "../ui/input"
import { useAppContext } from "../../context/app-context"

interface GroupDetailsProps {
  group: {
    id: string
    name: string
    memberCount: number
  }
}

export default function GroupDetails({ group }: GroupDetailsProps) {
  const { members, setMembers, handleSaveGroup, handleBackToManage, limits, updateMember } = useAppContext()

  const [isEditing, setIsEditing] = useState(false)
  const [groupName, setGroupName] = useState(group.name)

  const handleSave = () => {
    handleSaveGroup()
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const activeMembersCount = members.filter((m) => m.firstName && m.lastName).length

  if (isEditing) {
    return (
      <div className="p-4">
        <h3 className="text-xl sm:text-2xl font-semibold mt-4">Edit Group</h3>

        {/* Editable Group Name */}
        <div className="mt-6">
          <Input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="text-lg font-semibold border-none bg-transparent p-0 focus:ring-0 focus:border-none shadow-none mb-6"
            placeholder="Group name"
          />
        </div>

        {/* Members Count */}
        <div className="mb-4 text-sm text-gray-600">
          {activeMembersCount}/{limits.maxMembersPerGroup} members
        </div>

        {/* Column Headers */}
        <div className="grid grid-cols-[60px_1fr_1fr] gap-4 py-3 text-sm font-medium text-gray-500 border-b mb-4">
          <div></div>
          <div>First Name</div>
          <div>Last Name</div>
        </div>

        {/* Member Rows */}
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="grid grid-cols-[60px_1fr_1fr] gap-4 items-center">
              <Avatar className="w-10 h-10">
                <AvatarFallback className={`${member.bgColor} text-white font-medium text-sm`}>
                  {member.initials}
                </AvatarFallback>
              </Avatar>

              <Input
                value={member.firstName}
                onChange={(e) => updateMember(member.id, "firstName", e.target.value)}
                placeholder="First Name"
                className="h-10"
              />

              <Input
                value={member.lastName}
                onChange={(e) => updateMember(member.id, "lastName", e.target.value)}
                placeholder="Last Name"
                className="h-10"
              />
            </div>
          ))}
        </div>

        {/* Group member verification */}
        <div className="mt-8">
          <h4 className="text-start font-semibold text-black mb-2 text-sm">Group member verification</h4>
          <button className="flex items-center gap-2 text-black font-medium p-0 h-auto hover:bg-transparent text-sm">
            First Name & Last Name
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button onClick={handleSave} className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 text-sm">
            Save Changes
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h3 className="text-xl sm:text-2xl text-left font-semibold mt-4">Group details</h3>

      {/* Group Name */}
      <div className="mt-6 mb-6">
        <h4 className="text-lg text-left font-semibold">{group.name}</h4>
      </div>

      {/* Edit Button */}
      <button
        onClick={handleEdit}
        className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg lg:w-1/6 w-full hover:bg-gray-50 text-sm mb-6"
      >
        Edit
      </button>

      {/* Column Headers */}
      <div className="grid grid-cols-[60px_1fr_1fr] gap-4 py-3 text-sm font-medium text-gray-500 border-b mb-4">
        <div></div>
        <div>First Name</div>
        <div>Last Name</div>
      </div>

      {/* Member List */}
      <div className="space-y-4">
        {members
          .filter((member) => member.firstName && member.lastName)
          .map((member) => (
            <div key={member.id} className="grid grid-cols-[60px_1fr_1fr] gap-4 items-center py-2">
              <Avatar className="w-10 h-10">
                <AvatarFallback className={`${member.bgColor} text-white font-medium text-sm`}>
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{member.firstName}</span>
              <span className="text-sm font-medium">{member.lastName}</span>
            </div>
          ))}
      </div>

      {/* Group member verification */}
      <div className="mt-8">
        <h4 className="text-left font-semibold text-black mb-2 text-sm">Group member verification</h4>
        <div className="text-sm text-left text-gray-600">First Name & Last Name</div>
      </div>

      {/* Back Button */}
      <button
        onClick={handleBackToManage}
        className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm mt-6"
      >
        Back to Groups
      </button>
    </div>
  )
}

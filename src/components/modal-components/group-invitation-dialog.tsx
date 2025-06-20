"use client"

import { X } from "lucide-react"
import { Dialog, DialogContent } from "../ui/dialog"
import { Avatar } from "../ui/avatar"

interface TeamMember {
  firstName: string
  lastName: string
  role: string
  initials: string
  bgColor: string
}

interface GroupInvitationDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  teamName: string
  accountOwner: TeamMember
}

export default function GroupInvitationDialog({ open, setOpen, teamName, accountOwner }: GroupInvitationDialogProps) {
  const handleIgnore = () => {
    setOpen(false)
  }

  const handleJoin = () => {
    // Handle join logic here
    console.log("User joined the group:", teamName)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md p-0 gap-0">
        {/* Header with close button */}
        <div className="flex justify-end p-4 pb-0">
          <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Title */}
          <div className="mb-4">
            <h2 className="text-base font-medium text-gray-900 mb-1">You've been invited to join a group:</h2>
            <h3 className="text-base font-medium text-gray-900">{teamName}</h3>
          </div>

          {/* Account Owner Info */}
          <div className="flex items-center gap-3 mb-6">
            <Avatar className="w-10 h-10">
              <img className="w-10 h-10 rounded-full" src="/profile.png" alt="" />
            </Avatar>
            <div>
              <div className="text-sm font-medium text-gray-900">
                {accountOwner.firstName} {accountOwner.lastName}
              </div>
              <div className="text-xs text-gray-500">{accountOwner.role}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleIgnore}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Ignore
            </button>
            <button
              onClick={handleJoin}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
            >
              Join
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

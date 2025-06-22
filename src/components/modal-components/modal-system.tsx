"use client"

import type { Dispatch, SetStateAction } from "react"
import { XIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog"
import GroupDetails from "./group-details"
import GroupInvitationDialog from "./group-invitation-dialog"
import { useAppContext } from "../../context/app-context"
import EditProfile from "./EditProfile"
import Admin from "./Admin"
import ManageGroup from "./ManageGroup"
import AddGroup from "./AddGroup"
import ModalGroup from "./ModalGroup"
import SubscriptionPanel from "./SubscriptionPanel"
import Navigation from "./Navigation"

interface ModalSystemProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function ModalSystem({ open, setOpen }: ModalSystemProps) {
  const {
    activeTab,
    groupsView,
    createdGroups,
    viewingGroupId,
    savedTeamData,
    showInvitationDialog,
    setShowInvitationDialog,
    setSavedTeamData,
  } = useAppContext()

  // Handle modal close - show invitation dialog if team was saved
  const handleModalClose = (isOpen: boolean) => {
    if (!isOpen && savedTeamData) {
      // Modal is closing and we have saved team data
      setOpen(false)
      setTimeout(() => {
        setShowInvitationDialog(true)
      }, 300) // Small delay to ensure modal is closed first
    } else {
      setOpen(isOpen)
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <EditProfile />
      case "admin":
        return <Admin />
      case "groups":
        switch (groupsView) {
          case "manage":
            return <ManageGroup />
          case "add":
            return <AddGroup />
          case "modal":
            return <ModalGroup />
          case "details":
            const currentGroup = createdGroups.find((g) => g.id === viewingGroupId)
            if (!currentGroup) return null

            return <GroupDetails group={currentGroup} />
          default:
            return <ManageGroup />
        }
      case "subscription":
        return <SubscriptionPanel />
      default:
        return <EditProfile />
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleModalClose}>
        <DialogContent className="xl:max-w-5xl md:max-w-3xl sm:max-w-2xl max-w-[95vw] max-h-[90vh] overflow-y-auto py-6 px-3">
          <DialogHeader className="">
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center gap-1">
                <img src="/logo.png" width={25} height={25} alt="logo" />
                <h3 className="text-3xl font-semibold"> Present </h3>
              </div>
              <div className="flex items-center gap-5">
                <button
                  onClick={() => handleModalClose(false)}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer "
                >
                  <img src="/exit-modal.png" width={20} height={20} alt="Close" />
                </button>
                <button
                  onClick={() => handleModalClose(false)}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <XIcon />
                </button>
              </div>
            </div>

            <Navigation />

            <div className="min-h-[500px] px-5">{renderContent()}</div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Group Invitation Dialog */}
      {savedTeamData && (
        <GroupInvitationDialog
          open={showInvitationDialog}
          setOpen={(open) => {
            setShowInvitationDialog(open)
            if (!open) {
              setSavedTeamData(null) // Clear saved data when dialog closes
            }
          }}
          teamName={savedTeamData.teamName}
          accountOwner={savedTeamData.accountOwner}
        />
      )}
    </>
  )
}

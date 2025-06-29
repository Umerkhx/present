"use client"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useAppContext } from "../../context/app-context"

// Update the component to accept groupId
interface EventCardMenuProps {
  eventId: string
  eventTitle: string
  groupId?: string
  isGroupEvent?: boolean
  onEditClick: () => void;
}

export default function EventCardMenu({ eventId, groupId }: EventCardMenuProps) {
  const { handleEditGroupModal } = useAppContext()

  const handleViewDetails = () => {
    console.log("View details for event:", eventId)
    // Navigate to event details page
  }

  const handleEdit = () => {
    console.log("Edit event:", eventId)
    // Navigate to edit event page
  }

  const handleDelete = () => {
    console.log("Delete event:", eventId)
    // Show delete confirmation dialog
  }

  const handleEditGroup = () => {
    if (groupId) {
      handleEditGroupModal(groupId)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
          <MoreHorizontal className="w-4 h-4 text-gray-600" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleViewDetails} className="flex items-center gap-2">
          <img src="/dashboard-share-icon.png" className="w-4 h-4" alt="share" />
          Share
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEdit} className="flex items-center gap-2">
          <img src="/dashboard-edit-icon.png" className="w-4 h-4" alt="edit" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEditGroup} className="flex items-center gap-2">
          <img src="/dashboard-copy-icon.png" className="w-4 h-4" alt="edit" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="flex items-center gap-2 ">
          <img src="/dashboard-delete-icon.png" className="w-4 h-4" alt="edit" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

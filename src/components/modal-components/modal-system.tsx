"use client"
import { useState, type Dispatch, type SetStateAction } from "react"
import { XIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog"
import Navigation from "./Navigation"
import ManageGroup from "./ManageGroup"
import AddGroup from "./AddGroup"
import ModalGroup from "./ModalGroup"
import EditProfile from "./EditProfile"
import Admin from "./Admin"
import SubscriptionPanel from "./SubscriptionPanel"

type ActiveTab = "profile" | "admin" | "groups" | "subscription"
type GroupsView = "manage" | "add" | "modal"

interface Member {
    id: number
    initials: string
    firstName: string
    lastName: string
    bgColor: string
}

interface ModalSystemProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const profileImages = [
    "/profile/PP 1.png",
    "/profile/PP 2.png",
    "/profile/PP 3.png",
    "/profile/PP 4.png",
    "/profile/PP 5.png",
    "/profile/PP 6.png",
    "/profile/PP 7.png",
    "/profile/PP 8.png",
    "/profile/PP 9.png",
    "/profile/PP 10.png",
    "/profile/PP 11.png",
    "/profile/PP 12.png",
]

export default function ModalSystem({ open, setOpen }: ModalSystemProps) {
    const [activeTab, setActiveTab] = useState<ActiveTab>("groups")
    const [groupsView, setGroupsView] = useState<GroupsView>("manage")
    const [groupName, setGroupName] = useState("")
    const [selectedImage, setSelectedImage] = useState(profileImages[0])
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
    })
    const [, setProfileSaved] = useState(false)
    const [createdGroups, setCreatedGroups] = useState<
        Array<{
            id: string
            name: string
            memberCount: number
        }>
    >([])
    const [editingGroupId, setEditingGroupId] = useState<string | null>(null)
    const [members, setMembers] = useState<Member[]>([
        { id: 1, initials: "MM", firstName: "Marilyn", lastName: "Monroe", bgColor: "bg-purple-400" },
        { id: 2, initials: "TB", firstName: "Tom", lastName: "Brady", bgColor: "bg-cyan-400" },
        { id: 3, initials: "GC", firstName: "George", lastName: "Clooney", bgColor: "bg-green-400" },
        { id: 4, initials: "", firstName: "", lastName: "", bgColor: "bg-gray-400" },
    ])

    const handleProfileSubmit = () => {
        const { firstName, lastName } = formData
        if (firstName.trim() && lastName.trim()) {
            setProfileSaved(true)
            console.log("Saved profile:", {
                firstName,
                lastName,
                selectedImage,
            })
        }
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file && groupName.trim()) {
            setTimeout(() => {
                setGroupsView("modal")
            }, 500)
        }
    }

    const handleEditGroup = (groupId: string) => {
        const group = createdGroups.find((g) => g.id === groupId)
        if (group) {
            setGroupName(group.name)
            setEditingGroupId(groupId)
            setGroupsView("modal")
        }
    }

    const handleDeleteGroup = (groupId: string) => {
        setCreatedGroups((prev) => prev.filter((group) => group.id !== groupId))
    }

    const handleSaveGroup = () => {
        if (groupName.trim()) {
            const memberCount = members.filter((m) => m.firstName && m.lastName).length

            if (editingGroupId) {
                // Update existing group
                setCreatedGroups((prev) =>
                    prev.map((group) =>
                        group.id === editingGroupId ? { ...group, name: groupName, memberCount: memberCount } : group,
                    ),
                )
            } else {
                // Create new group
                const newGroup = {
                    id: Date.now().toString(),
                    name: groupName,
                    memberCount: memberCount,
                }
                setCreatedGroups((prev) => [...prev, newGroup])
            }

            setGroupName("")
            setEditingGroupId(null)
            setGroupsView("manage")
        }
    }

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <EditProfile
                        formData={formData}
                        setFormData={setFormData}
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                        onSubmit={handleProfileSubmit}
                    />
                )
            case "admin":
                return <Admin />
            case "groups":
                switch (groupsView) {
                    case "manage":
                        return (
                            <ManageGroup
                                createdGroups={createdGroups}
                                setGroupsView={setGroupsView}
                                onEditGroup={handleEditGroup}
                                onDeleteGroup={handleDeleteGroup}
                            />
                        )
                    case "add":
                        return (
                            <AddGroup
                                groupName={groupName}
                                setGroupName={setGroupName}
                                setGroupsView={setGroupsView}
                                setEditingGroupId={setEditingGroupId}
                                onFileUpload={handleFileUpload}
                            />
                        )
                    case "modal":
                        return (
                            <ModalGroup
                                groupName={groupName}
                                members={members}
                                setMembers={setMembers}
                                onSaveGroup={handleSaveGroup}
                            />
                        )
                    default:
                        return (
                            <ManageGroup
                                createdGroups={createdGroups}
                                setGroupsView={setGroupsView}
                                onEditGroup={handleEditGroup}
                                onDeleteGroup={handleDeleteGroup}
                            />
                        )
                }
            case "subscription":
                return <SubscriptionPanel />
            default:
                return (
                    <EditProfile
                        formData={formData}
                        setFormData={setFormData}
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                        onSubmit={handleProfileSubmit}
                    />
                )
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="xl:max-w-3xl md:max-w-3xl sm:max-w-2xl max-w-[95vw] max-h-[90vh] overflow-y-auto py-6 px-3">
                <DialogHeader className="">
                    <div className="flex justify-between items-center p-4">
                        <div className="flex items-center gap-1">
                            <img src="/logo.png" width={25} height={25} alt="logo" />
                            <h3 className="text-3xl font-semibold"> Present </h3>
                        </div>
                        <div className="flex items-center gap-5">
                            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700 cursor-pointer ">
                                <img src="/exit-modal.png" width={20} height={20} alt="Close" />
                            </button>
                            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                                <XIcon />
                            </button>
                        </div>
                    </div>

                    <Navigation 
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        setGroupsView={setGroupsView}
                    />

                    <div className="min-h-[500px] px-5">{renderContent()}</div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
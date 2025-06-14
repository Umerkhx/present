"use client"
import { useState, type Dispatch, type SetStateAction } from "react"
import type React from "react"

import { Plus, X, ChevronDown, XIcon, Pencil } from "lucide-react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Input } from "../ui/input"
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog"

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
    const [hasCustomField, setHasCustomField] = useState(false)
    const [customFieldName] = useState("New Field")
    const [selectedImage, setSelectedImage] = useState(profileImages[0])
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
    })
    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        setErrors((prev) => ({ ...prev, [name]: false }))
    }

    const handleSubmit = () => {
        const { firstName, lastName } = formData

        const newErrors = {
            firstName: firstName.trim() === "",
            lastName: lastName.trim() === "",
        }

        setErrors(newErrors)

        const hasError = Object.values(newErrors).some((val) => val)
        if (hasError) return

        setProfileSaved(true)
        console.log("Saved profile:", {
            firstName,
            lastName,
            selectedImage,
        })
    }

    const handleAddCustomField = () => {
        setHasCustomField(true)
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

    const Navigation = () => (
        <div className="flex sm:flex-row flex-col items-center gap-2 sm:gap-4 sm:justify-start justify-center px-4">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setActiveTab("profile")}
                    className={`rounded-lg px-3 py-2 border transition-colors ${activeTab === "profile" ? "border-black bg-gray-50" : "border-gray-400 bg-transparent hover:border-gray-600"}`}
                >
                    Profile
                </button>
                <button
                    onClick={() => setActiveTab("admin")}
                    className={`rounded-lg px-3 py-2 border transition-colors ${activeTab === "admin" ? "border-black bg-gray-50" : "border-gray-400 bg-transparent hover:border-gray-600"}`}
                >
                    Admin
                </button>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => {
                        setActiveTab("groups")
                        setGroupsView("manage")
                    }}
                    className={`rounded-lg px-3 py-2 border transition-colors ${activeTab === "groups" ? "border-black bg-gray-50" : "border-gray-400 bg-transparent hover:border-gray-600"}`}
                >
                    Groups
                </button>
                <button
                    onClick={() => setActiveTab("subscription")}
                    className={`rounded-lg px-3 py-2 border transition-colors ${activeTab === "subscription"
                            ? "border-black bg-gray-50"
                            : "border-gray-400 bg-transparent hover:border-gray-600"
                        }`}
                >
                    Subscription
                </button>
            </div>
        </div>
    )

    const ManageGroup = () => (
        <div className="p-2">
            <h3 className="text-start text-xl sm:text-2xl font-semibold mt-4">Manage groups</h3>
            <div className="flex justify-start items-center gap-2 font-medium text-black text-lg sm:text-xl mt-5">
                You have created {createdGroups.length}/1 groups
                <Plus className="text-gray-500 w-6 h-6 sm:w-8 sm:h-8" />
            </div>

            {createdGroups.length > 0 ? (
                <div className="mt-7 mb-5 space-y-4">
                    {createdGroups.map((group) => (
                        <div key={group.id} className="flex items-center justify-between py-4">
                            <div className="flex items-center justify-between lg:w-2/3 w-full gap-4">
                                <div className="">
                                    <div className="text-lg sm:text-xl font-semibold text-black">{group.name}</div>
                                    <div className="text-sm text-gray-600">Group Name</div>
                                </div>

                                <div className="text-center">
                                    <div className="text-lg sm:text-xl font-semibold text-black">{group.memberCount}</div>
                                    <div className="text-sm text-gray-600">Group Members</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                           
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEditGroup(group.id)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                  <Pencil className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteGroup(group.id)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="border rounded-md p-6 mt-7 mb-5 h-32 sm:h-48 flex flex-col items-center justify-center text-center">
                    <h4 className="font-semibold text-base sm:text-lg">No groups yet.</h4>
                    <p className="text-sm text-gray-900">Create a group here</p>
                </div>
            )}

            <button
                onClick={() => setGroupsView("add")}
                className="bg-black text-center w-full sm:w-2/5 rounded-md py-2 sm:py-1.5 text-white font-medium text-sm sm:text-base cursor-pointer hover:bg-gray-800 transition-colors"
            >
                {createdGroups.length > 0 ? "Upgrade To Add More Groups" : "Upgrade To Add More Groups"}
            </button>
        </div>
    )

    const AddGroup = () => (
        <div className="p-4">
            <h3 className="text-xl sm:text-2xl font-semibold mt-4">Add a Group</h3>
            <Input
                className="my-5 text-lg sm:text-2xl font-medium outline-none bg-transparent border-none w-full focus:border-none focus:outline-none active:outline-none"
                placeholder="Add Group Name"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                autoFocus
            />

            <div className="border-2  border-gray-300 rounded-md p-6 mt-7 mb-5 h-32 sm:h-48 flex flex-col items-center justify-center text-center hover:border-gray-400 transition-colors">
                <h4 className="font-semibold text-base sm:text-lg">Upload your roster here</h4>
                <p className="text-sm text-gray-900 mb-4">CSV or Excel docs only</p>
                <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="bg-black text-white px-4 py-2 rounded-md cursor-pointer  text-sm">
                    Choose File
                </label>
            </div>
            <button
                onClick={() => {
                    if (groupName.trim()) {
                        setEditingGroupId(null)
                        setGroupsView("modal")
                    }
                }}
                className="bg-transparent cursor-pointer flex justify-center items-center border border-gray-400 mx-auto text-center w-full sm:w-1/2 lg:w-1/4 rounded-md py-2 sm:py-1.5 text-black font-medium text-sm sm:text-base hover:border-gray-600"
            >
                Add Members Individually
            </button>
        </div>
    )

    const ModalGroup = () => {
        const addNewMember = () => {
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

        const updateMember = (id: number, field: string, value: string) => {
            setMembers(
                members.map((member) => {
                    if (member.id === id) {
                        return {
                            ...member,
                            [field]: value,
                            // Update initials when first or last name changes
                            ...(field === "firstName" || field === "lastName"
                                ? {
                                    initials:
                                        field === "firstName"
                                            ? value.charAt(0) + member.lastName.charAt(0)
                                            : member.firstName.charAt(0) + value.charAt(0),
                                }
                                : {}),
                        }
                    }
                    return member
                }),
            )
        }

        return (
            <div className="p-4 w-full max-w-full">
                <h3 className="text-start text-xl sm:text-2xl font-semibold mt-3">Add Members to {groupName || "Group"}</h3>

                <div className="flex items-center gap-2 font-medium text-black text-lg sm:text-xl mt-4">
                    <span className="truncate">{groupName || "2024/25 Freshman English Period 5"}</span>
                    <Plus className="text-gray-500 w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
                </div>

                <button
                    onClick={addNewMember}
                    className="rounded-lg py-2 px-2.5 border border-gray-500 font-medium text-black mt-4 mb-6 text-sm sm:text-base"
                >
                    Add a Member
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

    const EditYourProfile = () => (
        <div className="p-4">
            <h3 className="text-2xl text-gray-900 font-semibold">Edit Your Profile</h3>

            <div className="mt-10 flex flex-col mx-auto justify-center items-center max-w-md">
                <div className="flex md:flex-row flex-col items-center justify-center lg:gap-10 gap-5">
                    <div className="md:w-24 md:h-[70px] w-20 h-20 rounded-full mb-8 overflow-hidden transition-all duration-300 relative">
                        <img src={selectedImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                        <input type="file" accept="image/*" className="hidden" id="profile-image-upload" />
                        <label
                            htmlFor="profile-image-upload"
                            className="absolute inset-0 cursor-pointer"
                            style={{ opacity: 0 }}
                        ></label>
                    </div>

                    <div className="grid grid-cols-6 gap-2 mb-10 w-full">
                        {profileImages.map((image, index) => (
                            <button
                                key={index}
                                className={`w-8 h-8 aspect-square rounded-full overflow-hidden transition-all duration-200 ${selectedImage === image ? "ring-2 ring-offset-2 ring-gray-400 transform scale-105" : "hover:scale-105"
                                    }`}
                                onClick={() => setSelectedImage(image)}
                            >
                                <img
                                    src={image || "/placeholder.svg"}
                                    alt={`Profile option ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    type="button"
                    className="px-3 mx-auto py-3 lg:text-lg bg-transparent text-black border border-gray-400 font-medium rounded-xl transition-colors duration-300"
                >
                    Remove Profile Picture
                </button>
            </div>

            <div className="w-full max-w-xl mx-auto rounded-lg p-6">
                <div className="mb-6">
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.firstName ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                        placeholder="Enter your first name"
                    />
                    {errors.firstName && <p className="text-red-500 mt-1 text-sm">First name is required.</p>}
                </div>

                <div className="mb-6">
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.lastName ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                        placeholder="Enter your last name"
                    />
                    {errors.lastName && <p className="text-red-500 mt-1 text-sm">Last name is required.</p>}
                </div>

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full py-3 bg-black text-white font-medium rounded-lg transition-colors duration-300"
                >
                    Continue
                </button>
            </div>
        </div>
    )

    const AdminPanel = () => (
        <div className="p-4">
            <h3 className="text-xl sm:text-2xl font-semibold mt-4">Dummy Admin Section</h3>
            <div className="mt-6 space-y-4">
                <div className="border rounded-md p-4">
                    <h4 className="font-semibold mb-2">User Management</h4>
                    <p className="text-gray-600 text-sm">Manage users and permissions</p>
                </div>
                <div className="border rounded-md p-4">
                    <h4 className="font-semibold mb-2">System Settings</h4>
                    <p className="text-gray-600 text-sm">Configure system preferences</p>
                </div>
                <div className="border rounded-md p-4">
                    <h4 className="font-semibold mb-2">Analytics</h4>
                    <p className="text-gray-600 text-sm">View system analytics and reports</p>
                </div>
            </div>
        </div>
    )

    const SubscriptionPanel = () => (
        <div className="p-4">
            <h3 className="text-xl sm:text-2xl font-semibold mt-4">Dummy Subscription Section</h3>
            <div className="mt-6 space-y-4">
                <div className="border rounded-md p-4">
                    <h4 className="font-semibold mb-2">Current Plan</h4>
                    <p className="text-gray-600 text-sm">Free Plan - 1 Group Limit</p>
                </div>
                <div className="border rounded-md p-4">
                    <h4 className="font-semibold mb-2">Upgrade Options</h4>
                    <p className="text-gray-600 text-sm">Unlock unlimited groups and features</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 text-sm">Upgrade Now</button>
                </div>
            </div>
        </div>
    )

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return <EditYourProfile />
            case "admin":
                return <AdminPanel />
            case "groups":
                switch (groupsView) {
                    case "manage":
                        return <ManageGroup />
                    case "add":
                        return <AddGroup />
                    case "modal":
                        return <ModalGroup />
                    default:
                        return <ManageGroup />
                }
            case "subscription":
                return <SubscriptionPanel />
            default:
                return <EditYourProfile />
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="xl:max-w-5xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl max-w-[95vw] max-h-[95vh] overflow-y-auto py-6 px-3">
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

                    <Navigation />

                    <div className="min-h-[500px] px-5">{renderContent()}</div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

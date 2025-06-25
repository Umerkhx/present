"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"
import type { Group, Member, SubscriptionLimits, TeamMember,Event, ActiveTab, GroupsView, SubscriptionPlan, ViewMode } from "../types"

// App Context State Interface
interface AppContextState {
  // User Profile
  user: {
    firstName: string
    lastName: string
    email: string
    profileImage: string
  }
  setUser: React.Dispatch<
    React.SetStateAction<{
      firstName: string
      lastName: string
      email: string
      profileImage: string
    }>
  >

  // Navigation (Modal specific)
  activeTab: ActiveTab
  setActiveTab: (tab: ActiveTab) => void
  groupsView: GroupsView
  setGroupsView: (view: GroupsView) => void

  // Profile (Modal specific)
  formData: { firstName: string; lastName: string }
  setFormData: React.Dispatch<React.SetStateAction<{ firstName: string; lastName: string }>>
  selectedImage: string
  setSelectedImage: (image: string) => void
  profileSaved: boolean
  setProfileSaved: (saved: boolean) => void

  // Groups (App-wide)
  groupName: string
  setGroupName: (name: string) => void
  members: Member[]
  setMembers: (members: Member[]) => void
  createdGroups: Group[]
  setCreatedGroups: React.Dispatch<React.SetStateAction<Group[]>>
  editingGroupId: string | null
  setEditingGroupId: (id: string | null) => void
  viewingGroupId: string | null
  setViewingGroupId: (id: string | null) => void

  // Events (App-wide)
  events: Event[]
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>
  previousEvents: Event[]
  upcomingEvents: Event[]

  // Subscription (App-wide)
  currentPlan: SubscriptionPlan
  setCurrentPlan: (plan: SubscriptionPlan) => void
  limits: SubscriptionLimits
  getPlanDisplayName: (plan: SubscriptionPlan) => string

  // Admin/Team (App-wide)
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  teamName: string
  setTeamName: (name: string) => void
  isEditingOwner: boolean
  setIsEditingOwner: (editing: boolean) => void
  accountOwner: TeamMember
  setAccountOwner: React.Dispatch<React.SetStateAction<TeamMember>>
  admins: TeamMember[]
  setAdmins: React.Dispatch<React.SetStateAction<TeamMember[]>>
  savedAdmins: TeamMember[]
  setSavedAdmins: React.Dispatch<React.SetStateAction<TeamMember[]>>
  savedTeamData: { teamName: string; accountOwner: TeamMember } | null
  setSavedTeamData: React.Dispatch<React.SetStateAction<{ teamName: string; accountOwner: TeamMember } | null>>
  showInvitationDialog: boolean
  setShowInvitationDialog: (show: boolean) => void

  // Export states
  exportDialogOpen: boolean
  setExportDialogOpen: (open: boolean) => void
  exportStartDate: string
  setExportStartDate: (date: string) => void
  exportEndDate: string
  setExportEndDate: (date: string) => void
  exportByEvent: boolean
  setExportByEvent: (byEvent: boolean) => void
  includeCheckInResponses: boolean
  setIncludeCheckInResponses: (include: boolean) => void
  exportingGroupName: string
  setExportingGroupName: (name: string) => void

  // Actions
  handleProfileSubmit: () => void
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleEditGroup: (groupId: string) => void
  handleDeleteGroup: (groupId: string) => void
  handleViewGroupDetails: (groupId: string) => void
  handleBackToManage: () => void
  handleSaveGroup: () => void
  handleTeamSave: (teamName: string, accountOwner: TeamMember) => void
  handleUpgrade: (plan: SubscriptionPlan) => void
  handleDowngrade: (plan: SubscriptionPlan) => void
  updateMember: (id: number, field: keyof Member, value: string) => void
  updateAccountOwner: (field: keyof TeamMember, value: string) => void
  updateAdmin: (id: string, field: keyof TeamMember, value: string) => void
  removeAdmin: (id: string) => void
  addEvent: (event: Omit<Event, "id">) => void
  removeEvent: (eventId: string) => void
  canAddMoreGroups: boolean
  groupsUsageText: string
  handleEditGroupModal: (groupId: string) => void
}

const AppContext = createContext<AppContextState | undefined>(undefined)

// Subscription limits configuration
const subscriptionLimits: Record<SubscriptionPlan, SubscriptionLimits> = {
  free: {
    maxGroups: 1,
    maxMembersPerGroup: 24,
    maxAdmins: 0,
    canExportData: false,
  },
  plus: {
    maxGroups: 5,
    maxMembersPerGroup: 100,
    maxAdmins: 0,
    canExportData: true,
  },
  pro: {
    maxGroups: 10,
    maxMembersPerGroup: 300,
    maxAdmins: 4,
    canExportData: true,
  },
}

const getPlanDisplayName = (plan: SubscriptionPlan) => {
  switch (plan) {
    case "free":
      return "Present Free"
    case "plus":
      return "Present Plus"
    case "pro":
      return "Present Pro"
  }
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

// Sample events data
const initialEvents: Event[] = [
  {
    id: "1",
    title: "5th Period English 5/9/2025",
    date: "May 9,2025",
    by: "Matteo Zamboni",
    checkIns: "1 Check-In",
    type: "previous",
  },
  {
    id: "2",
    title: "2nd Period Music (24)",
    date: "May 8, 2025",
    by: "Matteo Zamboni",
    checkIns: "32 Check-ins",
    type: "previous",
  },
  {
    id: "3",
    title: "MATH 450 Lecture 12/Field Trip Section B - 2024/2025",
    date: "Apr 21, 2025",
    by: "Matteo Zamboni",
    checkIns: "123 Check-ins",
    type: "previous",
  },
  {
    id: "4",
    title: "Texas McCombs Alumni Meeting",
    date: "Jan 10, 2025",
    by: "Matteo Zamboni",
    checkIns: "73 Check-ins",
    type: "previous",
  },
  {
    id: "5",
    title: "Texas McCombs Alumni Mixer",
    date: "May 21, 2025",
    by: "Matteo Zamboni",
    checkIns: "0 Check-In",
    type: "upcoming",
  },
  {
    id: "6",
    title: "4th Period Art Class (24/25)",
    date: "May 30, 2025",
    by: "Matteo Zamboni",
    checkIns: "0 Check-in",
    type: "upcoming",
  },
  {
    id: "7",
    title: "Dallas Rowing Club Youth Summer Camp Week 1",
    date: "June 21, 2025",
    by: "Matteo Zamboni",
    checkIns: "0 Check-in",
    type: "upcoming",
  },
]

export function AppProvider({ children }: { children: ReactNode }) {

  // User state
  const [user, setUser] = useState({
    firstName: "Matteo",
    lastName: "Zamboni",
    email: "mzamboni@gmail.com",
    profileImage: "/profile.png",
  })

  // Navigation states (Modal specific)
  const [activeTab, setActiveTab] = useState<ActiveTab>("groups")
  const [groupsView, setGroupsView] = useState<GroupsView>("manage")

  // Profile states (Modal specific)
  const [formData, setFormData] = useState({ firstName: "", lastName: "" })
  const [selectedImage, setSelectedImage] = useState(profileImages[0])
  const [profileSaved, setProfileSaved] = useState(false)

  // Group states (App-wide)
  const [groupName, setGroupName] = useState("")
  const [members, setMembers] = useState<Member[]>([
    { id: 1, initials: "MM", firstName: "Marilyn", lastName: "Monroe", bgColor: "bg-purple-400" },
    { id: 2, initials: "TB", firstName: "Tom", lastName: "Brady", bgColor: "bg-cyan-400" },
    { id: 3, initials: "GC", firstName: "George", lastName: "Clooney", bgColor: "bg-green-400" },
    { id: 4, initials: "", firstName: "", lastName: "", bgColor: "bg-gray-400" },
  ])

  // Initialize with sample groups based on the dashboard
  const [createdGroups, setCreatedGroups] = useState<Group[]>([
    {
      id: "1",
      name: "AP English (2nd Period 24-25)",
      memberCount: 24,
    },
    {
      id: "2",
      name: "Freshman English (4th Period 24-25)",
      memberCount: 22,
    },
  ])

  const [editingGroupId, setEditingGroupId] = useState<string | null>(null)
  const [viewingGroupId, setViewingGroupId] = useState<string | null>(null)

  // Events state (App-wide)
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const previousEvents = events.filter((event) => event.type === "previous")
  const upcomingEvents = events.filter((event) => event.type === "upcoming")

  // Subscription states (App-wide)
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan>("plus") // Changed to plus to match dashboard showing 2/5
  const limits = subscriptionLimits[currentPlan]

  // Admin/Team states
  const [viewMode, setViewMode] = useState<ViewMode>("initial")
  const [teamName, setTeamName] = useState("Your superb team")
  const [isEditingOwner, setIsEditingOwner] = useState(false)
  const [accountOwner, setAccountOwner] = useState<TeamMember>({
    id: "owner",
    firstName: "Matteo",
    lastName: "Zamboni",
    email: "mzamboni@gmail.com",
    role: "Account Owner",
    initials: "MZ",
    bgColor: "bg-orange-400",
  })
  const [admins, setAdmins] = useState<TeamMember[]>([
    {
      id: "1",
      firstName: "Marilyn",
      lastName: "Monroe",
      email: "",
      role: "",
      initials: "MM",
      bgColor: "bg-purple-400",
    },
    {
      id: "2",
      firstName: "Barack",
      lastName: "Obama",
      email: "",
      role: "",
      initials: "BO",
      bgColor: "bg-cyan-400",
    },
    {
      id: "3",
      firstName: "George",
      lastName: "Clooney",
      email: "",
      role: "",
      initials: "GC",
      bgColor: "bg-green-400",
    },
    {
      id: "4",
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      initials: "",
      bgColor: "bg-gray-400",
    },
  ])
  const [savedAdmins, setSavedAdmins] = useState<TeamMember[]>([])
  const [savedTeamData, setSavedTeamData] = useState<{ teamName: string; accountOwner: TeamMember } | null>(null)
  const [showInvitationDialog, setShowInvitationDialog] = useState(false)

  // Export states
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [exportStartDate, setExportStartDate] = useState("2025-06-17")
  const [exportEndDate, setExportEndDate] = useState("2025-06-17")
  const [exportByEvent, setExportByEvent] = useState(true)
  const [includeCheckInResponses, setIncludeCheckInResponses] = useState(false)
  const [exportingGroupName, setExportingGroupName] = useState("")

  // Computed values
  const canAddMoreGroups = createdGroups.length < limits.maxGroups
  const groupsUsageText = `You have created ${createdGroups.length}/${limits.maxGroups} Groups`

  // Action handlers
  const handleProfileSubmit = () => {
    const { firstName, lastName } = formData
    if (firstName.trim() && lastName.trim()) {
      setProfileSaved(true)
      setUser((prev) => ({
        ...prev,
        firstName,
        lastName,
      }))
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

  const handleViewGroupDetails = (groupId: string) => {
    const group = createdGroups.find((g) => g.id === groupId)
    if (group) {
      setViewingGroupId(groupId)
      setGroupsView("details")
    }
  }

  const handleBackToManage = () => {
    setViewingGroupId(null)
    setGroupsView("manage")
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

  const handleTeamSave = (teamName: string, accountOwner: TeamMember) => {
    setSavedTeamData({ teamName, accountOwner })
  }

  const handleUpgrade = (plan: SubscriptionPlan) => {
    setCurrentPlan(plan)
    console.log(`Upgraded to ${plan} plan`)
  }

  const handleDowngrade = (plan: SubscriptionPlan) => {
    setCurrentPlan(plan)
    console.log(`Downgraded to ${plan} plan`)
  }

  const updateMember = (id: number, field: keyof Member, value: string) => {
    setMembers(
      members.map((member) => {
        if (member.id === id) {
          const updated = { ...member, [field]: value }
          if (field === "firstName" || field === "lastName") {
            updated.initials =
              (field === "firstName" ? value.charAt(0) : member.lastName.charAt(0)) +
              (field === "lastName" ? value.charAt(0) : member.firstName.charAt(0))
          }
          return updated
        }
        return member
      }),
    )
  }

  const updateAccountOwner = (field: keyof TeamMember, value: string) => {
    setAccountOwner((prev) => {
      const updated = { ...prev, [field]: value }
      if (field === "firstName" || field === "lastName") {
        updated.initials =
          (field === "firstName" ? value.charAt(0) : prev.firstName.charAt(0)) +
          (field === "lastName" ? value.charAt(0) : prev.lastName.charAt(0))
      }
      return updated
    })
  }

  const updateAdmin = (id: string, field: keyof TeamMember, value: string) => {
    setAdmins(
      admins.map((admin) => {
        if (admin.id === id) {
          const updated = { ...admin, [field]: value }
          if (field === "firstName" || field === "lastName") {
            updated.initials =
              (field === "firstName" ? value.charAt(0) : admin.firstName.charAt(0)) +
              (field === "lastName" ? value.charAt(0) : admin.lastName.charAt(0))
          }
          return updated
        }
        return admin
      }),
    )
  }

  const removeAdmin = (id: string) => {
    setAdmins(admins.filter((admin) => admin.id !== id))
  }

  const addEvent = (event: Omit<Event, "id">) => {
    const newEvent = {
      ...event,
      id: Date.now().toString(),
    }
    setEvents((prev) => [...prev, newEvent])
  }

  const removeEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId))
  }

  const handleEditGroupModal = (groupId: string) => {
    const group = createdGroups.find((g) => g.id === groupId)
    if (group) {
      setGroupName(group.name)
      setEditingGroupId(groupId)
      setActiveTab("groups")
      setGroupsView("modal")
    }
  }

  const value: AppContextState = {
    // User
    user,
    setUser,

    // Navigation (Modal)
    activeTab,
    setActiveTab,
    groupsView,
    setGroupsView,

    // Profile (Modal)
    formData,
    setFormData,
    selectedImage,
    setSelectedImage,
    profileSaved,
    setProfileSaved,

    // Groups (App-wide)
    groupName,
    setGroupName,
    members,
    setMembers,
    createdGroups,
    setCreatedGroups,
    editingGroupId,
    setEditingGroupId,
    viewingGroupId,
    setViewingGroupId,

    // Events (App-wide)
    events,
    setEvents,
    previousEvents,
    upcomingEvents,

    // Subscription (App-wide)
    currentPlan,
    setCurrentPlan,
    limits,
    getPlanDisplayName,

    // Admin/Team
    viewMode,
    setViewMode,
    teamName,
    setTeamName,
    isEditingOwner,
    setIsEditingOwner,
    accountOwner,
    setAccountOwner,
    admins,
    setAdmins,
    savedAdmins,
    setSavedAdmins,
    savedTeamData,
    setSavedTeamData,
    showInvitationDialog,
    setShowInvitationDialog,

    // Export states
    exportDialogOpen,
    setExportDialogOpen,
    exportStartDate,
    setExportStartDate,
    exportEndDate,
    setExportEndDate,
    exportByEvent,
    setExportByEvent,
    includeCheckInResponses,
    setIncludeCheckInResponses,
    exportingGroupName,
    setExportingGroupName,

    // Computed values
    canAddMoreGroups,
    groupsUsageText,

    // Actions
    handleProfileSubmit,
    handleFileUpload,
    handleEditGroup,
    handleDeleteGroup,
    handleViewGroupDetails,
    handleBackToManage,
    handleSaveGroup,
    handleTeamSave,
    handleUpgrade,
    handleDowngrade,
    updateMember,
    updateAccountOwner,
    updateAdmin,
    removeAdmin,
    addEvent,
    removeEvent,
    handleEditGroupModal,
  }

  return <AppContext value={value}>{children}</AppContext>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

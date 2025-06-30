export interface LocationData {
  position: {
    lat: number;
    lng: number;
  };
  address: string;
}

export interface EventData {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  openCheckIn: boolean;
  checkAttendeeLocation: boolean;
  radius: number;
  location: any;
  addQuestions: boolean;
}

export interface Option {
  id: string
  text: string
}


export type ActiveTab = "profile" | "admin" | "groups" | "subscription"
export type GroupsView = "manage" | "add" | "modal" | "details"
export type SubscriptionPlan = "free" | "plus" | "pro"
export type ViewMode = "initial" | "edit" | "saved"

export interface Member {
  id: number
  initials: string
  firstName: string
  lastName: string
  studentId?: string
  email?: string
  phone?: string
  bgColor: string
}

export interface TeamMember {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  initials: string
  bgColor: string
}

export interface Group {
  id: string
  name: string
  memberCount: number
  members?: Member[]
}

export interface SubscriptionLimits {
  maxGroups: number
  maxMembersPerGroup: number
  maxAdmins: number
  canExportData: boolean
}

export interface Event {
  id: string
  title: string
  date: string
  by: string
  checkIns: string
  type: "previous" | "upcoming"
}

/// Checkin page types

export interface EventConfig {
  name: string
  creator: {
    name: string
    avatar: string
  }
  date: string
  timeWindow: string
  description: string

  // Check-in configuration
  checkInType: "open" | "group"

  // Group check-in options
  requiresFirstName?: boolean
  requiresLastName?: boolean
  requiresTextField?: boolean
  textFieldLabel?: string

  // Location checking
  requiresLocation?: boolean

  // Questions
  questions?: Question[]
}

export interface Question {
  id: string
  type: "text" | "multiSelect" | "singleSelect"
  question: string
  required: boolean
  options?: string[]
}

export interface FormData {
  firstName?: string
  lastName?: string
  textField?: string
  answers?: Record<string, string | string[]>
}

export interface CheckinBannerProps {
  type: "success" | "unavailable" | "alreadyCheckedIn"
  checkInDate?: string
  checkInTime?: string
}

export interface CheckInFormProps {
  event: EventConfig
  onSubmit: (data: any) => void | Promise<void>
  isSubmitting: boolean
}

export interface EventInfoProps{
  event: EventConfig
}

export interface StatusIndicatorsProps {
  event: EventConfig
}

//////event details types

export interface CheckIn {
    id: number
    time: string
    answers?: Record<string, string>
}

export interface Attendee {
    id: number
    firstName: string
    lastName: string
    avatar: string
    avatarColor: string
    checkedIn: boolean
    time: string
    answers?: Record<string, string>
}

export interface AttendanceStats {
  total: number
  checkedIn: number
  percentage: number
}

export interface AttendanceChartProps {
  attendanceStats: AttendanceStats
  showCount?: boolean
}

export interface CheckIn {
  id: number
  time: string
  answers?: Record<string, string>
}

export interface AttendeesSectionProps {
  checkIns: CheckIn[]
  showQuestions?: boolean
  onExportClick: () => void
}

export interface EventDetailsData {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
}

export interface EventDetailsProps {
  eventData: EventDetailsData;
  handleEventUpdate: (field: string, value: string) => void;
  onExportClick: () => void
}

export interface UpgradedExportModal {
  open: boolean
  onOpenChange: (open: boolean) => void
  eventName: string
  isBlocked: boolean
  isSuccess: boolean
  onUpgrade: () => void
  currentPlan: string
}
import { useState, useMemo } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import EventInformation from "../components/event-details-components/EventInformation"
import AttendanceChart from "../components/event-details-components/AttendenceChart"
import EventInfoSection from "../components/event-details-components/EventInfoSection"
import EventMap from "../components/event-details-components/EventMap"
import AttendeesSection from "../components/event-details-components/AttendeeSection"
import UpgradedExportModal from "../components/event-details-components/UpgradedExportModal"
import { Link } from "react-router-dom"
import { AlignJustify, X } from "lucide-react"
import { cn } from "../lib/utils"
import { useAppContext } from "../context/app-context"
import ModalSystem from "../components/modal-components/modal-system"
import AttendeesSectionAdvanced from "../components/event-details-components/attendees-section-advanced"
import type { Attendee, CheckIn } from "../types"



type DemoVersion =
    | "open-no-location-no-questions-free"
    | "open-location-no-questions"
    | "open-location-questions"
    | "advanced-version"



export default function EventDetailsDemo() {
    const { currentPlan, setCurrentPlan } = useAppContext()
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [demoVersion, setDemoVersion] = useState<DemoVersion>("open-no-location-no-questions-free")
    const [exportDialogOpen, setExportDialogOpen] = useState(false)

    const [eventData, setEventData] = useState({
        name: "MATH 450 Discussion Section A",
        date: "2025-05-09",
        startTime: "12:20",
        endTime: "3:00",
        location: "UT Math Building 123",
        description: "2024/25 Math Discussion Section",
    })

    const checkIns: CheckIn[] = [
        {
            id: 1,
            time: "12:45pm",
            answers: {
                "What is the answer to problem 1.a*": "12x+4",
                "What is the answer to problem 1.b*": "12x+4",
            },
        },
        {
            id: 2,
            time: "12:46pm",
            answers: {
                "What is the answer to problem 1.a*": "15x+13.5",
                "What is the answer to problem 1.b*": "15x+13.5",
            },
        },
        {
            id: 3,
            time: "12:48pm",
            answers: {
                "What is the answer to problem 1.a*": "12x+4",
                "What is the answer to problem 1.b*": "12x+4",
            },
        },
        {
            id: 4,
            time: "12:50pm",
            answers: {
                "What is the answer to problem 1.a*": "No Answer",
                "What is the answer to problem 1.b*": "No Answer",
            },
        },
    ]

    const attendeesAdvanced: Attendee[] = [
        {
            id: 1,
            firstName: "Marilyn",
            lastName: "Monroe",
            avatar: "MM",
            avatarColor: "bg-purple-500",
            checkedIn: true,
            time: "12:45pm",
            answers: {
                "What is the answer to problem 1.a*": "12x+4",
            },
        },
        {
            id: 2,
            firstName: "Barack",
            lastName: "Obama",
            avatar: "BO",
            avatarColor: "bg-cyan-500",
            checkedIn: true,
            time: "12:46pm",
            answers: {
                "What is the answer to problem 1.a*": "15x+13.5",
            },
        },
        {
            id: 3,
            firstName: "George",
            lastName: "Clooney",
            avatar: "GC",
            avatarColor: "bg-green-500",
            checkedIn: false,
            time: "",
            answers: {
                "What is the answer to problem 1.a*": "",
            },
        },
    ]

    const attendanceStats = useMemo(() => {
        const totalAttendees = 28
        const checkedIn = 28
        const percentage = Math.round((checkedIn / totalAttendees) * 100)

        return {
            total: totalAttendees,
            checkedIn,
            percentage,
        }
    }, [])

    const handleEventUpdate = (field: string, value: string) => {
        setEventData((prev) => ({ ...prev, [field]: value }))
    }

    const handleExportClick = () => {
        setExportDialogOpen(true)
    }

    const handleUpgrade = () => {
        setCurrentPlan("plus")
        setExportDialogOpen(false)
        setTimeout(() => {
            setExportDialogOpen(true)
        }, 500)
    }

    const showLocation = demoVersion.includes("location") || demoVersion === "advanced-version"
    const showQuestions = demoVersion === "open-location-questions" || demoVersion === "advanced-version"
    const isExportBlocked = currentPlan === "free"
    const isExportSuccess = currentPlan !== "free"
    const isOpenEvent = demoVersion.includes("open")
    const showCount = demoVersion.includes("open") && !demoVersion.includes("advanced")

    return (
        <div className="  mx-auto ">
            <header className="px-4 py-5 lg:px-8">
                <div className="flex items-center justify-between mx-auto">
                    <div className="flex items-center space-x-2">
                        <img src="/logo.png" width={25} height={25} alt="logo" />
                        <span className="text-2xl font-extrabold text-black">present</span>


                        <div className="flex items-center gap-4">
                            <Select value={demoVersion} onValueChange={(value: DemoVersion) => setDemoVersion(value)}>
                                <SelectTrigger className="w-80">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="open-no-location-no-questions-free">
                                        1. Open Event, No Location, No Questions (Free)
                                    </SelectItem>
                                    <SelectItem value="open-location-no-questions">2. Open Event, Location, No Questions</SelectItem>
                                    <SelectItem value="open-location-questions">3. Open Event, Location, Questions</SelectItem>
                                    <SelectItem value="advanced-version">4. Group Event, Locations, Questions</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex items-center scale-90 gap-4">
                        <Link to={'/check-in'} className="px-5 py-1.5 border border-gray-400 rounded-lg md:block hidden">
                            Check-In
                        </Link>
                        <Link
                            to={'/'}
                            className="px-5 py-1.5 bg-transparent border border-gray-400 text-black rounded-lg md:block hidden hover:bg-gradient-to-r hover:from-[#31CCD6] hover:via-[#66C587] hover:to-[#BBD16B] hover:text-black transition ease-in delay-100 duration-150 cursor-pointer"
                        >
                            Dashboard
                        </Link>
                        <button
                            className="rounded-lg p-1.5 border border-gray-400 md:hidden block relative z-50"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-expanded={mobileMenuOpen}
                            aria-label="Toggle menu"
                        >
                            <div className="relative w-5 h-5 cursor-pointer">
                                <AlignJustify
                                    className={cn(
                                        "w-5 h-5 absolute transition-all duration-300 ease-in-out",
                                        mobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0",
                                    )}
                                />
                                <X
                                    className={cn(
                                        "w-5 h-5 absolute transition-all duration-300 ease-in-out",
                                        mobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90",
                                    )}
                                />
                            </div>
                        </button>
                        <button onClick={() => setDialogOpen(true)}>
                            <img className="rounded-full w-10 h-10 object-cover" src="/profile.png" alt="profile" />
                        </button>
                    </div>
                </div>
            </header>

            <ModalSystem open={dialogOpen} setOpen={setDialogOpen} />

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-6 lg:px-8">
                <div className="grid grid-cols-1 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <EventInformation eventData={eventData} handleEventUpdate={handleEventUpdate} onExportClick={handleExportClick} />

                        <AttendanceChart attendanceStats={attendanceStats} showCount={showCount} />

                        <EventInfoSection eventData={eventData} showLocation={showLocation} isOpenEvent={isOpenEvent} />

                        {showLocation && <EventMap />}

                        {demoVersion === "advanced-version" ? (
                            <AttendeesSectionAdvanced attendees={attendeesAdvanced} onExportClick={handleExportClick} />
                        ) : (
                            <AttendeesSection checkIns={checkIns} showQuestions={showQuestions} onExportClick={handleExportClick} />
                        )}
                    </div>
                </div>
            </main>

            <UpgradedExportModal
                open={exportDialogOpen}
                onOpenChange={setExportDialogOpen}
                eventName={eventData.name}
                isBlocked={isExportBlocked}
                isSuccess={isExportSuccess}
                onUpgrade={handleUpgrade}
                currentPlan={currentPlan}
            />
        </div>
    )
}

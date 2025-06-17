"use client"

import { useMemo, useState } from "react"
import EventHeader from "../components/event-details-components/EventHeader"
import AttendanceChart from "../components/event-details-components/AttendenceChart"
import EventInfoSection from "../components/event-details-components/EventInfoSection"
import EventMap from "../components/event-details-components/EventMap"
import AttendeesSection from "../components/event-details-components/AttendeeSection"
import MobileMenu from "../components/event-details-components/MobileMenu"
import EventInformation from "../components/event-details-components/EventInformation"


export default function EventInfo() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

    const [eventData, setEventData] = useState({
        name: "5th Period English 5/9/2025",
        date: "2025-05-09",
        startTime: "12:20",
        endTime: "13:20",
        location: "UT Math Building 123",
        description: "2024/25 Freshman English Period 5",
    })

    const [attendees, setAttendees] = useState([
        {
            id: 1,
            firstName: "Tom",
            lastName: "Brady",
            avatar: "TB",
            avatarColor: "bg-teal-500",
            checkedIn: true,
            time: "",
            favoriteBook: "The Great Gatsby",
        },
        {
            id: 2,
            firstName: "Marilyn",
            lastName: "Monroe",
            avatar: "MM",
            avatarColor: "bg-purple-500",
            checkedIn: false,
            time: "",
            favoriteBook: "Pride and Prejudice",
        },
        {
            id: 3,
            firstName: "George",
            lastName: "Clooney",
            avatar: "GC",
            avatarColor: "bg-green-500",
            checkedIn: false,
            time: "",
            favoriteBook: "To Kill a Mockingbird",
        },
    ])

    const isTimeWithinWindow = (time: string) => {
        if (!time) return false

        const [hours, minutes] = time.split(":").map(Number)
        const timeInMinutes = hours * 60 + minutes

        const [startHours, startMinutes] = eventData.startTime.split(":").map(Number)
        const startTimeInMinutes = startHours * 60 + startMinutes

        const [endHours, endMinutes] = eventData.endTime.split(":").map(Number)
        const endTimeInMinutes = endHours * 60 + endMinutes

        return timeInMinutes >= startTimeInMinutes && timeInMinutes <= endTimeInMinutes
    }

    const attendanceStats = useMemo(() => {
        const totalAttendees = attendees.length
        const validCheckIns = attendees.filter((attendee) => attendee.time && isTimeWithinWindow(attendee.time)).length

        const percentage = totalAttendees > 0 ? Math.round((validCheckIns / totalAttendees) * 100) : 0

        return {
            total: totalAttendees,
            checkedIn: validCheckIns,
            percentage,
        }
    }, [attendees, eventData.startTime, eventData.endTime])

    const handleEventUpdate = (field: string, value: string) => {
        setEventData((prev) => ({ ...prev, [field]: value }))
    }

    const handleAttendeeTimeChange = (attendeeId: number, time: string) => {
        setAttendees((prev) =>
            prev.map((a) => {
                if (a.id === attendeeId) {
                    return { ...a, time }
                }
                return a
            }),
        )
    }

    const getAttendanceStatus = (attendee: any) => {
        if (!attendee.time) return "No time set"
        if (isTimeWithinWindow(attendee.time)) return "Attended"
        return "Not attended"
    }

    const getStatusColor = (attendee: any) => {
        if (!attendee.time) return "text-gray-500"
        if (isTimeWithinWindow(attendee.time)) return "text-green-600"
        return "text-red-600"
    }

    return (
        <section className=" xl:max-w-screen-5xl lg:max-w-screen-2xl md:max-screen-xl sm:max-w-screen-lg max-w-screen-md mx-auto">
            <EventHeader 
                mobileMenuOpen={mobileMenuOpen} 
                setMobileMenuOpen={setMobileMenuOpen} 
            />

            <main className="max-w-4xl mx-auto px-4 py-6 lg:px-8">
                <div className="grid grid-cols-1 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <EventInformation 
                            eventData={eventData} 
                            handleEventUpdate={handleEventUpdate} 
                        />

                        <AttendanceChart attendanceStats={attendanceStats} />

                        <EventInfoSection eventData={eventData} />

                        <EventMap />

                        <AttendeesSection 
                            attendees={attendees}
                            setAttendees={setAttendees}
                            handleAttendeeTimeChange={handleAttendeeTimeChange}
                            getAttendanceStatus={getAttendanceStatus}
                            getStatusColor={getStatusColor}
                        />
                    </div>
                </div>
            </main>

            <MobileMenu 
                mobileMenuOpen={mobileMenuOpen} 
                setMobileMenuOpen={setMobileMenuOpen} 
            />
        </section>
    )
}
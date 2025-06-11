"use client"

import { AlignJustify, Clock, Copy, Edit, MapPin, Share, Users, X, XIcon } from "lucide-react"
import { useMemo, useState } from "react"
import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"

export default function EventInfo() {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
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

   
    const strokeDashoffset = useMemo(() => {
        const circumference = 251.2 
        return circumference - (attendanceStats.percentage / 100) * circumference
    }, [attendanceStats.percentage])

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





    const handleSaveEdit = () => {
        setIsEditModalOpen(false)
        // for the backend developer: here you would typically save to backend
    }

    const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/event/5th-period-english`

    return (
        <div className="min-h-screen xl:max-w-screen-7xl lg:max-w-screen-2xl md:max-screen-xl sm:max-w-screen-lg max-w-screen-md mx-auto ">

            <header className=" px-4 py-5 lg:px-8">
                <div className="flex items-center justify-between  mx-auto">
                    <div className="flex items-center space-x-2">
                        <img src="/logo.png" width={25} height={25} alt="logo" />
                        <span className="text-2xl font-semibold text-black">present</span>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                            Check-in
                        </Button>
                        <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                            Dashboard
                        </Button>
                        <div className="rounded-lg p-1.5 border border-gray-400 md:hidden block">
                            <AlignJustify className="w-5 h-5" />
                        </div>
                        <img className="rounded-full w-10 h-10 object-cover" src="/profile.png" alt="profile" />
                    </div>
                </div>
            </header>


            <main className="max-w-4xl mx-auto px-4 py-6 lg:px-8">
                <div className="grid grid-cols-1 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className=" rounded-lg p-6">
                            <div className="space-y-4">
                                <div>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{eventData.name}</h1>
                                    <p className="text-sm text-gray-500 mt-1">Event name</p>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <img className="rounded-full w-12 h-12 object-cover" src="/profile.png" alt="profile" />

                                    <div>
                                        <p className="font-semibold text-gray-900">Matteo Zamboni</p>
                                        <p className="text-sm text-gray-500">Created by</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {new Date(eventData.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                        <p className="text-sm text-gray-500">Check-in date</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="time"
                                                value={eventData.startTime}
                                                onChange={(e) => handleEventUpdate("startTime", e.target.value)}
                                                className="text-sm  rounded px-2 py-1"
                                            />
                                            <span className="text-sm">-</span>
                                            <input
                                                type="time"
                                                value={eventData.endTime}
                                                onChange={(e) => handleEventUpdate("endTime", e.target.value)}
                                                className="text-sm  rounded px-2 py-1"
                                            />
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">Check-in window</p>
                                    </div>
                                </div>


                                <div className="flex flex-wrap gap-2 pt-4">
                                    <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm" className="flex items-center space-x-2">
                                                <Share className="w-4 h-4" />
                                                <span>Share</span>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="lg:max-w-2xl md:max-w-xl lg:h-[600px]">
                                            <DialogHeader>
                                                <div className="flex items-center justify-between ">
                                                    <DialogTitle>{eventData.name}</DialogTitle>
                                                    <Button onClick={() => setIsShareModalOpen(false)} variant="outline" size="sm" className="bg-transparent border-none flex items-center space-x-2">
                                                        <XIcon className="w-4 h-4" />
                                                    </Button>

                                                </div>
                                                <div className="flex justify-center items-center py-5">
                                                    <img className="w-52 h-52" width={200} height={200} src="/qr-code.png" alt="qrcode" />
                                                </div>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="share-url" className="font-semibold text-md pl-2">Event Link</Label>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <Input id="share-url" value={shareUrl} readOnly className="flex-1" />
                                                        <Button size="sm" onClick={() => navigator.clipboard.writeText(shareUrl)}>
                                                            <Copy className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label htmlFor="share-url" className="font-semibold text-md pl-2">Event Code</Label>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <Input id="share-url" value={'GHK4-P091'} readOnly className="flex-1" />
                                                        <Button size="sm">
                                                            <Copy className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center space-x-2">

                                                    <Button variant="outline" size="sm" className="bg-black text-white w-2/4 py-1.5 hover:bg-gray-900 hover:text-white">
                                                        See Event Details
                                                    </Button>

                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>

                                    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm" className="flex items-center space-x-2">
                                                <Edit className="w-4 h-4" />
                                                <span>Edit</span>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-lg">
                                            <DialogHeader>
                                                <DialogTitle>Edit Event</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="event-name">Event Name</Label>
                                                    <Input
                                                        id="event-name"
                                                        value={eventData.name}
                                                        onChange={(e) => handleEventUpdate("name", e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="event-date">Date</Label>
                                                    <Input
                                                        id="event-date"
                                                        type="date"
                                                        value={eventData.date}
                                                        onChange={(e) => handleEventUpdate("date", e.target.value)}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <Label htmlFor="start-time">Start Time</Label>
                                                        <Input
                                                            id="start-time"
                                                            type="time"
                                                            value={eventData.startTime}
                                                            onChange={(e) => handleEventUpdate("startTime", e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="end-time">End Time</Label>
                                                        <Input
                                                            id="end-time"
                                                            type="time"
                                                            value={eventData.endTime}
                                                            onChange={(e) => handleEventUpdate("endTime", e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label htmlFor="location">Location</Label>
                                                    <Input
                                                        id="location"
                                                        value={eventData.location}
                                                        onChange={(e) => handleEventUpdate("location", e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="description">Description</Label>
                                                    <Textarea
                                                        id="description"
                                                        value={eventData.description}
                                                        onChange={(e) => handleEventUpdate("description", e.target.value)}
                                                    />
                                                </div>
                                                <div className="flex justify-end space-x-2">
                                                    <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                                                        Cancel
                                                    </Button>
                                                    <Button onClick={handleSaveEdit}>Save Changes</Button>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>

                                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                                        <Copy className="w-4 h-4" />
                                        <span>Duplicate</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                                    >
                                        <X className="w-4 h-4" />
                                        <span>Delete</span>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg p-6 shadow-sm bg-white">
                            <div className="flex items-center space-x-6">
                                <div className="relative">
                                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                                        <defs>
                                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#10b981" />
                                                <stop offset="75%" stopColor="#10b981" />
                                                <stop offset="100%" stopColor="#06b6d4" />
                                            </linearGradient>
                                        </defs>
                                        <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            stroke="url(#progressGradient)"
                                            strokeWidth="8"
                                            fill="none"
                                            strokeDasharray="251.2"
                                            strokeDashoffset={strokeDashoffset}
                                            strokeLinecap="round"
                                            style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-gray-900">{attendanceStats.percentage}%</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {attendanceStats.checkedIn} of {attendanceStats.total} attendees checked in
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {attendanceStats.checkedIn === 0
                                            ? "No one has checked-in yet"
                                            : `${attendanceStats.checkedIn} attendee${attendanceStats.checkedIn > 1 ? "s" : ""} within time window`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className=" rounded-lg p-6 shadow-sm space-y-4">
                            <div className="flex items-start space-x-3">
                                <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-gray-900">Check-in restricted to group members</p>
                                    <p className="text-sm text-gray-500">{eventData.description}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-gray-900">Location: {eventData.location}</p>
                                    <p className="text-sm text-gray-500">Attendees must be within 5000 feet to check in</p>
                                </div>
                            </div>
                        </div>


                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1845.921052062112!2d114.19122837656884!3d22.283970241862264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404005554dd3513%3A0x79b611ab7fd021ac!2sSister%20Wah%20Beef%20Brisket!5e0!3m2!1sen!2s!4v1749140028081!5m2!1sen!2s"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="rounded-lg"
                                />
                            </div>
                        </div>




                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">See who's present</h2>
                                    <p className="text-sm text-gray-500">Event check-ins</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            const newAttendee = {
                                                id: Date.now(),
                                                firstName: "",
                                                lastName: "",
                                                avatar: "",
                                                avatarColor: "bg-gray-500",
                                                checkedIn: false,
                                                time: "",
                                                favoriteBook: "",
                                            }
                                            setAttendees((prev) => [...prev, newAttendee])
                                        }}
                                    >
                                        Add Attendee
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Clock className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="block md:hidden space-y-3">
                                    {attendees.map((attendee) => (
                                        <div key={attendee.id} className="border rounded-lg p-4 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <Avatar className="w-10 h-10">
                                                    <AvatarFallback className={`${attendee.avatarColor} text-white text-sm`}>
                                                        {attendee.firstName.charAt(0)}
                                                        {attendee.lastName.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex items-center space-x-2">
                                                    <span className={`text-xs font-medium ${getStatusColor(attendee)}`}>
                                                        {getAttendanceStatus(attendee)}
                                                    </span>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-500 hover:text-red-700"
                                                        onClick={() => setAttendees((prev) => prev.filter((a) => a.id !== attendee.id))}
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <Label className="text-xs text-gray-500">First Name</Label>
                                                    <Input
                                                        value={attendee.firstName}
                                                        onChange={(e) => {
                                                            setAttendees((prev) =>
                                                                prev.map((a) => (a.id === attendee.id ? { ...a, firstName: e.target.value } : a)),
                                                            )
                                                        }}
                                                        placeholder="First name"
                                                        className="text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="text-xs text-gray-500">Last Name</Label>
                                                    <Input
                                                        value={attendee.lastName}
                                                        onChange={(e) => {
                                                            setAttendees((prev) =>
                                                                prev.map((a) => (a.id === attendee.id ? { ...a, lastName: e.target.value } : a)),
                                                            )
                                                        }}
                                                        placeholder="Last name"
                                                        className="text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-gray-500">Check-in Time</Label>
                                                <Input
                                                    type="time"
                                                    value={attendee.time}
                                                    onChange={(e) => handleAttendeeTimeChange(attendee.id, e.target.value)}
                                                    className="text-sm"
                                                />
                                            </div>
                                            <div>
                                                <Label className="text-xs text-gray-500">What is your favorite book?</Label>
                                                <Input
                                                    value={attendee.favoriteBook}
                                                    onChange={(e) => {
                                                        setAttendees((prev) =>
                                                            prev.map((a) => (a.id === attendee.id ? { ...a, favoriteBook: e.target.value } : a)),
                                                        )
                                                    }}
                                                    placeholder="Enter favorite book"
                                                    className="text-sm"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Status</th>
                                                <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Attendee</th>
                                                <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">First Name</th>
                                                <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Last Name</th>
                                                <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Time</th>
                                                <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                                                    What is your favorite book?
                                                </th>
                                                <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {attendees.map((attendee) => (
                                                <tr key={attendee.id} className="border-b border-gray-100">
                                                    <td className="py-4 px-2">
                                                        <span className={`text-xs font-medium ${getStatusColor(attendee)}`}>
                                                            {getAttendanceStatus(attendee)}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-2">
                                                        <Avatar className="w-8 h-8">
                                                            <AvatarFallback className={`${attendee.avatarColor} text-white text-sm`}>
                                                                {attendee.firstName.charAt(0)}
                                                                {attendee.lastName.charAt(0) || ""}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </td>
                                                    <td className="py-4 px-2">
                                                        <Input
                                                            value={attendee.firstName}
                                                            onChange={(e) => {
                                                                setAttendees((prev) =>
                                                                    prev.map((a) => (a.id === attendee.id ? { ...a, firstName: e.target.value } : a)),
                                                                )
                                                            }}
                                                            placeholder="First name"
                                                            className="text-sm border-0 bg-transparent focus:bg-white focus:border focus:border-gray-300"
                                                        />
                                                    </td>
                                                    <td className="py-4 px-2">
                                                        <Input
                                                            value={attendee.lastName}
                                                            onChange={(e) => {
                                                                setAttendees((prev) =>
                                                                    prev.map((a) => (a.id === attendee.id ? { ...a, lastName: e.target.value } : a)),
                                                                )
                                                            }}
                                                            placeholder="Last name"
                                                            className="text-sm border-0 bg-transparent focus:bg-white focus:border focus:border-gray-300"
                                                        />
                                                    </td>
                                                    <td className="py-4 px-2">
                                                        <Input
                                                            type="time"
                                                            value={attendee.time}
                                                            onChange={(e) => handleAttendeeTimeChange(attendee.id, e.target.value)}
                                                            className="text-sm border-0 bg-transparent focus:bg-white focus:border focus:border-gray-300"
                                                        />
                                                    </td>
                                                    <td className="py-4 px-2">
                                                        <Input
                                                            value={attendee.favoriteBook}
                                                            onChange={(e) => {
                                                                setAttendees((prev) =>
                                                                    prev.map((a) => (a.id === attendee.id ? { ...a, favoriteBook: e.target.value } : a)),
                                                                )
                                                            }}
                                                            placeholder="Enter favorite book"
                                                            className="text-sm border-0 bg-transparent focus:bg-white focus:border focus:border-gray-300"
                                                        />
                                                    </td>
                                                    <td className="py-4 px-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="w-6 h-6 p-0 rounded-full"
                                                            onClick={() => setAttendees((prev) => prev.filter((a) => a.id !== attendee.id))}
                                                        >
                                                            <X className="w-4 h-4 text-gray-400" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>


                    </div>


                </div>
            </main>
        </div>
    )
}

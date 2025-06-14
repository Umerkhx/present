"use client"

import type React from "react"

import { AlertCircle, AlignJustify, Check, Navigation, Users, X } from "lucide-react"
import { useState } from "react"
import { Button } from "..//components/ui/button"
import { Alert, AlertDescription } from "../components/ui/alert"
import { Input } from "../components/ui/input"
import { cn } from "../lib/utils"
import { Dialog, DialogContent, DialogHeader } from "../components/ui/dialog"

export default function CheckInPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        favoriteBook: "",
    })

    const [errors, setErrors] = useState<string[]>([])
    const [isSuccess, setIsSuccess] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [checkInTime, setCheckInTime] = useState("")
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

    const [checkInDate, setCheckInDate] = useState(new Date())
    const [checkInStartTime, setCheckInStartTime] = useState("12:00")
    const [checkInEndTime, setCheckInEndTime] = useState("13:00")

    const eventData = {
        name: "5th Period English 5/9/2025",
        creator: "Matteo Zamboni",
        description: "24/25 Fall Semester Math Discussion",
        correctAnswer: "The Great Gatsby",
    }

    const validateForm = () => {
        const newErrors: string[] = []

        if (!formData.firstName.trim()) newErrors.push("First name is required")
        if (!formData.lastName.trim()) newErrors.push("Last name is required")
        if (!formData.favoriteBook.trim()) newErrors.push("Please answer the question to check in")
        if (
            formData.favoriteBook.trim().toLowerCase() !== eventData.correctAnswer.toLowerCase()
        ) newErrors.push("Incorrect answer to the question. Please try again.")

        const now = new Date()
        const currentTime = now.getHours() * 60 + now.getMinutes()
        const start = parseInt(checkInStartTime.split(":")[0]) * 60 + parseInt(checkInStartTime.split(":")[1])
        const end = parseInt(checkInEndTime.split(":")[0]) * 60 + parseInt(checkInEndTime.split(":")[1])

        if (currentTime < start || currentTime > end) {
            newErrors.push("You are trying to check in outside of the allowed time window.")
        }

        return newErrors
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setErrors([])

        const validationErrors = validateForm()
        if (validationErrors.length > 0) {
            setErrors(validationErrors)
            setIsSubmitting(false)
            return
        }

        await new Promise((resolve) => setTimeout(resolve, 1000))

        const now = new Date()
        const timeString = now.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        setCheckInTime(timeString)
        setIsSuccess(true)
        setIsSubmitting(false)
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors.length > 0) {
            setErrors([])
        }
    }

    return (
        <div className="container mx-auto ">
            <div className="flex flex-wrap items-center justify-between p-4 gap-y-4">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" width={25} height={25} alt="logo" />
                    <span className="font-semibold text-3xl text-zinc-800">Present</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="px-5 py-2 border border-gray-400 rounded-lg md:block hidden">Log-in</div>
                    <button className="px-5 py-2 bg-black text-white rounded-lg md:block hidden hover:bg-gradient-to-r hover:from-[#31CCD6] hover:via-[#66C587] hover:to-[#BBD16B] hover:text-black transition ease-in delay-100 duration-150 cursor-pointer">Create</button>
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
                                )} />
                            <X className={cn(
                                "w-5 h-5 absolute transition-all duration-300 ease-in-out",
                                mobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90",)} />
                        </div>
                    </button>
                </div>
            </div>

            <style>{`
        [data-state="open"][data-radix-collection-item] {
          animation: slideDownAndFade 0.3s ease-out;
        }
        
        @keyframes slideDownAndFade {
          from {
            opacity: 0;
            transform: translate(-50%, -10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>


            <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <DialogContent className="sm:max-w-md w-[95vw] p-0 m-0 fixed top-4 left-1/2 transform -translate-x-1/2 translate-y-0">
                    <DialogHeader className="p-4 pb-0">
                        <div className="flex justify-end items-center">

                            <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-700 p-1">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </DialogHeader>

                    <div className="p-4 space-y-3">
                        <button
                            className="w-full px-5 py-3 border border-gray-400 rounded-lg text-center font-medium hover:bg-gray-50 transition-colors"
                            onClick={() => {
                                setMobileMenuOpen(false)
                            }}
                        >
                            Log-in
                        </button>
                        <button
                            className="w-full px-5 py-3 bg-black text-white rounded-lg text-center font-medium hover:bg-gradient-to-r hover:from-[#31CCD6] hover:via-[#66C587] hover:to-[#BBD16B] hover:text-black transition ease-in delay-100 duration-150 cursor-pointer"
                            onClick={() => {
                                setMobileMenuOpen(false)
                            }}
                        >
                            Create
                        </button>
                    </div>
                </DialogContent>
            </Dialog>


            <main className="lg:max-w-4xl mx-auto mt-10 px-4 py-8 lg:px-8">
                <div className="space-y-8">
                    {isSuccess && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center justify-center space-x-5">
                                <div className="w-8 h-8 border-[3px] border-black rounded-full flex items-center justify-center">
                                    <Check className="w-6 h-6 text-black" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">You've checked-in</h2>
                                    <p className=" text-gray-600">Thanks for marking yourself Present</p>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-center gap-5 text-sm">
                                <span className="font-semibold text-gray-900 text-lg">{checkInDate.toDateString()}</span>
                                <span className="font-semibold text-gray-900 text-lg">{checkInTime}</span>
                            </div>
                        </div>
                    )}

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div>
                                <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">{eventData.name}</h1>
                                <p className="text-sm text-gray-500">Event name</p>
                            </div>

                            <div className="flex items-center space-x-3">
                                <img className="rounded-full w-12 h-12 object-cover" src="/profile.png" alt="profile" />
                                <div className="text-left">
                                    <p className="font-semibold text-gray-900">{eventData.creator}</p>
                                    <p className="text-sm text-gray-500">Created by</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between lg:space-y-0 lg:space-x-8">
                                <div className="">
                                    <input
                                        type="date"
                                        value={checkInDate.toISOString().split("T")[0]}
                                        onChange={(e) => setCheckInDate(new Date(e.target.value))}
                                        className="text-lg font-semibold text-gray-900 bg-transparent text-center outline-none"
                                    />
                                    <p className="text-sm text-gray-500">Check-in date</p>
                                </div>

                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1">
                                        <input
                                            type="time"
                                            value={checkInStartTime}
                                            onChange={(e) => setCheckInStartTime(e.target.value)}
                                            className="text-lg font-semibold text-gray-900 bg-transparent text-center outline-none"
                                        />
                                        <span className="text-lg font-semibold text-gray-900">-</span>
                                        <input
                                            type="time"
                                            value={checkInEndTime}
                                            onChange={(e) => setCheckInEndTime(e.target.value)}
                                            className="text-lg font-semibold text-gray-900 bg-transparent text-center outline-none"
                                        />
                                    </div>
                                    <p className="text-sm text-gray-500">Check-in window</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {errors.length > 0 && (
                                <Alert className="border-red-200 bg-red-50">
                                    <AlertCircle className="h-4 w-4 text-red-600" />
                                    <AlertDescription className="text-red-800">
                                        <ul className="list-disc list-inside space-y-1">
                                            {errors.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    </AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center mt-0.5">
                                        <Users className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Check-in restricted to group members</p>
                                        <p className="text-sm text-gray-500">{eventData.description}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                                        className={`h-12 ${errors.some((e) => e.includes("First name")) ? "border-red-300" : ""}`}
                                    />
                                    <Input
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                                        className={`h-12 ${errors.some((e) => e.includes("Last name")) ? "border-red-300" : ""}`}
                                    />
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <Navigation className="w-5 h-5 text-gray-600 mt-1" />
                                <div>
                                    <p className="font-semibold text-gray-900">Organizer checks your location</p>
                                    <p className="text-sm text-gray-500">You must be close enough to the event to check-in</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">What is your favorite book?*</h3>
                                    <p className="text-sm text-gray-500">Question 1</p>
                                </div>
                                <Input
                                    placeholder="Answer (Required)"
                                    value={formData.favoriteBook}
                                    onChange={(e) => handleInputChange("favoriteBook", e.target.value)}
                                    className={`resize-none ${errors.some((e) => e.toLowerCase().includes("question") || e.toLowerCase().includes("answer")) ? "border-red-300" : ""}`}
                                />
                            </div>

                            {!isSuccess ? (
                                <div className="flex justify-center">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto px-20 h-10 bg-black text-white hover:bg-gradient-to-r hover:from-[#31CCD6] hover:via-[#66C587] hover:to-[#BBD16B] hover:text-black cursor-pointer transition-colors disabled:opacity-50 text-base font-medium"
                                    >
                                        {isSubmitting ? "Checking in..." : "I'm present"}
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex justify-center">
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            setIsSuccess(false)
                                            setFormData({ firstName: "", lastName: "", favoriteBook: "" })
                                            setCheckInTime("")
                                        }}
                                        variant="outline"
                                        className="w-full sm:w-auto px-12 h-12"
                                    >
                                        Check in another person
                                    </Button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </main>
        </div>


    )
}

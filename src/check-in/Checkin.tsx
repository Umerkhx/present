"use client"

import type React from "react"

import { AlertCircle, CheckCircle, Navigation, Users } from "lucide-react"
import { useState } from "react"
import { Button } from "..//components/ui/button"
import { Alert, AlertDescription } from "../components/ui/alert"
import { Input } from "../components/ui/input"

export default function CheckInPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        favoriteBook: "",
    })

    const [errors, setErrors] = useState<string[]>([])
    const [isSuccess, setIsSuccess] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const eventData = {
        name: "5th Period English 5/9/2025",
        creator: "Matteo Zamboni",
        date: "May 9, 2025",
        startTime: "12:20",
        endTime: "1:20",
        description: "24/25 Fall Semester Math Discussion",
        correctAnswer: "The Great Gatsby", // this would be set by the group or event organizer if the user doesn't know the answer it will throw an error
    }

    const validateForm = () => {
        const newErrors: string[] = []

        if (!formData.firstName.trim()) {
            newErrors.push("First name is required")
        }

        if (!formData.lastName.trim()) {
            newErrors.push("Last name is required")
        }

        if (!formData.favoriteBook.trim()) {
            newErrors.push("Please answer the question to check in")
        }

        if (
            formData.favoriteBook.trim() &&
            formData.favoriteBook.trim().toLowerCase() !== eventData.correctAnswer.toLowerCase()
        ) {
            newErrors.push("Incorrect answer to the question. Please try again.")
        }

        return newErrors
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setErrors([])
        setIsSuccess(false)

        const validationErrors = validateForm()

        if (validationErrors.length > 0) {
            setErrors(validationErrors)
            setIsSubmitting(false)
            return
        }

        await new Promise((resolve) => setTimeout(resolve, 1000))

        setIsSuccess(true)
        setIsSubmitting(false)
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors.length > 0) {
            setErrors([])
        }
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center space-y-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900">You are now present!</h1>
                        <p className="text-gray-600">
                            Welcome {formData.firstName} {formData.lastName}. You have successfully checked in to the event.
                        </p>
                    </div>
                    <Button
                        onClick={() => {
                            setIsSuccess(false)
                            setFormData({ firstName: "", lastName: "", favoriteBook: "" })
                        }}
                        variant="outline"
                        className="w-full"
                    >
                        Check in another person
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen xl:max-w-screen-7xl lg:max-w-screen-2xl md:max-screen-xl sm:max-w-screen-lg max-w-screen-md mx-auto ">
            <header className="px-4 py-6 lg:px-8">
                <div className=" mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <img src="/logo.png" width={25} height={25} alt="logo" />
                        <span className="text-2xl font-semibold text-black">present</span>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm">
                            Log-in
                        </Button>
                        <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                            Create
                        </Button>
                    </div>
                </div>
            </header>

            <main className="lg:max-w-4xl mx-auto mt-10 px-4 py-8 lg:px-8">
                <div className="space-y-8">
                    <div className=" space-y-4">
                        <div>
                            <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">{eventData.name}</h1>
                            <p className="text-sm text-gray-500">Event name</p>
                        </div>

                        <div className="flex items-center  space-x-3">
                            <img className="rounded-full w-12 h-12 object-cover" src="/profile.png" alt="profile" />

                            <div className="text-left">
                                <p className="font-semibold text-gray-900">{eventData.creator}</p>
                                <p className="text-sm text-gray-500">Created by</p>
                            </div>
                        </div>

                        <div className="flex  items-center justify-between space-y-4 lg:space-y-0 lg:space-x-8">
                            <div className="text-center">
                                <p className="font-semibold text-gray-900 text-lg">{eventData.date}</p>
                                <p className="text-sm text-gray-500">Check-in date</p>
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-gray-900 text-lg">
                                    {eventData.startTime} pm - {eventData.endTime} pm
                                </p>
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
                                className={` resize-none ${errors.some((e) => e.includes("question") || e.includes("answer") || e.includes("Incorrect"))
                                    ? "border-red-300"
                                    : ""
                                    }`}
                            />
                        </div>
                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="lg:w-2/5 h-12  bg-black text-white hover:bg-gray-800 disabled:opacity-50 text-base font-medium"
                            >
                                {isSubmitting ? "Checking in..." : "I'm present"}
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

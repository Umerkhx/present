import { useState } from "react"
import { CheckinHeader } from "../components/check-in-components/CheckinHeader"
import { CheckinInfo } from "../components/check-in-components/CheckinInfo"
import { CheckInForm } from "../components/check-in-components/CheckinForm"
import { StatusIndicators } from "../components/check-in-components/Status-indicators"
import { CheckinBanner } from "../components/check-in-components/CheckinBanner"
import { EventSelector } from "../components/check-in-components/EventSelector"
import type { EventConfig } from "../types"

export default function EventCheckInPage() {
  const [currentEventKey, setCurrentEventKey] = useState("open")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSelectedEvent, setLastSelectedEvent] = useState("open")

  //this for the demo only: All possible event configurations for client demo
  const eventConfigurations: Record<string, EventConfig> = {
    
    // Basic open event - anyone can check in
    open: {
      name: "MATH 450 Discussion Section A",
      creator: {
        name: "Matteo Zamboni",
        avatar: "/profile.png",
      },
      date: "May 9, 2025",
      timeWindow: "12:20 pm - 3:00 pm",
      description: "24/25 Fall Semester Math Discussion",
      checkInType: "open",
    },

    // Group check-in with first and last name only
    groupNames: {
      name: "MATH 450 Discussion Section A",
      creator: {
        name: "Matteo Zamboni",
        avatar: "/profile.png",
      },
      date: "May 9, 2025",
      timeWindow: "12:20 pm - 3:00 pm",
      description: "24/25 Fall Semester Math Discussion",
      checkInType: "group",
      requiresFirstName: true,
      requiresLastName: true,
      requiresLocation: false,
    },

    // Group check-in with single text field (like Student ID)
    groupTextField: {
      name: "MATH 450 Discussion Section A",
      creator: {
        name: "Matteo Zamboni",
        avatar: "/profile.png",
      },
      date: "May 9, 2025",
      timeWindow: "12:20 pm - 3:00 pm",
      description: "24/25 Fall Semester Math Discussion",
      checkInType: "group",
      requiresTextField: true,
      textFieldLabel: "Student ID",
      requiresLocation: false,
    },

    // Group check-in with names and additional text field
    groupNamesAndText: {
      name: "MATH 450 Discussion Section A",
      creator: {
        name: "Matteo Zamboni",
        avatar: "/profile.png",
      },
      date: "May 9, 2025",
      timeWindow: "12:20 pm - 3:00 pm",
      description: "24/25 Fall Semester Math Discussion",
      checkInType: "group",
      requiresFirstName: true,
      requiresLastName: true,
      requiresTextField: true,
      textFieldLabel: "Student ID",
      requiresLocation: false,
    },

    // Group check-in with location verification
    groupNamesLocation: {
      name: "MATH 450 Discussion Section A",
      creator: {
        name: "Matteo Zamboni",
        avatar: "/profile.png",
      },
      date: "May 9, 2025",
      timeWindow: "12:20 pm - 3:00 pm",
      description: "24/25 Fall Semester Math Discussion",
      checkInType: "group",
      requiresFirstName: true,
      requiresLastName: true,
      requiresLocation: true,
    },

    // Full featured: names, location, and questions
    groupNamesLocationQuestions: {
      name: "MATH 450 Discussion Section A",
      creator: {
        name: "Matteo Zamboni",
        avatar: "/profile.png",
      },
      date: "May 9, 2025",
      timeWindow: "12:20 pm - 3:00 pm",
      description: "24/25 Fall Semester Math Discussion",
      checkInType: "group",
      requiresFirstName: true,
      requiresLastName: true,
      requiresLocation: true,
      questions: [
        {
          id: "1",
          type: "multiSelect",
          question: "What is the answer to problem 1.a*",
          required: true,
          options: ["12x±4", "No Answer", "15x±12", "15x±13.5"],
        },
        {
          id: "2",
          type: "singleSelect",
          question: "What was the answer to problem 1.b*",
          required: true,
          options: ["12x±4", "No Answer", "15x±12", "15x±13.5"],
        },
        {
          id: "3",
          type: "text",
          question: "What was the answer to problem 1.c*",
          required: true,
        },
      ],
    },

    unavailable: {
      name: "MATH 450 Discussion Section A",
      creator: {
        name: "Matteo Zamboni",
        avatar: "/profile.png",
      },
      date: "May 9, 2025",
      timeWindow: "12:20 pm - 3:00 pm",
      description: "24/25 Fall Semester Math Discussion",
      checkInType: "open",
    },
  }

  //This is for the demo : Get the current event - use lastSelectedEvent for success state
  const getSelectedEvent = () => {
    if (currentEventKey === "success") {
      return eventConfigurations[lastSelectedEvent] || eventConfigurations.open
    }
    return eventConfigurations[currentEventKey] || eventConfigurations.open
  }

  const selectedEvent = getSelectedEvent()

  const handleEventChange = (eventKey: string) => {
    if (eventKey !== "success" && eventKey !== "alreadyCheckedIn" && eventKey !== "unavailable") {
      setLastSelectedEvent(eventKey)
    }
    setCurrentEventKey(eventKey)
  }

  ///reminder: this is where the form will be submitted
  const handleFormSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setCurrentEventKey("success")
  }

  const getCurrentDateTime = () => {
    const now = new Date()
    const dateString = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    return { dateString, timeString }
  }

  const renderPageContent = () => {
    const { dateString, timeString } = getCurrentDateTime()

    // Success state after check-in
    if (currentEventKey === "success") {
      return (
        <div className="space-y-8">
          <CheckinBanner type="success" checkInDate={dateString} checkInTime={timeString} />
          <div className="opacity-50 pointer-events-none">
            <CheckinInfo event={selectedEvent} />
            <div className="mt-12">
              <StatusIndicators event={selectedEvent} />
            </div>
            <div className="mt-12 flex justify-center">
              <button className="bg-gray-400 text-white px-12 py-3 text-lg font-medium rounded-lg cursor-not-allowed">
                I'm present
              </button>
            </div>
          </div>
        </div>
      )
    }

    // Already checked in state
    if (currentEventKey === "alreadyCheckedIn") {
      return (
        <div className="space-y-8">
          <CheckinBanner type="alreadyCheckedIn" checkInDate={dateString} checkInTime={timeString} />
          <div className="opacity-50 pointer-events-none">
            <CheckinInfo event={selectedEvent} />
            <div className="mt-12">
              <StatusIndicators event={selectedEvent} />
            </div>
            <div className="mt-12 flex justify-center">
              <button className="bg-gray-400 text-white px-12 py-3 text-lg font-medium rounded-lg cursor-not-allowed">
                I'm present
              </button>
            </div>
          </div>
        </div>
      )
    }

    // Check-in unavailable state
    if (currentEventKey === "unavailable") {
      return (
        <div className="space-y-8">
          <CheckinBanner type="unavailable" />
          <div className="opacity-50 pointer-events-none">
            <CheckinInfo event={selectedEvent} />
            <div className="mt-12">
              <StatusIndicators event={selectedEvent} />
            </div>
            <div className="mt-12 flex justify-center">
              <button className="bg-gray-400 text-white px-12 py-3 text-lg font-medium rounded-lg cursor-not-allowed">
                I'm present
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-12">
        <CheckinInfo event={selectedEvent} />
        <StatusIndicators event={selectedEvent} />
        <CheckInForm event={selectedEvent} onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <CheckinHeader />

      {/*this is only until the backend is connect Demo selector for client presentation */}
      <EventSelector
        currentEventKey={currentEventKey}
        eventKeys={Object.keys(eventConfigurations).concat(["success"])}
        onEventChange={handleEventChange}
      />

      <main className="max-w-2xl mx-auto px-6 py-16">{renderPageContent()}</main>
    </div>
  )
}

"use client"

import { AlignJustify, X, Edit2 } from "lucide-react"
import type React from "react"
import { useState, useEffect } from "react"
import EventDetails from "../components/EventDetails"
import LocationSelector from "../components/LocationSelector"
import CheckInSettings from "../components/CheckInSettings"
import ActionButton from "../components/ActionButton"
import type { EventData } from "../types"
import Toggle from "../components/Toggle"
import { Dialog, DialogContent, DialogHeader } from "../components/ui/dialog"
import { cn } from "../lib/utils"

interface Question {
  id: string
  text: string
  type: "text" | "select"
  required: boolean
  saved?: boolean
}

const EventCheckIn: React.FC = () => {
  const [eventData, setEventData] = useState<EventData>({
    name: "",
    date: new Date(),
    startTime: "12:20",
    endTime: "--:--",
    openCheckIn: true,
    checkAttendeeLocation: true,
    radius: 1000,
    location: null,
    addQuestions: false,
  })

  const [questions, setQuestions] = useState<Question[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  //for the backend dev: Create a default question when addQuestions is toggled on
  useEffect(() => {
    if (eventData.addQuestions && questions.length === 0) {
      setQuestions([
        {
          id: "1",
          text: "",
          type: "text",
          required: false,
          saved: false,
        },
      ])
    }
  }, [eventData.addQuestions, questions.length])

  const handleChange = (name: string, value: any) => {
    setEventData({
      ...eventData,
      [name]: value,
    })
  }

  const handleSubmit = () => {
    console.log("Event data submitted:", eventData)
  }

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...updates } : q)))
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const addQuestion = () => {
    const newQuestion = {
      id: (questions.length + 1).toString(),
      text: "",
      type: "text" as const,
      required: false,
      saved: false,
    }
    setQuestions([...questions, newQuestion])
  }

  const saveQuestion = (id: string) => {
    const question = questions.find((q) => q.id === id)
    if (question && question.text.trim()) {
      updateQuestion(id, { saved: true })
    }
  }

  const editQuestion = (id: string) => {
    updateQuestion(id, { saved: false })
  }

  const creator = {
    name: "Matteo Zamboni",
  }

  return (
    <section className="container mx-auto p-5">
      <div className="flex flex-wrap items-center justify-between p-4 gap-y-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" width={25} height={25} alt="logo" />
          <span className="font-semibold text-3xl text-zinc-800">Present</span>
        </div>



        <div className="flex items-center gap-4">
          <div className="px-5 py-2 border border-gray-400 rounded-lg md:block hidden">Check-In</div>
          <button className="px-5 py-2 bg-black text-white rounded-lg md:block hidden hover:bg-gradient-to-r hover:from-[#31CCD6] hover:via-[#66C587] hover:to-[#BBD16B] hover:text-black transition ease-in delay-100 duration-150 cursor-pointer">Dashboard</button>
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
          <img className="rounded-full w-10 h-10 object-cover" src="/profile.png" alt="profile" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-white min-h-screen shadow-sm pb-6">
        <div className="p-4 sm:p-6">
          <EventDetails eventData={eventData} onChange={handleChange} creator={creator} />

          <CheckInSettings
            openCheckIn={eventData.openCheckIn}
            checkAttendeeLocation={eventData.checkAttendeeLocation}
            addQuestions={eventData.addQuestions}
            onChange={handleChange}
          />

          <LocationSelector />

          <div className="mt-4">
            <p className="text-sm text-gray-700 mb-2">
              Attendees must be this close to check-in: <span className="font-medium">{eventData.radius} ft</span>
            </p>
            <p className="text-xs text-gray-500 mb-4">Check-in radius</p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t">
            <div>
              <p className="font-medium text-gray-800">Add check-in questions</p>
            </div>
            <Toggle enabled={eventData.addQuestions} onChange={(value) => handleChange("addQuestions", value)} />
          </div>

          {eventData.addQuestions && (
            <div className="mt-6 space-y-4">
              {questions.map((question, index) => (
                <div key={question.id} className="mb-4">
                  {question.saved ? (
                    //for the backend dev: Saved question after being added from the user 
                    <div className="mt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 ">{question.text}</h3>
                          <p className="text-sm text-gray-900 mb-2">Question {index + 1}</p>
                          <p className="text-sm text-black">
                            {question.type === "text" ? "Text Response" : "Select Response"}
                          </p>
                        </div>
                        <button
                          onClick={() => editQuestion(question.id)}
                          className="text-gray-400 hover:text-gray-600 p-1"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    //for the backend dev: this is the Editing state - full form
                    <>
                      <div className="flex justify-end items-center mb-2">
                        <button
                          onClick={() => removeQuestion(question.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Type your question here"
                        value={question.text}
                        onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
                        className="w-full p-2 rounded-md mb-4 focus:border "
                      />

                      <div className="flex justify-start items-center mb-2">
                        <div className="text-sm pl-2 -mt-2.5 mb-2 text-gray-900">Question {index + 1}</div>

                      </div>

                      <div className="flex gap-2 mb-4">
                        <button
                          onClick={() => updateQuestion(question.id, { type: "text" })}
                          className={`px-4 py-2 text-sm rounded-md border ${question.type === "text"
                            ? "bg-gray-900 text-white border-gray-900"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                          Text Response
                        </button>
                        <button onClick={() => updateQuestion(question.id, { type: "select" })}
                          className={`px-4 py-2 text-sm rounded-md border ${question.type === "select"
                            ? "bg-gray-900 text-white border-gray-900"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}>
                          Select Response
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Toggle
                            enabled={question.required}
                            onChange={(value) => updateQuestion(question.id, { required: value })}
                          />
                          <span className="text-sm text-gray-700">Required</span>
                        </div>
                        <button
                          onClick={() => saveQuestion(question.id)}
                          disabled={!question.text.trim()}
                          className="px-4 py-1.5 bg-white border border-gray-300 text-gray-800 text-sm rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Save
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}

              <button
                onClick={addQuestion}
                className="w-full py-1 border-2  border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
              >
                Add a check-in question
              </button>
            </div>
          )}

          <div className="mt-6 flex items-center justify-center">
            <ActionButton onClick={handleSubmit} />
          </div>
        </div>
      </div>



      {/*Mobile Menu*/}
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
              Check-In
            </button>
            <button
              className="w-full px-5 py-3 bg-black text-white rounded-lg text-center font-medium hover:bg-gradient-to-r hover:from-[#31CCD6] hover:via-[#66C587] hover:to-[#BBD16B] hover:text-black transition ease-in delay-100 duration-150 cursor-pointer"
              onClick={() => {
                setMobileMenuOpen(false)
              }}
            >
              Dashboard
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default EventCheckIn

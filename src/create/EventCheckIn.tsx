import { AlignJustify, X, XIcon, Copy } from "lucide-react"
import type React from "react"
import { useState, useEffect } from "react"
import EventDetails from "../components/EventDetails"
import LocationSelector from "../components/LocationSelector"
import CheckInSettings from "../components/CheckInSettings"
import ActionButton from "../components/ActionButton"
import type { EventData, Option } from "../types"
import Toggle from "../components/Toggle"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { cn } from "../lib/utils"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import QuestionEditor from "../components/create-components/question-editor"

interface Question {
  id: string
  text: string
  type: "text" | "select"
  required: boolean
  allowMultiSelect: boolean
  options: Option[]
  saved: boolean
}

const EventCheckIn: React.FC = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/event/5th-period-english`;

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
      // Add sample saved questions to match your design
      setQuestions([
        {
          id: "1",
          text: "What dietary restrictions do you have for the event? Please also include any sensitivities",
          type: "select",
          required: false,
          allowMultiSelect: true,
          options: [
            { id: "1", text: "None" },
            { id: "2", text: "Vegetarian" },
            { id: "3", text: "Vegan" },
            { id: "4", text: "No Soy" },
          ],
          saved: true,
        },
        {
          id: "2",
          text: "What was your favorite subject?",
          type: "select",
          required: false,
          allowMultiSelect: false,
          options: [
            { id: "1", text: "Math" },
            { id: "2", text: "Engineering" },
            { id: "3", text: "Aerodynamics" },
            { id: "4", text: "Lab" },
          ],
          saved: true,
        },
        {
          id: "3",
          text: "What is your LinkedIn?",
          type: "text",
          required: true,
          allowMultiSelect: false,
          options: [],
          saved: true,
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



  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...updates } : q)))
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: "",
      type: "text",
      required: false,
      allowMultiSelect: false,
      options: [
        { id: "1", text: "" },
        { id: "2", text: "" },
      ],
      saved: false,
    }
    setQuestions([...questions, newQuestion])
  }


  const saveQuestion = (id: string) => {
    const question = questions.find((q) => q.id === id)
    if (question && question.text.trim()) {
      if (question.type === "select") {
        // For select questions, ensure at least one option has text
        const validOptions = question.options.filter((opt) => opt.text.trim())
        if (validOptions.length > 0) {
          // Update the question with only valid options and mark as saved
          updateQuestion(id, {
            saved: true,
            options: validOptions,
          })
        }
      } else {
        // For text questions, just save
        updateQuestion(id, { saved: true })
      }
    }
  }

  const editQuestion = (id: string) => {
    updateQuestion(id, { saved: false })
  }



  const handleSubmit = () => {
    const eventPayload = {
      ...eventData,
      questions: questions
        .filter((q) => q.saved)
        .map((q) => ({
          id: q.id,
          text: q.text,
          type: q.type,
          required: q.required,
          allowMultiSelect: q.allowMultiSelect,
          options: q.type === "select" ? q.options.filter((opt) => opt.text.trim()) : [],
        })),
    }

    console.log("Event data for backend:", eventPayload)
    // TODO: Send to backend API
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
          <Link to={'/check-in'} className="px-5 py-2 border border-gray-400 rounded-lg md:block hidden">Check-In</Link>
          <Link to={'/'} className="px-5 py-2 bg-black text-white rounded-lg md:block hidden hover:bg-gradient-to-r hover:from-[#31CCD6] hover:via-[#66C587] hover:to-[#BBD16B] hover:text-black transition ease-in delay-100 duration-150 cursor-pointer">Dashboard</Link>
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
            <div className="space-y-6 mt-5">
              {questions.map((question, index) => (
                <QuestionEditor
                  key={question.id}
                  question={question}
                  questionIndex={index}
                  onUpdate={updateQuestion}
                  onRemove={removeQuestion}
                  onSave={saveQuestion}
                  onEdit={editQuestion}
                />
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
            <ActionButton onClick={() => {
              handleSubmit();
              setIsShareModalOpen(true);
            }} />
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

              <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-700 p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
          </DialogHeader>

          <div className="p-4 space-y-3 flex flex-col items-center">
            <Link to={'/check-in'}
              className="w-full px-5 py-3 border border-gray-400 rounded-lg text-center font-medium hover:bg-gray-50 transition-colors"
            >
              Check-In
            </Link>
            <Link to={'/'}
              className="w-full px-5 py-3 bg-black text-white rounded-lg text-center font-medium hover:bg-gradient-to-r hover:from-[#31CCD6] hover:via-[#66C587] hover:to-[#BBD16B] hover:text-black transition ease-in delay-100 duration-150 cursor-pointer"
            >
              Dashboard
            </Link>
          </div>
        </DialogContent>
      </Dialog>



      <div className="flex flex-wrap gap-2 pt-4">
        <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
          <DialogTrigger asChild>
          </DialogTrigger>
          <DialogContent className="lg:-mt-12 md:max-w-xl lg:h-[500px]">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle>{eventData.name}</DialogTitle>
                <Button onClick={() => setIsShareModalOpen(false)} variant="outline" size="sm" className="bg-transparent border-none flex items-center space-x-2">
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex justify-center items-center py-2">
                <img className="w-44 h-44" width={200} height={200} src="/qr-code.png" alt="qrcode" />
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
                <Label htmlFor="share-code" className="font-semibold text-md pl-2">Event Code</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input id="share-code" value={'GHK4-P091'} readOnly className="flex-1" />
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
      </div>
    </section>
  )
}

export default EventCheckIn
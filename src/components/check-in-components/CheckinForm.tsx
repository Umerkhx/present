"use client"
import { useState } from "react"
import type { CheckInFormProps, Question } from "../../types"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface FormData {
  firstName?: string
  lastName?: string
  textField?: string
  answers: Record<string, string | string[]>
}



export function CheckInForm({ event, onSubmit, isSubmitting }: CheckInFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    textField: "",
    answers: {},
  })

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAnswerChange = (questionId: string, answer: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  // For open events, no form needed
  if (event.checkInType === "open") {
    return (
      <div className="flex justify-center pt-8">
        <Button
          onClick={() => onSubmit({
              answers: {}
          })}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-20 h-10 bg-black text-white hover:bg-gradient-to-r hover:from-[#31CCD6] hover:via-[#66C587] hover:to-[#BBD16B] hover:text-black cursor-pointer transition-colors disabled:opacity-50 text-base font-medium"
        >
          {isSubmitting ? "Checking in..." : "I'm present"}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Name Fields */}
      {(event.requiresFirstName || event.requiresLastName) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {event.requiresFirstName && (
            <Input
              placeholder="First Name"
              value={formData.firstName || ""}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              required
              className="h-12"
            />
          )}
          {event.requiresLastName && (
            <Input
              placeholder="Last Name"
              value={formData.lastName || ""}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              required
              className="h-12"
            />
          )}
        </div>
      )}

      {/* Text Field */}
      {event.requiresTextField && (
        <Input
          placeholder={event.textFieldLabel || "Student ID"}
          value={formData.textField || ""}
          onChange={(e) => handleInputChange("textField", e.target.value)}
          required
          className="h-12"
        />
      )}

      {/* Questions */}
      {event.questions?.map((question) => (
        <QuestionField
          key={question.id}
          question={question}
          value={formData.answers?.[question.id]}
          onChange={(answer) => handleAnswerChange(question.id, answer)}
        />
      ))}

      {/* Submit Button */}
      <div className="flex justify-center pt-8">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-20 h-10 bg-black text-white hover:bg-gradient-to-r hover:from-[#31CCD6] hover:via-[#66C587] hover:to-[#BBD16B] hover:text-black cursor-pointer transition-colors disabled:opacity-50 text-base font-medium"
        >
          {isSubmitting ? "Checking in..." : "I'm present"}
        </Button>
      </div>
    </form>
  )
}

interface QuestionFieldProps {
  question: Question
  value?: string | string[]
  onChange: (answer: string | string[]) => void
}

function QuestionField({ question, value, onChange }: QuestionFieldProps) {
  if (question.type === "text") {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {question.question}
            {question.required && "*"}
          </h3>
          <p className="text-sm text-gray-500">Question {question.id}</p>
        </div>
        <Input
          placeholder="Answer (Required)"
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          required={question.required}
          className="h-12"
        />
      </div>
    )
  }

  if (question.type === "multiSelect") {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {question.question}
            {question.required && "*"}
          </h3>
          <p className="text-sm text-gray-500">Multi Select Response</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {question.options?.map((option) => (
            <Button
              key={option}
              type="button"
              variant="outline"
              className={`${
                (value as string[])?.includes(option) ? "bg-gray-900 text-white" : "bg-white text-gray-700"
              }`}
              onClick={() => {
                const currentValues = (value as string[]) || []
                const newValues = currentValues.includes(option)
                  ? currentValues.filter((v) => v !== option)
                  : [...currentValues, option]
                onChange(newValues)
              }}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    )
  }

  if (question.type === "singleSelect") {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {question.question}
            {question.required && "*"}
          </h3>
          <p className="text-sm text-gray-500">Select Response</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {question.options?.map((option) => (
            <Button
              key={option}
              type="button"
              variant="outline"
              className={`${value === option ? "bg-gray-900 text-white" : "bg-white text-gray-700"}`}
              onClick={() => onChange(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    )
  }

  return null
}

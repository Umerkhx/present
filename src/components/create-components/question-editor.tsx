"use client"

import { X, Edit2, Plus } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Switch } from "../ui/switch"
import type { Option } from "../../types"

 interface Question {
  id: string
  text: string
  type: "text" | "select"
  required: boolean
  allowMultiSelect: boolean
  options: Option[]
  saved: boolean
}

interface QuestionEditorProps {
  question: Question
  questionIndex: number
  onUpdate: (id: string, updates: Partial<Question>) => void
  onRemove: (id: string) => void
  onSave: (id: string) => void
  onEdit: (id: string) => void
}

export default function QuestionEditor({
  question,
  questionIndex,
  onUpdate,
  onRemove,
  onSave,
  onEdit,
}: QuestionEditorProps) {
  const updateOption = (optionId: string, text: string) => {
    const updatedOptions = question.options.map((option:any) => (option.id === optionId ? { ...option, text } : option))
    onUpdate(question.id, { options: updatedOptions })
  }

  const removeOption = (optionId: string) => {
    if (question.options.length > 1) {
      const updatedOptions = question.options.filter((option:any) => option.id !== optionId)
      onUpdate(question.id, { options: updatedOptions })
    }
  }

  const addOption = () => {
    const newOption: Option = {
      id: Date.now().toString(),
      text: "",
    }
    onUpdate(question.id, { options: [...question.options, newOption] })
  }

  if (question.saved) {
    // Saved state - display mode exactly like the design
    return (
      <div className="space-y-4 py-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{question.text}</h3>
            <p className="text-sm text-gray-600 mb-3">Question {questionIndex + 1}</p>

            <div className="mb-3">
              <span className="text-sm text-gray-900 font-medium">
                {question.type === "select"
                  ? question.allowMultiSelect
                    ? "Multi Select Response"
                    : "Select Response"
                  : question.required
                    ? "Text Response (Required)"
                    : "Text Response"}
              </span>
            </div>

            {question.type === "select" && (
              <div className="flex flex-wrap gap-2">
                {question.options
                  .filter((opt:any) => opt.text.trim())
                  .map((option:any) => (
                    <span
                      key={option.id}
                      className="px-3 py-2 bg-transparent text-gray-800 text-sm rounded-lg border border-gray-200"
                    >
                      {option.text}
                    </span>
                  ))}
              </div>
            )}
          </div>
          <button
            onClick={() => onEdit(question.id)}
            className="text-gray-400 hover:text-gray-600 p-1 ml-4 flex-shrink-0"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  // Editing state - form mode
  return (
    <div className="space-y-4 border border-gray-200 rounded-lg p-4">
      <div className="flex justify-end">
        <button onClick={() => onRemove(question.id)} className="text-gray-400 hover:text-red-500 p-1">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div>
        <Input
          type="text"
          placeholder="Type your question here"
          value={question.text}
          onChange={(e) => onUpdate(question.id, { text: e.target.value })}
          className="w-full text-base  outline-0 border-0 border-b border-b-gray-300 rounded-lg"
        />
      </div>

      <div>
        <span className="text-sm text-gray-600">Question {questionIndex + 1}</span>
      </div>

      <div className="flex gap-2">
        <Button
          variant={question.type === "text" ? "default" : "outline"}
          onClick={() => onUpdate(question.id, { type: "text" })}
          className={`px-4 py-2 text-sm rounded-lg ${
            question.type === "text"
              ? "bg-gray-900 text-white hover:bg-gray-800"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          Text Response
        </Button>
        <Button
          variant={question.type === "select" ? "default" : "outline"}
          onClick={() => onUpdate(question.id, { type: "select" })}
          className={`px-4 py-2 text-sm rounded-lg ${
            question.type === "select"
              ? "bg-gray-900 text-white hover:bg-gray-800"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          Select Response
        </Button>
      </div>

      {question.type === "select" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-medium text-gray-900">Options</h4>
            <Button variant="ghost" size="sm" onClick={addOption} className="text-gray-600 hover:text-gray-800 p-1">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {question.options.map((option:any, index:any) => (
              <div key={option.id} className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Add Option"
                      value={option.text}
                      onChange={(e) => updateOption(option.id, e.target.value)}
                      className="w-full text-sm  outline-0 border-0 border-b border-b-gray-300 rounded-lg"
                    />
                  </div>
                  {question.options.length > 1 && (
                    <button onClick={() => removeOption(option.id)} className="text-gray-400 hover:text-red-500 p-1">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="text-xs text-gray-500 ml-1">Option {index + 1}</div>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Allow multi select</span>
              <Switch
                checked={question.allowMultiSelect}
                onCheckedChange={(checked) => onUpdate(question.id, { allowMultiSelect: checked })}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <Switch
            checked={question.required}
            onCheckedChange={(checked) => onUpdate(question.id, { required: checked })}
          />
          <span className="text-sm text-gray-700">Required</span>
        </div>
        <Button
          onClick={() => onSave(question.id)}
          disabled={
            !question.text.trim() || (question.type === "select" && !question.options.some((opt:any) => opt.text.trim()))
          }
          variant="outline"
          className="px-6 py-2 bg-white border border-gray-300 text-gray-800 text-sm rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save
        </Button>
      </div>
    </div>
  )
}

"use client"

import { X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog"
import { useAppContext } from "../../context/app-context"

export default function ExportDialog() {
  const {
    exportDialogOpen,
    setExportDialogOpen,
    exportStartDate,
    setExportStartDate,
    exportEndDate,
    setExportEndDate,
    exportByEvent,
    setExportByEvent,
    includeCheckInResponses,
    setIncludeCheckInResponses,
    exportingGroupName,
    currentPlan,
    handleUpgrade,
  } = useAppContext()

  const hasExportAccess = currentPlan === "plus" || currentPlan === "pro"

  const handleExport = () => {
    if (!hasExportAccess) return

    // Create mock Excel data
    const data = [
      ["Event Name", "Date", "Attendee", "Check-in Time", "Status"],
      [`${exportingGroupName} Event`, exportStartDate, "John Doe", "9:00 AM", "Present"],
      [`${exportingGroupName} Event`, exportStartDate, "Jane Smith", "9:05 AM", "Present"],
      [`${exportingGroupName} Event`, exportStartDate, "Bob Johnson", "9:10 AM", "Present"],
    ]

    // Convert to CSV format
    const csvContent = data.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)

    // Create download link
    const link = document.createElement("a")
    link.href = url
    link.download = `${exportingGroupName}_${exportStartDate}_to_${exportEndDate}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    setExportDialogOpen(false)
  }

  if (!hasExportAccess) {
    return (
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader className="flex flex-row items-center justify-between">
            <h2 className="text-lg font-semibold">Export {exportingGroupName}</h2>
            <button onClick={() => setExportDialogOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </DialogHeader>

          <div className="p-6 text-center">
            <div className="border border-gray-400 rounded-lg h-36 p-8 mb-6">
              <h3 className="text-lg font-semibold mb-2">Upgrade to Present Pro to unlock group export features</h3>
              <p className="text-gray-600 text-sm">Plus and Pro users can export data from individual events</p>
            </div>

            <button
              onClick={() => {
                setExportDialogOpen(false)
                handleUpgrade("pro")
              }}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Upgrade
            </button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">Export {exportingGroupName}</h2>
          <button onClick={() => setExportDialogOpen(false)} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Date Range */}
          <div>
            <div className="flex items-center gap-3 text-lg font-medium mb-2">
              <input
                type="text"
                value={exportStartDate}
                onChange={(e) => setExportStartDate(e.target.value)}
                className="border-none bg-transparent p-0 text-lg font-medium focus:outline-none"
                placeholder="June 17, 2025"
              />
              <span className="text-gray-500">-</span>
              <input
                type="text"
                value={exportEndDate}
                onChange={(e) => setExportEndDate(e.target.value)}
                className="border-none bg-transparent p-0 text-lg font-medium focus:outline-none"
                placeholder="June 17, 2025"
              />
            </div>
            <p className="text-sm text-gray-600">Export date range</p>
          </div>

          {/* Export Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-start gap-6">
              <button
                onClick={() => setExportByEvent(!exportByEvent)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  exportByEvent ? "bg-black" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    exportByEvent ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-base">Export by event</span>
            </div>

            <div className="flex items-center justify-start gap-6">
              <button
                onClick={() => setIncludeCheckInResponses(!includeCheckInResponses)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  includeCheckInResponses ? "bg-black" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    includeCheckInResponses ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-base">Include check-in question responses</span>
            </div>
          </div>

          <button
            onClick={handleExport}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Export
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

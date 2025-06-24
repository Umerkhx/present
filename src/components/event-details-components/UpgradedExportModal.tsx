import { X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import type { UpgradedExportModal } from "../../types"



export default function UpgradedExportModal({
  open,
  onOpenChange,
  eventName,
  isBlocked,
  isSuccess,
  onUpgrade,
}: UpgradedExportModal) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Export {eventName}</DialogTitle>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="py-6">
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center space-y-4">
            {isBlocked ? (
              <>
                <h3 className="text-lg font-semibold">Upgrade to Present Plus to unlock event export features</h3>
                <p className="text-gray-600">Plus and Pro users can export data from individual events</p>
                <Button onClick={onUpgrade} className="w-full bg-black text-white hover:bg-gray-800">
                  Upgrade
                </Button>
              </>
            ) : isSuccess ? (
              <>
                <h3 className="text-lg font-semibold">Your download will begin shortly</h3>
                <p className="text-gray-600">Click the download button again to retry</p>
                <Button onClick={() => onOpenChange(false)} className="w-full bg-black text-white hover:bg-gray-800">
                  Back
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

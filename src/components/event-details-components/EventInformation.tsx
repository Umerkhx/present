import  { useState } from 'react';
import { Share, Edit, Copy, X, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import ModalSystem from '../modal-components/modal-system';

interface EventData {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
}

interface EventDetailsProps {
  eventData: EventData;
  handleEventUpdate: (field: string, value: string) => void;
}

export default function EventInformation({ eventData, handleEventUpdate }: EventDetailsProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/event/5th-period-english`;

  return (
    <div className="rounded-lg p-6">
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
                className="text-sm rounded px-2 py-1"
              />
              <span className="text-sm">-</span>
              <input
                type="time"
                value={eventData.endTime}
                onChange={(e) => handleEventUpdate("endTime", e.target.value)}
                className="text-sm rounded px-2 py-1"
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
                <div className="flex items-center justify-between">
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

          <Button onClick={() => { setDialogOpen(true) }} variant="outline" size="sm" className="flex items-center space-x-2 cursor-pointer">
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </Button>
          
          <ModalSystem open={dialogOpen} setOpen={setDialogOpen} />

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
  );
}
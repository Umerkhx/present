import { useState } from 'react';
import { Share, Edit, Copy, X } from 'lucide-react';
import { Button } from '../ui/button';
import ModalSystem from '../modal-components/modal-system';
import type { EventDetailsProps } from '../../types';



export default function EventInformation({ eventData,  onExportClick }: EventDetailsProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);


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
            <p className="font-semibold text-gray-900">
              {eventData.startTime} pm - {eventData.endTime} pm
            </p>
            <p className="text-sm text-gray-500 mt-1">Check-in window</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-4">

          <Button onClick={onExportClick} variant="outline" size="sm" className="flex items-center space-x-2">
            <Share className="w-4 h-4" />
            <span>Share</span>
          </Button>


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
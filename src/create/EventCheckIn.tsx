import { AlignJustify } from 'lucide-react';
import React, { useState } from 'react';
import EventDetails from '../components/EventDetails';
import LocationSelector from '../components/LocationSelector';
import CheckInSettings from '../components/CheckInSettings';
import ActionButton from '../components/ActionButton';
import type { EventData } from '../types';
import Toggle from '../components/Toggle';


const EventCheckIn: React.FC = () => {
  const [eventData, setEventData] = useState<EventData>({
    name: '',
    date: new Date(),
    startTime: '12:20',
    endTime: '--:--',
    openCheckIn: true,
    checkAttendeeLocation: true,
    radius: 1000,
    location: null,
    addQuestions: false,
  });

  const handleChange = (name: string, value: any) => {
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log('Event data submitted:', eventData);
  };


  const creator = {
    name: 'Matteo Zamboni',
  };



  return (
    <section className="max-w-screen mx-auto p-5">
      <div className="flex flex-wrap items-center justify-between p-4 gap-y-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" width={25} height={25} alt="logo" />
          <span className="font-semibold text-3xl text-zinc-800">Present</span>
        </div>


        <div className="flex items-center gap-4">
          <div className="px-4 py-1.5 border border-gray-400 rounded-lg md:block hidden">
            Check-In
          </div>
          <div className="px-4 py-1.5 border border-gray-400 rounded-lg md:block hidden">
            Dashboard
          </div>
          <div className="rounded-lg p-1.5 border border-gray-400 md:hidden block">
            <AlignJustify className="w-5 h-5" />
          </div>
          <img className="rounded-full w-10 h-10 object-cover" src="/profile.png" alt="profile" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-white min-h-screen shadow-sm pb-6">
        <div className="p-4 sm:p-6">
          <EventDetails
            eventData={eventData}
            onChange={handleChange}
            creator={creator}
          />

          <CheckInSettings
            openCheckIn={eventData.openCheckIn}
            checkAttendeeLocation={eventData.checkAttendeeLocation}
            addQuestions={eventData.addQuestions}
            onChange={handleChange}
          />

          <LocationSelector />

          <div className="mt-4 ">
            <p className="text-sm text-gray-700 mb-2">
              Attendees must be this close to check-in: <span className="font-medium">{eventData.radius} ft</span>
            </p>
            <p className="text-xs text-gray-500 mb-4">Check-in radius</p>


          </div>

          <div className="flex items-center gap-4 pt-4 border-t">
            <div>
              <p className="font-medium text-gray-800">Add check-in questions</p>
            </div>
            <Toggle
              enabled={eventData.addQuestions}
              onChange={(value) => handleChange('addQuestions', value)}
            />
          </div>

          <div className="mt-6">
            <ActionButton onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCheckIn;
import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import type { EventData } from '../types';

interface EventDetailsProps {
    eventData: EventData;
    onChange: (name: string, value: any) => void;
    creator: {
        name: string;
    };
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventData, onChange, creator }) => {
    const formattedDate = format(eventData.date, 'MMM d, yyyy');



    return (
        <div className="mb-6">
            <div className="mb-4">
                <label htmlFor="eventName" className="block text-lg text-gray-400 font-light mb-1">
                    Add a name
                </label>
                <input
                    type="text"
                    id="eventName"
                    placeholder="Event name"
                    className="w-full border-b border-gray-300 pb-2 text-gray-800 focus:outline-none focus:border-blue-500 transition-colors"
                    value={eventData.name}
                    onChange={(e) => onChange('name', e.target.value)}
                />
            </div>

            <div className="flex items-center gap-3 my-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src="/profile.png" alt={creator.name} className="w-full h-full object-cover" />
                </div>
                <div>
                    <p className="font-medium text-gray-900">{creator.name}</p>
                    <p className="text-sm text-gray-500">Created by</p>
                </div>
            </div>

            <div className="mt-6 grid lg:grid-cols-2 grid-cols-1 gap-4 items-center">
                <div className="">
                    <div className="pointer-events-none">
                        <span className="text-gray-700 text-xl font-semibold">{formattedDate}</span>
                        <div className="flex items-center gap-2 mb-1">
                            <Calendar size={16} className="text-gray-500" />
                            <label htmlFor="eventDate" className="text-sm text-gray-700">
                                Check-in Date
                            </label>
                        </div>
                    </div>
                </div>


                <div className="flex items-center gap-2">
                    <div className="w-2/3">

                        <input
                            type="time"
                            id="startTime"
                            className="w-full  rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={eventData.startTime}
                            onChange={(e) => onChange('startTime', e.target.value)}
                        />
                        <div className="flex items-center gap-2 mb-1">
                            <Clock size={16} className="text-gray-500" />
                            <label htmlFor="startTime" className="text-sm text-gray-700">
                                Check-in start time
                            </label>
                        </div>
                    </div>
                    <div className="w-1/2">
                      
                        <input
                            type="time"
                            id="endTime"
                            className="w-full  rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={eventData.endTime}
                            onChange={(e) => onChange('endTime', e.target.value)}
                        />

                          <div className="flex items-center gap-2 mb-1">
                            <Clock size={16} className="text-gray-500" />
                            <label htmlFor="endTime" className="text-sm text-gray-700">
                               Check-in end time
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
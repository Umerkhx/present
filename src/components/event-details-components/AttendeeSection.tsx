import React from 'react';
import { Clock, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface Attendee {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  avatarColor: string;
  checkedIn: boolean;
  time: string;
  favoriteBook: string;
}

interface AttendeesSectionProps {
  attendees: Attendee[];
  setAttendees: React.Dispatch<React.SetStateAction<Attendee[]>>;
  handleAttendeeTimeChange: (attendeeId: number, time: string) => void;
  getAttendanceStatus: (attendee: Attendee) => string;
  getStatusColor: (attendee: Attendee) => string;
}

export default function AttendeesSection({ 
  attendees, 
  setAttendees, 
  handleAttendeeTimeChange, 
  getAttendanceStatus, 
  getStatusColor 
}: AttendeesSectionProps) {
  const addAttendee = () => {
    const newAttendee = {
      id: Date.now(),
      firstName: "",
      lastName: "",
      avatar: "",
      avatarColor: "bg-gray-500",
      checkedIn: false,
      time: "",
      favoriteBook: "",
    };
    setAttendees((prev) => [...prev, newAttendee]);
  };

  const removeAttendee = (id: number) => {
    setAttendees((prev) => prev.filter((a) => a.id !== id));
  };

  const updateAttendee = (id: number, field: string, value: string) => {
    setAttendees((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">See who's present</h2>
          <p className="text-sm text-gray-500">Event check-ins</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={addAttendee}>
            Add Attendee
          </Button>
          <Button variant="ghost" size="sm">
            <Clock className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Mobile View */}
        <div className="block md:hidden space-y-3">
          {attendees.map((attendee) => (
            <div key={attendee.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className={`${attendee.avatarColor} text-white text-sm`}>
                    {attendee.firstName.charAt(0)}
                    {attendee.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-medium ${getStatusColor(attendee)}`}>
                    {getAttendanceStatus(attendee)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeAttendee(attendee.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-gray-500">First Name</Label>
                  <Input
                    value={attendee.firstName}
                    onChange={(e) => updateAttendee(attendee.id, 'firstName', e.target.value)}
                    placeholder="First name"
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Last Name</Label>
                  <Input
                    value={attendee.lastName}
                    onChange={(e) => updateAttendee(attendee.id, 'lastName', e.target.value)}
                    placeholder="Last name"
                    className="text-sm"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Check-in Time</Label>
                <Input
                  type="time"
                  value={attendee.time}
                  onChange={(e) => handleAttendeeTimeChange(attendee.id, e.target.value)}
                  className="text-sm"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500">What is your favorite book?</Label>
                <Input
                  value={attendee.favoriteBook}
                  onChange={(e) => updateAttendee(attendee.id, 'favoriteBook', e.target.value)}
                  placeholder="Enter favorite book"
                  className="text-sm"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Attendee</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">First Name</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Last Name</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Time</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                  What is your favorite book?
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((attendee) => (
                <tr key={attendee.id} className="border-b border-gray-100">
                  <td className="py-4 px-2">
                    <span className={`text-xs font-medium ${getStatusColor(attendee)}`}>
                      {getAttendanceStatus(attendee)}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={`${attendee.avatarColor} text-white text-sm`}>
                        {attendee.firstName.charAt(0)}
                        {attendee.lastName.charAt(0) || ""}
                      </AvatarFallback>
                    </Avatar>
                  </td>
                  <td className="py-4 px-2">
                    <Input
                      value={attendee.firstName}
                      onChange={(e) => updateAttendee(attendee.id, 'firstName', e.target.value)}
                      placeholder="First name"
                      className="text-sm border-0 bg-transparent focus:bg-white focus:border focus:border-gray-300"
                    />
                  </td>
                  <td className="py-4 px-2">
                    <Input
                      value={attendee.lastName}
                      onChange={(e) => updateAttendee(attendee.id, 'lastName', e.target.value)}
                      placeholder="Last name"
                      className="text-sm border-0 bg-transparent focus:bg-white focus:border focus:border-gray-300"
                    />
                  </td>
                  <td className="py-4 px-2">
                    <Input
                      type="time"
                      value={attendee.time}
                      onChange={(e) => handleAttendeeTimeChange(attendee.id, e.target.value)}
                      className="text-sm border-0 bg-transparent focus:bg-white focus:border focus:border-gray-300"
                    />
                  </td>
                  <td className="py-4 px-2">
                    <Input
                      value={attendee.favoriteBook}
                      onChange={(e) => updateAttendee(attendee.id, 'favoriteBook', e.target.value)}
                      placeholder="Enter favorite book"
                      className="text-sm border-0 bg-transparent focus:bg-white focus:border focus:border-gray-300"
                    />
                  </td>
                  <td className="py-4 px-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-6 h-6 p-0 rounded-full"
                      onClick={() => removeAttendee(attendee.id)}
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
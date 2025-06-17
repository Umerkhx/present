import { Users, MapPin } from 'lucide-react';

interface EventData {
  location: string;
  description: string;
}

interface EventInfoSectionProps {
  eventData: EventData;
}

export default function EventInfoSection({ eventData }: EventInfoSectionProps) {
  return (
    <div className="rounded-lg p-6 shadow-sm space-y-4">
      <div className="flex items-start space-x-3">
        <Users className="w-5 h-5 text-gray-400 mt-0.5" />
        <div>
          <p className="font-semibold text-gray-900">Check-in restricted to group members</p>
          <p className="text-sm text-gray-500">{eventData.description}</p>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
        <div>
          <p className="font-semibold text-gray-900">Location: {eventData.location}</p>
          <p className="text-sm text-gray-500">Attendees must be within 5000 feet to check in</p>
        </div>
      </div>
    </div>
  );
}
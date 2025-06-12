import React from 'react';
import Toggle from './Toggle';

interface CheckInSettingsProps {
  openCheckIn: boolean;
  checkAttendeeLocation: boolean;
  addQuestions: boolean;
  onChange: (name: string, value: any) => void;
}

const CheckInSettings: React.FC<CheckInSettingsProps> = ({
  openCheckIn,
  checkAttendeeLocation,
  onChange
}) => {
  return (
    <div className="space-y-4">
      <div>
      <div className="flex items-center gap-4">
        <Toggle enabled={openCheckIn} onChange={(value) => onChange("openCheckIn", value)} />
        <p className="font-medium text-gray-800">{openCheckIn ? "Group check-in" : "Open check-in"}</p>
      </div>
      {openCheckIn && (
        <div className="mt-4 space-y-1">
        <p className="text-lg font-semibold text-gray-900">2024/25 Freshman English Period 5</p>
        <p className="pt-2 text-base font-semibold text-gray-900">First Name, Last Name</p>
        <p className="text-sm font-medium text-gray-900">Group verification</p>
        </div>
      )}
      </div>
      <div className="flex items-center gap-4">
      <Toggle
        enabled={checkAttendeeLocation}
        onChange={(value) => onChange('checkAttendeeLocation', value)}
      />
      <div>
        <p className="font-medium text-gray-800">Check attendee location</p>
      </div>
      </div>
    </div>
  );
};

export default CheckInSettings;
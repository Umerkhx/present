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
      <div className="flex items-center gap-4">
        <Toggle
          enabled={openCheckIn}
          onChange={(value) => onChange('openCheckIn', value)}
        />
        <div>
          <p className="font-medium text-gray-800">Open check-in</p>
        </div>

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
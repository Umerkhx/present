export interface LocationData {
  position: {
    lat: number;
    lng: number;
  };
  address: string;
}

export interface EventData {
  name: string;
  date: Date;
  startTime: string;
  endTime: string;
  openCheckIn: boolean;
  checkAttendeeLocation: boolean;
  radius: number;
  location: any;
  addQuestions: boolean;
}
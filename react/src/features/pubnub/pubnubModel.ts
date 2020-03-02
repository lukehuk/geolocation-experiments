export const channels = ["geolocation-channel"];

export enum PubNubMessageType {
  TRIP_DRIVER_LOCATION,
  LIVE_LOCATION
}

export interface PubNubMessageFormat {
  type: PubNubMessageType;
  body: {
    driverId: string;
    location: {
      x: number;
      y: number;
    };
  };
}

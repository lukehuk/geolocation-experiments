import * as jspb from "google-protobuf";

import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
import * as pubnub_types_pb from "./pubnub.types_pb";

export class DriverTrackingEnvelope extends jspb.Message {
  getChannel(): string;
  setChannel(value: string): void;

  getData(): DriverTrackingMessage | undefined;
  setData(value?: DriverTrackingMessage): void;
  hasData(): boolean;
  clearData(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DriverTrackingEnvelope.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: DriverTrackingEnvelope
  ): DriverTrackingEnvelope.AsObject;
  static serializeBinaryToWriter(
    message: DriverTrackingEnvelope,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): DriverTrackingEnvelope;
  static deserializeBinaryFromReader(
    message: DriverTrackingEnvelope,
    reader: jspb.BinaryReader
  ): DriverTrackingEnvelope;
}

export namespace DriverTrackingEnvelope {
  export type AsObject = {
    channel: string;
    data?: DriverTrackingMessage.AsObject;
  };
}

export class DriverTrackingMessage extends jspb.Message {
  getDriverId(): string;
  setDriverId(value: string): void;

  getOrderId(): string;
  setOrderId(value: string): void;

  getDriverStatus(): DriverTrackingMessage.DriverStatus;
  setDriverStatus(value: DriverTrackingMessage.DriverStatus): void;

  getCustomStatus(): google_protobuf_struct_pb.Value | undefined;
  setCustomStatus(value?: google_protobuf_struct_pb.Value): void;
  hasCustomStatus(): boolean;
  clearCustomStatus(): void;

  getLocation(): pubnub_types_pb.Location | undefined;
  setLocation(value?: pubnub_types_pb.Location): void;
  hasLocation(): boolean;
  clearLocation(): void;

  getHeading(): number;
  setHeading(value: number): void;

  getVelocity(): number;
  setVelocity(value: number): void;

  getRoad(): string;
  setRoad(value: string): void;

  getMetadata(): google_protobuf_struct_pb.Value | undefined;
  setMetadata(value?: google_protobuf_struct_pb.Value): void;
  hasMetadata(): boolean;
  clearMetadata(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DriverTrackingMessage.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: DriverTrackingMessage
  ): DriverTrackingMessage.AsObject;
  static serializeBinaryToWriter(
    message: DriverTrackingMessage,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): DriverTrackingMessage;
  static deserializeBinaryFromReader(
    message: DriverTrackingMessage,
    reader: jspb.BinaryReader
  ): DriverTrackingMessage;
}

export namespace DriverTrackingMessage {
  export type AsObject = {
    driverId: string;
    orderId: string;
    driverStatus: DriverTrackingMessage.DriverStatus;
    customStatus?: google_protobuf_struct_pb.Value.AsObject;
    location?: pubnub_types_pb.Location.AsObject;
    heading: number;
    velocity: number;
    road: string;
    metadata?: google_protobuf_struct_pb.Value.AsObject;
  };

  export enum DriverStatus {
    CUSTOM = 0,
    UNAVAILABLE = 1,
    WAITING_FOR_ASSIGNMENT = 2,
    EN_ROUTE_TO_PICKUP = 3,
    EN_ROUTE_TO_DELIVER = 4
  }
}

export class LocationTrackingEnvelope extends jspb.Message {
  getChannel(): string;
  setChannel(value: string): void;

  getData(): LocationTrackingMessage | undefined;
  setData(value?: LocationTrackingMessage): void;
  hasData(): boolean;
  clearData(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LocationTrackingEnvelope.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: LocationTrackingEnvelope
  ): LocationTrackingEnvelope.AsObject;
  static serializeBinaryToWriter(
    message: LocationTrackingEnvelope,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): LocationTrackingEnvelope;
  static deserializeBinaryFromReader(
    message: LocationTrackingEnvelope,
    reader: jspb.BinaryReader
  ): LocationTrackingEnvelope;
}

export namespace LocationTrackingEnvelope {
  export type AsObject = {
    channel: string;
    data?: LocationTrackingMessage.AsObject;
  };
}

export class LocationTrackingMessage extends jspb.Message {
  getTrackingId(): string;
  setTrackingId(value: string): void;

  getTrackingStatus(): LocationTrackingMessage.TrackingStatus;
  setTrackingStatus(value: LocationTrackingMessage.TrackingStatus): void;

  getCustomStatus(): google_protobuf_struct_pb.Value | undefined;
  setCustomStatus(value?: google_protobuf_struct_pb.Value): void;
  hasCustomStatus(): boolean;
  clearCustomStatus(): void;

  getLocation(): pubnub_types_pb.Location | undefined;
  setLocation(value?: pubnub_types_pb.Location): void;
  hasLocation(): boolean;
  clearLocation(): void;

  getMetadata(): google_protobuf_struct_pb.Value | undefined;
  setMetadata(value?: google_protobuf_struct_pb.Value): void;
  hasMetadata(): boolean;
  clearMetadata(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LocationTrackingMessage.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: LocationTrackingMessage
  ): LocationTrackingMessage.AsObject;
  static serializeBinaryToWriter(
    message: LocationTrackingMessage,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): LocationTrackingMessage;
  static deserializeBinaryFromReader(
    message: LocationTrackingMessage,
    reader: jspb.BinaryReader
  ): LocationTrackingMessage;
}

export namespace LocationTrackingMessage {
  export type AsObject = {
    trackingId: string;
    trackingStatus: LocationTrackingMessage.TrackingStatus;
    customStatus?: google_protobuf_struct_pb.Value.AsObject;
    location?: pubnub_types_pb.Location.AsObject;
    metadata?: google_protobuf_struct_pb.Value.AsObject;
  };

  export enum TrackingStatus {
    CUSTOM = 0,
    READY_FOR_PICKUP = 1,
    EN_ROUTE_TO_DELIVER = 2,
    DELIVERED = 3,
    UNABLE_TO_DELIVER = 4,
    RETURNING = 5,
    CLOSED = 6,
    EXCEPTION = 7
  }
}

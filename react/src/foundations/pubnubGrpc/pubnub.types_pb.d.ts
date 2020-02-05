import * as jspb from "google-protobuf";

export class Subscription extends jspb.Message {
  getChannel(): string;
  setChannel(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Subscription.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: Subscription
  ): Subscription.AsObject;
  static serializeBinaryToWriter(
    message: Subscription,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): Subscription;
  static deserializeBinaryFromReader(
    message: Subscription,
    reader: jspb.BinaryReader
  ): Subscription;
}

export namespace Subscription {
  export type AsObject = {
    channel: string;
  };
}

export class PublishResponse extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  getTimetoken(): Timetoken | undefined;
  setTimetoken(value?: Timetoken): void;
  hasTimetoken(): boolean;
  clearTimetoken(): void;

  getStatus(): PublishResponse.Status;
  setStatus(value: PublishResponse.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PublishResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: PublishResponse
  ): PublishResponse.AsObject;
  static serializeBinaryToWriter(
    message: PublishResponse,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): PublishResponse;
  static deserializeBinaryFromReader(
    message: PublishResponse,
    reader: jspb.BinaryReader
  ): PublishResponse;
}

export namespace PublishResponse {
  export type AsObject = {
    message: string;
    timetoken?: Timetoken.AsObject;
    status: PublishResponse.Status;
  };

  export enum Status {
    SUCCESS = 0,
    ERROR = 1
  }
}

export class Timetoken extends jspb.Message {
  getT(): number;
  setT(value: number): void;

  getR(): number;
  setR(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Timetoken.AsObject;
  static toObject(includeInstance: boolean, msg: Timetoken): Timetoken.AsObject;
  static serializeBinaryToWriter(
    message: Timetoken,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): Timetoken;
  static deserializeBinaryFromReader(
    message: Timetoken,
    reader: jspb.BinaryReader
  ): Timetoken;
}

export namespace Timetoken {
  export type AsObject = {
    t: number;
    r: number;
  };
}

export class Location extends jspb.Message {
  getLatitude(): number;
  setLatitude(value: number): void;

  getLongitude(): number;
  setLongitude(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Location.AsObject;
  static toObject(includeInstance: boolean, msg: Location): Location.AsObject;
  static serializeBinaryToWriter(
    message: Location,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): Location;
  static deserializeBinaryFromReader(
    message: Location,
    reader: jspb.BinaryReader
  ): Location;
}

export namespace Location {
  export type AsObject = {
    latitude: number;
    longitude: number;
  };
}

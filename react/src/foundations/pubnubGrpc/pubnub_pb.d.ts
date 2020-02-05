import * as jspb from "google-protobuf";

import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
import * as pubnub_types_pb from "./pubnub.types_pb";

export class Message extends jspb.Message {
  getChannel(): string;
  setChannel(value: string): void;

  getData(): google_protobuf_struct_pb.Value | undefined;
  setData(value?: google_protobuf_struct_pb.Value): void;
  hasData(): boolean;
  clearData(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static serializeBinaryToWriter(
    message: Message,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(
    message: Message,
    reader: jspb.BinaryReader
  ): Message;
}

export namespace Message {
  export type AsObject = {
    channel: string;
    data?: google_protobuf_struct_pb.Value.AsObject;
  };
}

/**
 * @fileoverview gRPC-Web generated client stub for pubnub
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

import * as grpcWeb from "grpc-web";

import * as pubnub_types_pb from "./pubnub.types_pb";

import { Message } from "./pubnub_pb";

export class PubSubClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string };
  options_: null | { [index: string]: string };

  constructor(
    hostname: string,
    credentials?: null | { [index: string]: string },
    options?: null | { [index: string]: string }
  ) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options["format"] = "text";

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoPublish = new grpcWeb.AbstractClientBase.MethodInfo(
    pubnub_types_pb.PublishResponse,
    (request: Message) => {
      return request.serializeBinary();
    },
    pubnub_types_pb.PublishResponse.deserializeBinary
  );

  publish(
    request: Message,
    metadata: grpcWeb.Metadata | null,
    callback: (
      err: grpcWeb.Error,
      response: pubnub_types_pb.PublishResponse
    ) => void
  ) {
    return this.client_.rpcCall(
      this.hostname_ + "/pubnub.PubSub/Publish",
      request,
      metadata || {},
      this.methodInfoPublish,
      callback
    );
  }

  methodInfoSubscribe = new grpcWeb.AbstractClientBase.MethodInfo(
    Message,
    (request: pubnub_types_pb.Subscription) => {
      return request.serializeBinary();
    },
    Message.deserializeBinary
  );

  subscribe(
    request: pubnub_types_pb.Subscription,
    metadata?: grpcWeb.Metadata
  ) {
    return this.client_.serverStreaming(
      this.hostname_ + "/pubnub.PubSub/Subscribe",
      request,
      metadata || {},
      this.methodInfoSubscribe
    );
  }
}

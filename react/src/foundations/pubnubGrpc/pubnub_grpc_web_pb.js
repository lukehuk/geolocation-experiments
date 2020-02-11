/**
 * @fileoverview gRPC-Web generated client stub for pubnub
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

const grpc = {};
grpc.web = require("grpc-web");

var google_protobuf_struct_pb = require("google-protobuf/google/protobuf/struct_pb.js");

var pubnub_types_pb = require("./pubnub.types_pb.js");
const proto = {};
proto.pubnub = require("./pubnub_pb.js");

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.pubnub.PubSubClient = function(hostname, credentials, options) {
  if (!options) options = {};
  options["format"] = "text";

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;
};

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.pubnub.PubSubPromiseClient = function(hostname, credentials, options) {
  if (!options) options = {};
  options["format"] = "text";

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.pubnub.Message,
 *   !proto.pubnub.PublishResponse>}
 */
const methodDescriptor_PubSub_Publish = new grpc.web.MethodDescriptor(
  "/pubnub.PubSub/Publish",
  grpc.web.MethodType.UNARY,
  proto.pubnub.Message,
  pubnub_types_pb.PublishResponse,
  /**
   * @param {!proto.pubnub.Message} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  pubnub_types_pb.PublishResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pubnub.Message,
 *   !proto.pubnub.PublishResponse>}
 */
const methodInfo_PubSub_Publish = new grpc.web.AbstractClientBase.MethodInfo(
  pubnub_types_pb.PublishResponse,
  /**
   * @param {!proto.pubnub.Message} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  pubnub_types_pb.PublishResponse.deserializeBinary
);

/**
 * @param {!proto.pubnub.Message} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pubnub.PublishResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pubnub.PublishResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pubnub.PubSubClient.prototype.publish = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/pubnub.PubSub/Publish",
    request,
    metadata || {},
    methodDescriptor_PubSub_Publish,
    callback
  );
};

/**
 * @param {!proto.pubnub.Message} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pubnub.PublishResponse>}
 *     A native promise that resolves to the response
 */
proto.pubnub.PubSubPromiseClient.prototype.publish = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/pubnub.PubSub/Publish",
    request,
    metadata || {},
    methodDescriptor_PubSub_Publish
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.pubnub.Subscription,
 *   !proto.pubnub.Message>}
 */
const methodDescriptor_PubSub_Subscribe = new grpc.web.MethodDescriptor(
  "/pubnub.PubSub/Subscribe",
  grpc.web.MethodType.SERVER_STREAMING,
  pubnub_types_pb.Subscription,
  proto.pubnub.Message,
  /**
   * @param {!proto.pubnub.Subscription} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.pubnub.Message.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pubnub.Subscription,
 *   !proto.pubnub.Message>}
 */
const methodInfo_PubSub_Subscribe = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pubnub.Message,
  /**
   * @param {!proto.pubnub.Subscription} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.pubnub.Message.deserializeBinary
);

/**
 * @param {!proto.pubnub.Subscription} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.pubnub.Message>}
 *     The XHR Node Readable Stream
 */
proto.pubnub.PubSubClient.prototype.subscribe = function(request, metadata) {
  return this.client_.serverStreaming(
    this.hostname_ + "/pubnub.PubSub/Subscribe",
    request,
    metadata || {},
    methodDescriptor_PubSub_Subscribe
  );
};

/**
 * @param {!proto.pubnub.Subscription} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.pubnub.Message>}
 *     The XHR Node Readable Stream
 */
proto.pubnub.PubSubPromiseClient.prototype.subscribe = function(
  request,
  metadata
) {
  return this.client_.serverStreaming(
    this.hostname_ + "/pubnub.PubSub/Subscribe",
    request,
    metadata || {},
    methodDescriptor_PubSub_Subscribe
  );
};

module.exports = proto.pubnub;

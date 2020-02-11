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
proto.pubnub = require("./pubnub.tracking_pb.js");

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.pubnub.DriverTrackingClient = function(hostname, credentials, options) {
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
proto.pubnub.DriverTrackingPromiseClient = function(
  hostname,
  credentials,
  options
) {
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
 *   !proto.pubnub.Subscription,
 *   !proto.pubnub.DriverTrackingEnvelope>}
 */
const methodDescriptor_DriverTracking_Subscribe = new grpc.web.MethodDescriptor(
  "/pubnub.DriverTracking/Subscribe",
  grpc.web.MethodType.SERVER_STREAMING,
  pubnub_types_pb.Subscription,
  proto.pubnub.DriverTrackingEnvelope,
  /**
   * @param {!proto.pubnub.Subscription} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.pubnub.DriverTrackingEnvelope.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pubnub.Subscription,
 *   !proto.pubnub.DriverTrackingEnvelope>}
 */
const methodInfo_DriverTracking_Subscribe = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pubnub.DriverTrackingEnvelope,
  /**
   * @param {!proto.pubnub.Subscription} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.pubnub.DriverTrackingEnvelope.deserializeBinary
);

/**
 * @param {!proto.pubnub.Subscription} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.pubnub.DriverTrackingEnvelope>}
 *     The XHR Node Readable Stream
 */
proto.pubnub.DriverTrackingClient.prototype.subscribe = function(
  request,
  metadata
) {
  return this.client_.serverStreaming(
    this.hostname_ + "/pubnub.DriverTracking/Subscribe",
    request,
    metadata || {},
    methodDescriptor_DriverTracking_Subscribe
  );
};

/**
 * @param {!proto.pubnub.Subscription} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.pubnub.DriverTrackingEnvelope>}
 *     The XHR Node Readable Stream
 */
proto.pubnub.DriverTrackingPromiseClient.prototype.subscribe = function(
  request,
  metadata
) {
  return this.client_.serverStreaming(
    this.hostname_ + "/pubnub.DriverTracking/Subscribe",
    request,
    metadata || {},
    methodDescriptor_DriverTracking_Subscribe
  );
};

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.pubnub.LocationTrackingClient = function(hostname, credentials, options) {
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
proto.pubnub.LocationTrackingPromiseClient = function(
  hostname,
  credentials,
  options
) {
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
 *   !proto.pubnub.Subscription,
 *   !proto.pubnub.LocationTrackingEnvelope>}
 */
const methodDescriptor_LocationTracking_Subscribe = new grpc.web.MethodDescriptor(
  "/pubnub.LocationTracking/Subscribe",
  grpc.web.MethodType.SERVER_STREAMING,
  pubnub_types_pb.Subscription,
  proto.pubnub.LocationTrackingEnvelope,
  /**
   * @param {!proto.pubnub.Subscription} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.pubnub.LocationTrackingEnvelope.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pubnub.Subscription,
 *   !proto.pubnub.LocationTrackingEnvelope>}
 */
const methodInfo_LocationTracking_Subscribe = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pubnub.LocationTrackingEnvelope,
  /**
   * @param {!proto.pubnub.Subscription} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.pubnub.LocationTrackingEnvelope.deserializeBinary
);

/**
 * @param {!proto.pubnub.Subscription} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.pubnub.LocationTrackingEnvelope>}
 *     The XHR Node Readable Stream
 */
proto.pubnub.LocationTrackingClient.prototype.subscribe = function(
  request,
  metadata
) {
  return this.client_.serverStreaming(
    this.hostname_ + "/pubnub.LocationTracking/Subscribe",
    request,
    metadata || {},
    methodDescriptor_LocationTracking_Subscribe
  );
};

/**
 * @param {!proto.pubnub.Subscription} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.pubnub.LocationTrackingEnvelope>}
 *     The XHR Node Readable Stream
 */
proto.pubnub.LocationTrackingPromiseClient.prototype.subscribe = function(
  request,
  metadata
) {
  return this.client_.serverStreaming(
    this.hostname_ + "/pubnub.LocationTracking/Subscribe",
    request,
    metadata || {},
    methodDescriptor_LocationTracking_Subscribe
  );
};

module.exports = proto.pubnub;

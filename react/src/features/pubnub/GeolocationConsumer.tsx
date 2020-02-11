import { PubNubConsumer } from "pubnub-react";
import Pubnub, { MessageEvent } from "pubnub";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTrip } from "../trip/current/selectors";
import { recordDriverLocation } from "../database/databaseCommand";
import { setCurrentTripDriverLocation } from "../trip/current/currentTripModel";
import {
  channels,
  PubNubMessageFormat,
  PubNubMessageType
} from "./pubnubModel";
import { DriverTrackingClient } from "../../foundations/pubnubGrpc/pubnub.tracking_grpc_web_pb";
import * as pubnub_types_pb from "../../foundations/pubnubGrpc/pubnub.types_pb";

const GeolocationConsumer = () => {
  const dispatch = useDispatch();
  const currentTrip = useSelector(getCurrentTrip);

  let handleMessage = (message: PubNubMessageFormat, timetoken: string) => {
    if (message.type === PubNubMessageType.TRIP_DRIVER_LOCATION) {
      if (message.body.driverId === currentTrip.driver.id) {
        recordDriverLocation(
          message.body.driverId,
          timetoken,
          message.body.location
        );
        if (timetoken > currentTrip.driver.currentLocation.timetoken) {
          dispatch(
            setCurrentTripDriverLocation({
              timetoken,
              position: message.body.location
            })
          );
        }
      }
    }
  };

  const [consuming, setConsuming] = useState(false);

  const initialMessages: MessageEvent[] = [];
  const [messages, setMessages] = useState(initialMessages);
  const [headMessage, ...tailMessages] = messages;
  if (headMessage) {
    handleMessage(headMessage.message, headMessage.timetoken);
    setMessages(tailMessages);
  }

  let makeConsumer = () => {
    let pubSubClient = new DriverTrackingClient(
      "http://localhost:9900",
      {
        pubkey: "demo-36",
        subkey: "demo-36"
      },
      {}
    );

    let subscription = new pubnub_types_pb.Subscription();
    subscription.setChannel("demo");
    const messageClientReadableStream = pubSubClient.subscribe(
      subscription,
      null
    );
    messageClientReadableStream.on("error", (error: any) => {
      console.log("Error: " + JSON.stringify(error));
    });
    messageClientReadableStream.on("data", (message: any) => {
      console.log("Received message: " + JSON.stringify(message));
    });
  };

  return (
    <>
      {!consuming && (
        <PubNubConsumer
          children={client => {
            let pubnub = client as Pubnub;
            console.log("PUBNUB CONSUMER CREATED"); //Should only appear once
            pubnub.addListener({
              message: messageEvent => {
                setMessages([...messages, messageEvent]);
              }
            });
            pubnub.subscribe({ channels });
            setConsuming(true);
            return "";
          }}
        />
      )}
      {!consuming && makeConsumer()}
    </>
  );
};

export { GeolocationConsumer };

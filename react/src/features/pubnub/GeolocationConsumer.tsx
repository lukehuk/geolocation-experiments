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
    </>
  );
};

export { GeolocationConsumer };

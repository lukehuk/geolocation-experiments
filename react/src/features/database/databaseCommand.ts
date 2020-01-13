const queryString = require("query-string");
const uuidv4 = require("uuid/v4");

const host = "http://localhost";
const port = "3001";

export interface PassengerDetails {
  id: string;
  name: string;
  profilePicture: string;
}

export interface DriverDetails {
  id: string;
  name: string;
  profilePicture: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface TripDetails {
  id: string;
  passenger: PassengerDetails;
  driver: DriverDetails;
  origin: Point;
  destination: Point;
}

export async function createTrip(
  origin: Point,
  destination: Point
): Promise<TripDetails> {
  let driverDetailsPromise = createDriver();
  let passengerDetailsPromise = createPassenger();
  let driver = await driverDetailsPromise;
  let passenger = await passengerDetailsPromise;
  let id = uuidv4();
  return callEndpoint(
    "POST",
    host + ":" + port + "/trip",
    {},
    {
      id: id,
      passenger_id: passenger.id,
      driver_id: driver.id,
      start: origin.x + "," + origin.y,
      destination: destination.x + "," + destination.y
    }
  ).then(
    () => {
      return {
        id,
        passenger,
        driver,
        origin,
        destination
      };
    },
    error => {
      console.error(error);
      return Promise.reject(error);
    }
  );
}

export const createDriver = async (): Promise<DriverDetails> => {
  return callEndpoint("GET", "https://randomuser.me/api/", {}, {})
    .then(res => (res ? res.json() : res))
    .then(user => {
      let id = uuidv4();
      let name = user.results[0].name.first + " " + user.results[0].name.last;
      let profilePicture = user.results[0].picture.medium;
      return callEndpoint(
        "POST",
        host + ":" + port + "/driver",
        {},
        {
          id: id,
          name: name,
          profile_picture: profilePicture
        }
      ).then(
        result => {
          console.log(result);
          return {
            id,
            name,
            profilePicture
          };
        },
        error => {
          console.error(error);
          return Promise.reject(error);
        }
      );
    });
};

export const createPassenger = async (): Promise<PassengerDetails> => {
  return callEndpoint("GET", "https://randomuser.me/api/", {}, {})
    .then(res => (res ? res.json() : res))
    .then(user => {
      let id = uuidv4();
      let name = user.results[0].name.first + " " + user.results[0].name.last;
      let profilePicture = user.results[0].picture.medium;
      return callEndpoint(
        "POST",
        host + ":" + port + "/passenger",
        {},
        {
          id: id,
          name: name,
          profile_picture: profilePicture
        }
      ).then(
        result => {
          console.log(result);
          return {
            id,
            name,
            profilePicture
          };
        },
        error => {
          console.error(error);
          return Promise.reject(error);
        }
      );
    });
};

export interface DriverLocationDetails {
  driverId: string;
  timetoken: string;
  position: Point;
}

export const recordDriverLocation = async (
  driverId: string,
  timetoken: string,
  position: Point
): Promise<DriverLocationDetails> => {
  return callEndpoint(
    "POST",
    host + ":" + port + "/driver_location",
    {},
    {
      driver_id: driverId,
      timetoken: timetoken,
      current_location: position.x + "," + position.y
    }
  ).then(
    result => {
      console.log(result);
      return {
        driverId,
        timetoken,
        position
      };
    },
    error => {
      console.error(error);
      return Promise.reject(error);
    }
  );
};

const callEndpoint = (
  method: string,
  path: string,
  queryParams: object,
  body: object
): Promise<any> => {
  return fetch(path + queryString.stringify(queryParams), {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: method === "POST" ? JSON.stringify(body) : undefined
  });
  // .then(res => res ? res.json() : res)
};

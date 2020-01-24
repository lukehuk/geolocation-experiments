const queryString = require("query-string");
const uuidv4 = require("uuid/v4");

const host = "http://localhost";
const port = "3000";

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
  let driverDetailsPromise = createDriver().then(r => {
    return recordDriverLocation(
      r.id,
      new Date()
        .getTime()
        .toString()
        .padEnd(17, "0"), //PubNub timestamps are 17 digits,
      origin
    ).then(() => {
      return r;
    });
  });
  let passengerDetailsPromise = createPassenger().then(r => {
    return recordPassengerLocation(
      r.id,
      new Date()
        .getTime()
        .toString()
        .padEnd(17, "0"), //PubNub timestamps are 17 digits,
      origin
    ).then(() => {
      return r;
    });
  });
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

export const getPassengers = async (): Promise<PassengerDetails[]> => {
  return callEndpoint("GET", host + ":" + port + "/passenger", {}, {})
    .then(res => (res ? res.json() : res))
    .then(
      result => {
        console.log(result);
        return result;
      },
      error => {
        console.error(error);
        return Promise.reject(error);
      }
    );
};

export const getDrivers = async (): Promise<DriverDetails[]> => {
  return callEndpoint("GET", host + ":" + port + "/driver", {}, {})
    .then(res => (res ? res.json() : res))
    .then(
      result => {
        console.log(result);
        return result;
      },
      error => {
        console.error(error);
        return Promise.reject(error);
      }
    );
};

export interface EntityLocation {
  id: string;
  position: Point;
}

export const getDriverLocationHistoryWithLimit = async (
  driverId: string,
  limit: number | null
): Promise<any> => {
  return callEndpoint(
    "GET",
    host + ":" + port + "/driver_location",
    {
      driver_id: "eq." + driverId,
      limit: limit ? limit : undefined,
      order: "timetoken.desc"
    },
    {}
  ).then(res => (res ? res.json() : res));
};

export const getDriverLocationHistory = async (
  driverId: string
): Promise<Point[]> => {
  return getDriverLocationHistoryWithLimit(driverId, null).then(
    result =>
      result.map((resultItem: any) => {
        let position = resultItem.current_location.slice(1, -1).split(",");
        return {
          x: parseFloat(position[0]),
          y: parseFloat(position[1])
        };
      }),
    error => {
      console.error(error);
      return Promise.reject(error);
    }
  );
};

export const getLastDriverLocation = async (
  driverId: string
): Promise<EntityLocation> => {
  return getDriverLocationHistoryWithLimit(driverId, 1).then(
    result => {
      if (result.length !== 1) {
        return Promise.reject("Driver location not found");
      }
      console.log(result);
      let position = result[0].current_location.slice(1, -1).split(",");
      return {
        id: result[0].driver_id,
        position: {
          x: parseFloat(position[0]),
          y: parseFloat(position[1])
        }
      };
    },
    error => {
      console.error(error);
      return Promise.reject(error);
    }
  );
};

export const getLastPassengerLocation = async (
  passengerId: string
): Promise<EntityLocation> => {
  return callEndpoint(
    "GET",
    host + ":" + port + "/passenger_location",
    {
      passenger_id: "eq." + passengerId,
      limit: 1,
      order: "timetoken.desc"
    },
    {}
  )
    .then(res => (res ? res.json() : res))
    .then(
      result => {
        if (result.length !== 1) {
          return Promise.reject("Passenger location not found");
        }
        console.log(result);
        let position = result[0].current_location.slice(1, -1).split(",");
        return {
          id: result[0].passenger_id,
          position: {
            x: parseFloat(position[0]),
            y: parseFloat(position[1])
          }
        };
      },
      error => {
        console.error(error);
        return Promise.reject(error);
      }
    );
};

export const getLastKnownDriverLocations = async (): Promise<EntityLocation[]> => {
  return getDrivers().then(drivers =>
    Promise.all(drivers.map(driver => getLastDriverLocation(driver.id)))
  );
};

export const getLastKnownPassengerLocations = async (): Promise<EntityLocation[]> => {
  return getPassengers().then(drivers =>
    Promise.all(drivers.map(driver => getLastPassengerLocation(driver.id)))
  );
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

export interface PassengerLocationDetails {
  passengerId: string;
  timetoken: string;
  position: Point;
}

export const recordPassengerLocation = async (
  passengerId: string,
  timetoken: string,
  position: Point
): Promise<PassengerLocationDetails> => {
  return callEndpoint(
    "POST",
    host + ":" + port + "/passenger_location",
    {},
    {
      passenger_id: passengerId,
      timetoken: timetoken,
      current_location: position.x + "," + position.y
    }
  ).then(
    result => {
      console.log(result);
      return {
        passengerId,
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

export const getNearestDriver = async (
  passengerId: string
): Promise<string> => {
  return callEndpoint(
    "POST",
    host + ":" + port + "/rpc/nearest_driver",
    {},
    {
      p_passenger_id: passengerId
    }
  )
    .then(res => (res ? res.json() : res))
    .then(
      result => {
        console.log("Nearest driver: " + result);
        return result;
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
  return fetch(path + "?" + queryString.stringify(queryParams), {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
      // Prefer: "params=single-object"
    },
    body: method === "POST" ? JSON.stringify(body) : undefined
  });
  // .then(res => res ? res.json() : res)
};

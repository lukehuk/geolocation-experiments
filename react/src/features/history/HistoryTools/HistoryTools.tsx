import React, { useState } from "react";
import { ToolButton, ToolsDropdown } from "../../tools/Tools/Tools.style";
import { useDispatch } from "react-redux";
import { DriverDetails, getDrivers } from "../../database/databaseCommand";
import {
  setHistoryRefreshPage,
  setHistorySelectedDriver
} from "../model/historyModel";

const HistoryTools = () => {
  const driverPlaceholder: JSX.Element = (
    <option key="" value="">
      Select driver...
    </option>
  );

  const [reloadEntities, setReloadEntities] = useState(true);
  const [driverList, setDriverList] = useState([driverPlaceholder]);

  const dispatch = useDispatch();

  function refreshHistoryPage() {
    dispatch(setHistoryRefreshPage(true));
    setReloadEntities(true);
  }

  function getExistingDrivers() {
    if (reloadEntities) {
      getDrivers()
        .then((r: DriverDetails[]) =>
          r.flatMap(driver => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))
        )
        .then(options => setDriverList([driverPlaceholder].concat(options)));
      setReloadEntities(false);
    }
    return driverList;
  }

  return (
    <>
      <ToolButton onClick={refreshHistoryPage}>Refresh Page</ToolButton>
      <br />
      <br />

      <ToolsDropdown
        defaultValue=""
        children={getExistingDrivers()}
        onChange={e => {
          dispatch(setHistorySelectedDriver(e.target.value));
          dispatch(setHistoryRefreshPage(true));
        }}
      />
    </>
  );
};

export { HistoryTools };

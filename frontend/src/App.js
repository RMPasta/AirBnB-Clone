import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import SpotDetailsWrapper from "./components/SpotDetailsWrapper";
import * as sessionActions from "./store/session";
import Landing from "./components/Landing";
import CreateSpot from "./components/CreateSpot";
import ManageSpots from "./components/ManageSpots";
import UpdateSpotWrapper from "./components/UpdateSpotWrapper";

const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/spots/new">
            <CreateSpot />
          </Route>
          <Route exact path="/spots/current">
            <ManageSpots />
          </Route>
          <Route exact path="/spots/:id/edit">
            <UpdateSpotWrapper />
          </Route>
          <Route path="/spots/:spotId">
            <SpotDetailsWrapper />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

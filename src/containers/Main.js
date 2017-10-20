import React from 'react';

import MapsBar from "../components/MapsBar";
import WorkBar from "../components/workBar";
import Map from "../components/map";

const Main = () => {
  return (
    <div className="main">
      <MapsBar />
      <WorkBar />
      <Map />
    </div>
  );
};

export default Main;

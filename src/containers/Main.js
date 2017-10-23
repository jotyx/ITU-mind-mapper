import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";

import MapsBar from "../components/MapsBar";
import WorkBar from "../components/workBar";
import Map from "../components/map";

import { newMap } from "../actions/mapsActions";

const Main = () => {
  return (
    <div className="main">
      <MapsBar />
      <WorkBar />
      <Map />
    </div>
  );
};

export default compose(
  connect(null, { newMap }),
  lifecycle({
    componentWillMount() {
      this.props.newMap();
    }
  })
)(Main);

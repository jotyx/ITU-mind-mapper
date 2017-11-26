import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";

import MapsBar from "../components/mapsBar";
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
  connect( ({ maps }) => ({ maps }), { newMap }),
  lifecycle({
    componentWillMount() {
      if (this.props.maps.list.length === 0)
        this.props.newMap();
    }
  })
)(Main);

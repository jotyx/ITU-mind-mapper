import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { map, findIndex } from "lodash";
import { ButtonGroup, Button } from "react-bootstrap";
import { FontIcon } from "react-md";

import { setActiveMap, removeMap } from "../actions/mapsActions";

const MapsBar = ({ list, setActiveMap, removeMap }) => {
  return (
    <div className="maps-bar">
      {map(list, (item, i) => (
        <ButtonGroup key={i}>
          <Button
            bsStyle={item.active ? "primary" : "default"}
            onClick={() => setActiveMap(item.label)}
          >
            {item.label}
          </Button>
          {list.length > 1 && (
            <Button
              bsStyle={item.active ? "primary" : "default"}
              onClick={() => removeMap(item.label)}
            >
              <FontIcon iconClassName={"fa fa-times"} className="icon" />
            </Button>
          )}
        </ButtonGroup>
      ))}
    </div>
  );
};

export default compose(
  connect(({ maps: { list } }) => ({ list }), { setActiveMap, removeMap })
)(MapsBar);

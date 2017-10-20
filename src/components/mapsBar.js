import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { map } from "lodash";
import classNames from "classnames";
import { ButtonGroup, Button } from "react-bootstrap";
import { FontIcon } from "react-md";

import { setActiveMap, removeMap } from "../actions/mapsActions";

const MapsBar = ({ list, setActiveMap, removeMap }) => {
  return (
    <div className="maps-bar">
      {map(list, (item, i) => (
        <ButtonGroup key={i}>
          <Button
            className={classNames("button", { single: list.length === 1 })}
            bsStyle={item.active ? "primary" : "default"}
            onClick={() => setActiveMap(item.name)}
          >
            {item.name}
          </Button>
          {list.length > 1 && (
            <Button
              className="button-remove"
              bsStyle={item.active ? "primary" : "default"}
              onClick={() => removeMap(item.name)}
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

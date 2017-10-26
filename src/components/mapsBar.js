import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { map } from "lodash";
import classNames from "classnames";
import { ButtonGroup, Button } from "react-bootstrap";
import { FontIcon } from "react-md";

import { setActiveMap } from "../actions/mapsActions";
import { setDialog } from "../actions/appActions";

const MapsBar = ({ list, setActiveMap, setDialog }) => {
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
              onClick={() => setDialog("RemoveMap", { name: item.name })}
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
  connect(({ maps: { list } }) => ({ list }), { setActiveMap, setDialog })
)(MapsBar);

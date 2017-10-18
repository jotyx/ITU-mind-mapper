import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { map, findIndex } from "lodash";
import { Nav, NavItem } from "react-bootstrap";

import { setActiveMap } from "../actions/mapsActions";

const MapsBar = ({ list, setActiveMap }) => {
  return (
    <div className="maps-bar">
      <Nav
        bsStyle="pills"
        justified
        activeKey={findIndex(list, i => i.active)}
        onSelect={() => null}
      >
        {map(list, (item, i) => (
          <NavItem eventKey={i} onClick={() => setActiveMap(item.label)}>
            {item.label}
          </NavItem>
        ))}
      </Nav>
    </div>
  );
};

export default compose(
  connect(({ maps: { list } }) => ({ list }), { setActiveMap })
)(MapsBar);

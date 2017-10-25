import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { find, map } from "lodash";

import Node from "./Node";

import { setActiveNode } from "../../actions/activeMapActions";

import { coordinatesInsideNode } from "../../utils";

const Map = ({ activeMap, setActiveNode }) => {
  return (
    <div
      className="map"
      id="map"
      onClick={e =>
        !coordinatesInsideNode(
          e.pageX,
          e.pageY - document.getElementById("map").getBoundingClientRect().top,
          activeMap
        ) && setActiveNode(-1)}
    >
      {map(activeMap.nodes, (node, i) => (
        <Node
          key={i}
          node={node}
          zoom={activeMap.zoom}
          onClickAction={() => setActiveNode(i)}
        />
      ))}
    </div>
  );
};

export default compose(
  connect(({ maps: { list } }) => ({ activeMap: find(list, m => m.active) }), {
    setActiveNode
  })
)(Map);

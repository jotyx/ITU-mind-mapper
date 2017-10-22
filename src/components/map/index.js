import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { find, map } from "lodash";

import Node from "./Node";

import { setActiveNode } from "../../actions/activeMapActions";

const Map = ({ activeMap, setActiveNode }) => {
  return (
    <div className="map">
      {map(activeMap.nodes, (node, i) => (
        <Node key={i} node={node} onClickAction={() => setActiveNode(i)} />
      ))}
    </div>
  );
};

export default compose(
  connect(({ maps: { list } }) => ({ activeMap: find(list, m => m.active) }), {
    setActiveNode
  })
)(Map);

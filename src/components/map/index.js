import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { find, map, isEmpty, maxBy } from "lodash";

import Node from "./Node";
import Line from "./Line";

import { setActiveNode } from "../../actions/activeMapActions";

import { coordinatesInsideNode } from "../../utils";

const Map = ({ activeMap, setActiveNode }) => {
  const linesPoints = [];

  for (let i = 0; i < activeMap.nodes.length; i++) {
    for (let j = 0; j < activeMap.nodes[i].childNodes.length; j++) {
      linesPoints.push({
        nodeFrom: activeMap.nodes[i],
        nodeTo: find(
          activeMap.nodes,
          n => n.id === activeMap.nodes[i].childNodes[j]
        )
      });
    }
  }

  const maxX = isEmpty(activeMap.nodes)
    ? 0
    : maxBy(activeMap.nodes, item => item.x).x +
      maxBy(activeMap.nodes, item => item.x).width;
  const maxY = isEmpty(activeMap.nodes)
    ? 0
    : maxBy(activeMap.nodes, item => item.y).y +
      maxBy(activeMap.nodes, item => item.y).height;

  return (
    <div
      className="map"
      id="map"
      onClick={e =>
        false &&
        !coordinatesInsideNode(
          e.pageX,
          e.pageY - document.getElementById("map").getBoundingClientRect().top,
          activeMap
        ) &&
        setActiveNode(-1)}
      style={{ backgroundColor: activeMap.backgroundColor }}
    >
      {!isEmpty(linesPoints) && (
        <svg style={{ width: maxX, height: maxY }}>
          {map(linesPoints, (l, i) => (
            <Line
              key={i}
              nodeFrom={l.nodeFrom}
              nodeTo={l.nodeTo}
              zoom={activeMap.zoom}
              color={activeMap.lineColor}
            />
          ))}
        </svg>
      )}
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

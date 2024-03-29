import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { find, map, isEmpty, maxBy } from "lodash";

import Node from "./Node";
import Line from "./Line";

import { setActiveNode } from "../../actions/activeMapActions";
import { activeNodeResizeNode, activeNodeResizeNodePreview } from "../../actions/activeMapActions";

import { coordinatesInsideNode } from "../../utils";

const Map = ({ activeMap, setActiveNode, activeNodeResizeNode, activeNodeResizeNodePreview }) => {
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
    : ( maxBy(activeMap.nodes, item => item.x).x +
        maxBy(activeMap.nodes, item => item.x).width ) * (activeMap.zoom / 100);
  const maxY = isEmpty(activeMap.nodes)
    ? 0
    : ( maxBy(activeMap.nodes, item => item.y).y +
        maxBy(activeMap.nodes, item => item.y).height )  * (activeMap.zoom / 100);

  return (
    <div className="outer-map">
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
      style={{ width: maxX+30, height: maxY+30, backgroundColor: activeMap.backgroundColor }}
    >
      {!isEmpty(linesPoints) && (
        <svg style={{ width: "inherit", height: "inherit" }}>
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
          onResizeNode={activeNodeResizeNode}
          onResizeNodePreview={activeNodeResizeNodePreview}
        />
      ))}
    </div>
    </div>
  );
};

export default compose(
  connect(({ maps: { list } }) => ({ activeMap: find(list, m => m.active) }), {
    setActiveNode,
    activeNodeResizeNode,
    activeNodeResizeNodePreview,
  })
)(Map);

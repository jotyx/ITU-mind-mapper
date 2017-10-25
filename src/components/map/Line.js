import React from "react";

const Line = ({ nodeFrom, nodeTo, zoom }) => {
  return (
    <polyline
      points={`${(nodeFrom.x + nodeFrom.width) * (zoom / 100)}, ${(nodeFrom.y +
        nodeFrom.height / 2) *
        (zoom / 100)} ${nodeTo.x * (zoom / 100)}, ${(nodeTo.y +
        nodeTo.height / 2) *
        (zoom / 100)}`}
    />
  );
};

export default Line;

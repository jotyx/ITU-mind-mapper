import React from "react";
import classNames from "classnames";

const Node = ({ node, onClickAction, zoom }) => {
  return (
    <div
      className={classNames("node", { active: node.active })}
      style={{
        backgroundColor: node.color,
        borderColor: node.borderColor,
        position: "absolute",
        left: node.x * (zoom / 100),
        top: node.y * (zoom / 100),
        width: node.width * (zoom / 100),
        height: node.height * (zoom / 100)
      }}
      onClick={() => onClickAction()}
    >
      <div
        className={`title font-${node.font}`}
        style={{
          color: node.titleColor,
          fontSize: Math.round(Number(node.fontSize) * (zoom / 100))
        }}
      >
        {node.title}
      </div>
    </div>
  );
};

export default Node;

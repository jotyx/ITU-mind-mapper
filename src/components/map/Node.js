import React from "react";
import classNames from "classnames";

const Node = ({ node, onClickAction }) => {
  return (
    <div
      className={classNames("node", { active: node.active })}
      style={{
        backgroundColor: node.color,
        position: "absolute",
        left: node.x,
        top: node.y,
        width: node.width,
        height: node.height
      }}
      onClick={() => onClickAction()}
    >
      <div
        className="title"
        style={{
          color: node.titleColor,
          fontSize: node.fontSize
        }}
      >
        {node.title}
      </div>
    </div>
  );
};

export default Node;

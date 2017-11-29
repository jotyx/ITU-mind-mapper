import React from "react";
import { Resizable } from 'react-resizable';
import classNames from "classnames";

class Node extends React.Component {
  onResizeHandler = (event, { element, size }) => {
    this.props.onResizeNode(size.width, size.height)
  }

  onResizePreviewHandler = (event, { element, size }) => {
    this.props.onResizeNodePreview(size.width, size.height)
  }

  render() {
    const { node, zoom, onClickAction } = this.props
    return (
      <Resizable
        width={ node.width * (zoom / 100) }
        height={ node.height * (zoom / 100) }
        axis={ node.active ? "both" : "none" }
        onResizeStart={ this.onResizeHandler }
        onResize={ this.onResizePreviewHandler }
        style={{
          position: "absolute",
          left: node.x * (zoom / 100),
          top: node.y * (zoom / 100),
      }}
      >
        <div
          className={classNames("node", { active: node.active })}
          style={{
            backgroundColor: node.color,
            borderColor: node.borderColor,
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
      </Resizable>
    )
  }
}

export default Node;

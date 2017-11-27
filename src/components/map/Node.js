import React from "react";
import { Resizable, ResizableBox } from 'react-resizable';
import classNames from "classnames";

class Node extends React.Component {
  onResizeHandler = (event, { element, size }) => {
    console.log(this.props.node.id)
    console.log(size.width)
    console.log(size.height)
    this.props.onResizeNode(size.width, size.height)
  }

  render() {
    const { node, zoom, onClickAction } = this.props
    return (
      <Resizable
        className="box box3"
        width={ node.width * (zoom / 100) }
        height={ node.height * (zoom / 100) }
        axis={ node.active ? "both" : "none" }
        onResize={ this.onResizeHandler }
        style={{
          // backgroundColor: node.color,
          // borderColor: node.borderColor,
          position: "absolute",
          left: node.x * (zoom / 100),
          top: node.y * (zoom / 100),
          // width: node.width * (zoom / 100),
          // height: node.height * (zoom / 100)
      }}
      >
        <div
          className={classNames("node", { active: node.active })}
          style={{
            backgroundColor: node.color,
            borderColor: node.borderColor,
            // position: "absolute",
            // left: node.x * (zoom / 100),
            // top: node.y * (zoom / 100),
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

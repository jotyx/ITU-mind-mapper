import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { find, isEmpty } from "lodash";
import { FontIcon } from "react-md";
import ReactTooltip from "react-tooltip";

import Menu from "./Menu";
import Icon from "./Icon";

import { setDialog } from "../../actions/appActions";
import {
  newNode,
  removeNode,
  undo,
  redo,
  changeZoom,
  newChildNode
} from "../../actions/activeMapActions";

const WorkBar = ({
  setDialog,
  newNode,
  activeNode,
  removeNode,
  undo,
  redo,
  activeMap,
  changeZoom,
  newChildNode
}) => {
  return (
    <div className="work-bar">
      <Menu />
      <Icon
        iconType="fa-plus-square-o"
        tooltipLabel="Přidat uzel"
        onClickAction={() => newNode()}
      />
      {activeNode && (
        <span className="icon-stack" onClick={() => newChildNode()}>
          <FontIcon
            iconClassName="fa fa-square-o icon full-size"
            data-tip="Přidat potomka"
          />
          <ReactTooltip
            className="icon-tooltip"
            type="dark"
            effect="solid"
            place="bottom"
          />
          <FontIcon iconClassName="fa fa-square icon top-left" />
          <FontIcon iconClassName="fa fa-plus-square-o icon bottom-right" />

          <svg style={{ width: 24, height: 24 }}>
            <polyline points="10, 10 20, 20" />
          </svg>
        </span>
      )}
      {activeNode && <div className="vertical-line" />}
      {activeNode && (
        <Icon
          iconType="fa-files-o"
          tooltipLabel="Kopírovat uzel"
          onClickAction={() => null}
        />
      )}
      {activeNode && (
        <Icon
          iconType="fa-paint-brush"
          tooltipLabel="Změnit barvu uzlu"
          onClickAction={() =>
            setDialog("ActiveNodeColorChange", {
              color: activeNode.color,
              borderColor: activeNode.borderColor,
              titleColor: activeNode.titleColor
            })}
        />
      )}
      {activeNode && (
        <Icon
          iconType="fa-font"
          tooltipLabel="Změnit font"
          onClickAction={() =>
            setDialog("ActiveNodeFontChange", {
              font: activeNode.font,
              fontSize: activeNode.fontSize
            })}
        />
      )}
      {activeNode && (
        <Icon
          iconType="fa-pencil-square-o"
          tooltipLabel="Upravit uzel"
          onClickAction={() => setDialog("ActiveNodeTitleChange", activeNode)}
        />
      )}
      {activeNode && (
        <Icon
          iconType="fa-trash-o"
          tooltipLabel="Odstranit uzel"
          onClickAction={() => removeNode()}
        />
      )}
      <div className="vertical-line" />
      <Icon
        iconType="fa-undo"
        tooltipLabel="Zpět"
        onClickAction={() => !isEmpty(activeMap.undo) && undo()}
        disabled={isEmpty(activeMap.undo)}
      />
      <Icon
        iconType="fa-repeat"
        tooltipLabel="Opakovat"
        onClickAction={() => !isEmpty(activeMap.redo) && redo()}
        disabled={isEmpty(activeMap.redo)}
      />
      <div className="vertical-line" />
      <Icon
        iconType="fa-search-plus"
        tooltipLabel="Přiblížit"
        onClickAction={() =>
          activeMap.zoom < 500 && changeZoom(activeMap.zoom + 25)}
      />
      <Icon
        iconType="fa-search"
        tooltipLabel="Původní přiblížení"
        onClickAction={() => changeZoom(100)}
      />
      <Icon
        iconType="fa-search-minus"
        tooltipLabel="Oddálit"
        onClickAction={() =>
          activeMap.zoom > 25 && changeZoom(activeMap.zoom - 25)}
      />
      <div className="vertical-line" />
      <Icon
        iconType="fa-question-circle"
        tooltipLabel="Nápověda"
        onClickAction={() => setDialog("Help")}
      />
    </div>
  );
};

export default compose(
  connect(
    ({ maps: { list } }) => ({
      activeMap: find(list, m => m.active),
      activeNode: find(find(list, m => m.active).nodes, n => n.active)
    }),
    { setDialog, newNode, removeNode, undo, redo, changeZoom, newChildNode }
  )
)(WorkBar);

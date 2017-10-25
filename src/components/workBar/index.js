import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { find, isEmpty } from "lodash";

import Menu from "./Menu";
import Icon from "./Icon";

import { setDialog } from "../../actions/appActions";
import {
  newNode,
  removeNode,
  undo,
  redo
} from "../../actions/activeMapActions";

const WorkBar = ({
  setDialog,
  newNode,
  activeNode,
  removeNode,
  undo,
  redo,
  activeMap
}) => {
  return (
    <div className="work-bar">
      <Menu />
      <Icon
        iconType="fa-plus-square-o"
        tooltipLabel="Přidat uzel"
        onClickAction={() => newNode()}
      />
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
        onClickAction={() => null}
      />
      <Icon
        iconType="fa-search"
        tooltipLabel="Původní přiblížení"
        onClickAction={() => null}
      />
      <Icon
        iconType="fa-search-minus"
        tooltipLabel="Oddálit"
        onClickAction={() => null}
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
    { setDialog, newNode, removeNode, undo, redo }
  )
)(WorkBar);

import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { find } from "lodash";

import Menu from "./Menu";
import Icon from "./Icon";

import { setDialog } from "../../actions/appActions";
import { newNode, removeNode } from "../../actions/activeMapActions";

const WorkBar = ({ setDialog, newNode, activeNode, removeNode }) => {
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
          onClickAction={() => null}
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
      <Icon iconType="fa-undo" tooltipLabel="Zpět" onClickAction={() => null} />
      <Icon
        iconType="fa-repeat"
        tooltipLabel="Opakovat"
        onClickAction={() => null}
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
        onClickAction={() =>
          setDialog("Info", {
            title: "Nápověda",
            text: "Nějaká super nápověda."
          })}
      />
    </div>
  );
};

export default compose(
  connect(
    ({ maps: { list } }) => ({
      activeNode: find(find(list, m => m.active).nodes, n => n.active)
    }),
    { setDialog, newNode, removeNode }
  )
)(WorkBar);

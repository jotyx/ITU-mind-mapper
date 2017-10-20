import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import Menu from "./Menu";
import Icon from "./Icon";

import { setDialog } from "../../actions/appActions";

const WorkBar = ({ setDialog }) => {
  return (
    <div className="work-bar">
      <Menu />
      <Icon
        iconType="fa-plus-square-o"
        tooltipLabel="Přidat uzel"
        onClickAction={() => null}
      />
      <Icon
        iconType="fa-files-o"
        tooltipLabel="Kopírovat uzel"
        onClickAction={() => null}
      />
      <div className="vertical-line" />
      <Icon
        iconType="fa-paint-brush"
        tooltipLabel="Změnit barvu uzlu"
        onClickAction={() => null}
      />
      <Icon
        iconType="fa-font"
        tooltipLabel="Změnit font"
        onClickAction={() => null}
      />
      <Icon
        iconType="fa-pencil-square-o"
        tooltipLabel="Upravit uzel"
        onClickAction={() => null}
      />
      <Icon
        iconType="fa-trash-o"
        tooltipLabel="Odstranit uzel"
        onClickAction={() => null}
      />
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

export default compose(connect(null, { setDialog }))(WorkBar);

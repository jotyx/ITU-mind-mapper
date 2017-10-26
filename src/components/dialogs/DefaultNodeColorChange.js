import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { map } from "lodash";
import classNames from "classnames";

import DialogContainer from "./DialogContainer";

import { defaultNodeChangeColor } from "../../actions/activeMapActions";
import { setDialog } from "../../actions/appActions";

import { colors } from "../../enums";

const DefaultNodeColorChange = ({ handleSubmit, data, setDialog }) => (
  <DialogContainer
    title="Změnit výchozí barvu uzlů"
    name="DefaultNodeColorChange"
    handleSubmit={handleSubmit}
    submitLabel="Změnit"
  >
    {data && (
      <div className="flex-col">
        <div className="flex-row flex-center">Barva pozadí</div>
        <div className="dialog-color-change margin-bottom">
          {map(colors, (c, i) => (
            <div
              key={i}
              className={classNames("btn-color", { active: c === data.color })}
              style={{ backgroundColor: c }}
              onClick={() =>
                setDialog("DefaultNodeColorChange", {
                  color: c,
                  titleColor: data.titleColor,
                  borderColor: data.borderColor
                })}
            />
          ))}
        </div>
        <div className="horizontal-line" />
        <div className="flex-row flex-center margin-top">Barva okraje</div>
        <div className="dialog-color-change margin-bottom">
          {map(colors, (c, i) => (
            <div
              key={i}
              className={classNames("btn-color", {
                active: c === data.borderColor
              })}
              style={{ backgroundColor: c }}
              onClick={() =>
                setDialog("DefaultNodeColorChange", {
                  borderColor: c,
                  color: data.color,
                  titleColor: data.titleColor
                })}
            />
          ))}
        </div>
        <div className="horizontal-line" />
        <div className="flex-row flex-center margin-top">Barva textu</div>
        <div className="dialog-color-change">
          {map(colors, (c, i) => (
            <div
              key={i}
              className={classNames("btn-color", {
                active: c === data.titleColor
              })}
              style={{ backgroundColor: c }}
              onClick={() =>
                setDialog("DefaultNodeColorChange", {
                  titleColor: c,
                  color: data.color,
                  borderColor: data.borderColor
                })}
            />
          ))}
        </div>
      </div>
    )}
  </DialogContainer>
);

export default compose(
  connect(
    ({ app: { dialog: { data } } }) => ({
      data
    }),
    {
      defaultNodeChangeColor,
      setDialog
    }
  ),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { defaultNodeChangeColor, data } = props;
      defaultNodeChangeColor(data.color, data.borderColor, data.titleColor);
      dialog.closeDialog();
    }
  }),
  reduxForm({
    form: "defaultNodeColorChangeForm"
  })
)(DefaultNodeColorChange);

import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { map } from "lodash";
import classNames from "classnames";

import DialogContainer from "./DialogContainer";

import { activeNodeChangeColor } from "../../actions/activeMapActions";
import { setDialog } from "../../actions/appActions";

import { colors } from "../../enums";

const ActiveNodeColorChange = ({ handleSubmit, data, setDialog }) => (
  <DialogContainer
    title="Změnit barvu uzlu"
    name="ActiveNodeColorChange"
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
                setDialog("ActiveNodeColorChange", {
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
                setDialog("ActiveNodeColorChange", {
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
                setDialog("ActiveNodeColorChange", {
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
      activeNodeChangeColor,
      setDialog
    }
  ),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { activeNodeChangeColor, data } = props;
      activeNodeChangeColor(data.color, data.borderColor, data.titleColor);
      dialog.closeDialog();
    }
  }),
  reduxForm({
    form: "activeNodeColorChangeForm"
  })
)(ActiveNodeColorChange);

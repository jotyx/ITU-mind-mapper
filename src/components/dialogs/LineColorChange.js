import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { map } from "lodash";
import classNames from "classnames";

import DialogContainer from "./DialogContainer";

import { lineColorChange } from "../../actions/activeMapActions";
import { setDialog } from "../../actions/appActions";

import { colors } from "../../enums";

const LineColorChange = ({ handleSubmit, data, setDialog }) => (
  <DialogContainer
    title="Změnit barvu spojnic"
    name="LineColorChange"
    handleSubmit={handleSubmit}
    submitLabel="Změnit"
  >
    {data && (
      <div className="dialog-color-change">
        {map(colors, (c, i) => (
          <div
            key={i}
            className={classNames("btn-color", {
              active: c === data.lineColor
            })}
            style={{ backgroundColor: c }}
            onClick={() =>
              setDialog("LineColorChange", {
                lineColor: c
              })}
          />
        ))}
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
      lineColorChange,
      setDialog
    }
  ),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { lineColorChange, data } = props;
      lineColorChange(data.lineColor);
      dialog.closeDialog();
    }
  }),
  reduxForm({
    form: "lineColorChangeForm"
  })
)(LineColorChange);

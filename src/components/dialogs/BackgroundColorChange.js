import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { map } from "lodash";
import classNames from "classnames";

import DialogContainer from "./DialogContainer";

import { backgroundColorChange } from "../../actions/activeMapActions";
import { setDialog } from "../../actions/appActions";

import { colors } from "../../enums";

const BackgroundColorChange = ({ handleSubmit, data, setDialog }) => (
  <DialogContainer
    title="Změnit barvu pozadí"
    name="BackgroundColorChange"
    handleSubmit={handleSubmit}
    submitLabel="Změnit"
  >
    {data && (
      <div className="dialog-color-change">
        {map(colors, (c, i) => (
          <div
            key={i}
            className={classNames("btn-color", {
              active: c === data.backgroundColor
            })}
            style={{ backgroundColor: c }}
            onClick={() =>
              setDialog("BackgroundColorChange", {
                backgroundColor: c
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
      backgroundColorChange,
      setDialog
    }
  ),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { backgroundColorChange, data } = props;
      backgroundColorChange(data.backgroundColor);
      dialog.closeDialog();
    }
  }),
  reduxForm({
    form: "backgroundColorChangeForm"
  })
)(BackgroundColorChange);

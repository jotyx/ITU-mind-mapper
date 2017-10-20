import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { withRouter } from "react-router-dom";

import DialogContainer from "./DialogContainer";

const Info = ({ handleSubmit, data }) => (
  <DialogContainer
    title={data && data.title ? data.title : ""}
    name="Info"
    handleSubmit={handleSubmit}
    submitLabel="OK"
  >
    <form onSubmit={handleSubmit}>
      <p>{data && data.text ? data.text : ""}</p>
    </form>
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ data }), null),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      dialog.closeDialog();
    }
  }),
  reduxForm({
    form: "infoDialogForm"
  })
)(Info);

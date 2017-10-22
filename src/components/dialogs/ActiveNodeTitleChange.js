import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import { isEmpty } from "lodash";

import DialogContainer from "./DialogContainer";
import Input from "../form/Input";
import * as Validation from "../form/Validation";

import { activeNodeChangeTitle } from "../../actions/activeMapActions";

const ActiveNodeTitleChange = ({ handleSubmit, initialValues }) => (
  <DialogContainer
    title="Změnit popis uzlu"
    name="ActiveNodeTitleChange"
    handleSubmit={handleSubmit}
    submitLabel="Změnit"
  >
    {!isEmpty(initialValues) && (
      <form onSubmit={handleSubmit}>
        <Field
          component={Input}
          name="title"
          placeholder="Popis uzlu"
          validate={[Validation.required]}
        />
      </form>
    )}
  </DialogContainer>
);

export default compose(
  connect(
    ({ app: { dialog: { data } } }) => ({
      initialValues: data
    }),
    {
      activeNodeChangeTitle
    }
  ),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { activeNodeChangeTitle } = props;
      activeNodeChangeTitle(formData.title);
      dialog.closeDialog();
    }
  }),
  reduxForm({
    form: "activeNodeTitleChangeForm",
    enableReinitialize: true
  })
)(ActiveNodeTitleChange);

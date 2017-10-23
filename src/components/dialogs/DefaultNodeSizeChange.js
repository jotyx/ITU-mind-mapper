import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import { isEmpty } from "lodash";

import DialogContainer from "./DialogContainer";
import Input from "../form/Input";
import * as Validation from "../form/Validation";

import { defaultNodeChangeSize } from "../../actions/activeMapActions";

const DefaultNodeSizeChange = ({ handleSubmit, setDialog, initialValues }) => (
  <DialogContainer
    title="Změnit výchozí velikost uzlů"
    name="DefaultNodeSizeChange"
    handleSubmit={handleSubmit}
    submitLabel="Změnit"
  >
    {!isEmpty(initialValues) && (
      <form onSubmit={handleSubmit}>
        <Field
          component={Input}
          name="defaultNodeWidth"
          label="Šířka"
          type="number"
          validate={[Validation.required, Validation.greaterEqual50]}
        />
        <Field
          component={Input}
          name="defaultNodeHeight"
          label="Výška"
          type="number"
          validate={[Validation.required, Validation.greaterEqual50]}
        />
      </form>
    )}
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ initialValues: data }), {
    defaultNodeChangeSize
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { defaultNodeChangeSize } = props;
      defaultNodeChangeSize(
        Number(formData.defaultNodeWidth),
        Number(formData.defaultNodeHeight)
      );
      dialog.closeDialog();
    }
  }),
  reduxForm({
    form: "defaultNodeSizeChangeForm",
    enableReinitialize: true
  })
)(DefaultNodeSizeChange);

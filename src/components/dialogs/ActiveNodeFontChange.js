import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import { isEmpty } from "lodash";

import DialogContainer from "./DialogContainer";
import Select from "../form/Select";
import * as Validation from "../form/Validation";

import { activeNodeChangeFont } from "../../actions/activeMapActions";

import { fonts, fontSizes } from "../../enums";

const ActiveNodeFontChange = ({ handleSubmit, setDialog, initialValues }) => (
  <DialogContainer
    title="Změnit font"
    name="ActiveNodeFontChange"
    handleSubmit={handleSubmit}
    submitLabel="Změnit"
  >
    {!isEmpty(initialValues) && (
      <form onSubmit={handleSubmit}>
        <Field
          component={Select}
          name="font"
          label="Font"
          options={fonts}
          validate={[Validation.required]}
        />
        <Field
          component={Select}
          name="fontSize"
          label="Velikost"
          options={fontSizes}
          validate={[Validation.required]}
        />
      </form>
    )}
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ initialValues: data }), {
    activeNodeChangeFont
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { activeNodeChangeFont } = props;
      activeNodeChangeFont(formData.font, formData.fontSize);
      dialog.closeDialog();
    }
  }),
  reduxForm({
    form: "activeNodeFontChangeForm",
    enableReinitialize: true
  })
)(ActiveNodeFontChange);

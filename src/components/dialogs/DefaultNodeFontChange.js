import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import { isEmpty } from "lodash";

import DialogContainer from "./DialogContainer";
import Select from "../form/Select";
import * as Validation from "../form/Validation";

import { defaultNodeChangeFont } from "../../actions/activeMapActions";

import { fonts, fontSizes } from "../../enums";

const DefaultNodeFontChange = ({ handleSubmit, setDialog, initialValues }) => (
  <DialogContainer
    title="Změnit výchozí font uzlů"
    name="DefaultNodeFontChange"
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
    defaultNodeChangeFont
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { defaultNodeChangeFont } = props;
      console.log(formData.font, formData.fontSize);
      defaultNodeChangeFont(formData.font, formData.fontSize);
      dialog.closeDialog();
    }
  }),
  reduxForm({
    form: "defaultNodeFontChangeForm"
  })
)(DefaultNodeFontChange);

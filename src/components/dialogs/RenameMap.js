import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { withRouter } from "react-router-dom";
import { isEmpty } from "lodash";

import DialogContainer from "./DialogContainer";
import Input from "../form/Input";

import { renameMap } from "../../actions/mapsActions";

const RenameMap = ({ handleSubmit, initialValues }) => (
  <DialogContainer
    title="Přejmenovat mapu"
    name="RenameMap"
    handleSubmit={handleSubmit}
    submitLabel="Přejmenovat"
  >
    {!isEmpty(initialValues) && (
      <form onSubmit={handleSubmit}>
        <Field component={Input} name="name" placeholder="Název mapy" />
      </form>
    )}
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ initialValues: data }), {
    renameMap
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { renameMap, initialValues } = props;
      if (renameMap(initialValues.name, formData.name)) dialog.closeDialog();
      else
        throw new SubmissionError({
          name: "Mapa se zadaným jménem již existuje."
        });
    }
  }),
  reduxForm({
    form: "renameMapForm",
    enableReinitialize: true
  })
)(RenameMap);

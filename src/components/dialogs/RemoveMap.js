import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import DialogContainer from "./DialogContainer";

import { removeMap } from "../../actions/mapsActions";

const RemoveMap = ({ handleSubmit, data }) => (
  <DialogContainer
    title="Zavřít mapu"
    name="RemoveMap"
    handleSubmit={handleSubmit}
    submitLabel="Ano"
  >
    Opravdu si přejete zavřít mapu "{data ? data.name : ""}"?
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ data }), {
    removeMap
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { removeMap, data } = props;
      removeMap(data.name);
      dialog.closeDialog();
    }
  }),
  reduxForm({
    form: "removeMapForm",
    enableReinitialize: true
  })
)(RemoveMap);

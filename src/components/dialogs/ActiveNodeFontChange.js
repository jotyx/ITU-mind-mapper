import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { withRouter } from "react-router-dom";
import { isEmpty } from "lodash";
import classNames from "classnames";

import DialogContainer from "./DialogContainer";
import Select from "../form/Select";
import * as Validation from "../form/Validation";

import { activeNodeChangeFont } from "../../actions/activeMapActions";

const optionsFont = [
  { value: "arial", label: "Arial" },
  { value: "arialBlack", label: "Arial Black" },
  { value: "comic", label: "Comic Sans MS" },
  { value: "courier", label: "Courier New" },
  { value: "georgia", label: "Georgia" },
  { value: "impact", label: "Impact" },
  { value: "lucida", label: "Lucida Sans Unicode" },
  { value: "lucidaConsole", label: "Lucida Console" },
  { value: "palatino", label: "Palatino Linotype" },
  { value: "tahoma", label: "Tahoma" },
  { value: "times", label: "Times New Roman" },
  { value: "trebuchet", label: "Trebuchet MS" },
  { value: "verdana", label: "Verdana" }
];

const optionsSize = [
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "11" },
  { value: 12, label: "12" },
  { value: 13, label: "13" },
  { value: 14, label: "14" },
  { value: 15, label: "15" },
  { value: 16, label: "16" },
  { value: 18, label: "18" },
  { value: 20, label: "20" },
  { value: 22, label: "22" },
  { value: 24, label: "24" },
  { value: 26, label: "26" },
  { value: 28, label: "28" },
  { value: 30, label: "30" },
  { value: 32, label: "32" },
  { value: 36, label: "36" },
  { value: 40, label: "40" },
  { value: 44, label: "44" },
  { value: 50, label: "50" }
];

const ActiveNodeFontChange = ({
  handleSubmit,
  color,
  data,
  setDialog,
  initialValues
}) => (
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
          options={optionsFont}
          validate={[Validation.required]}
        />
        <Field
          component={Select}
          name="fontSize"
          label="Velikost"
          options={optionsSize}
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
      const { activeNodeChangeFont, data } = props;
      activeNodeChangeFont(formData.font, formData.fontSize);
      dialog.closeDialog();
    }
  }),
  reduxForm({
    form: "activeNodeFontChangeForm"
  })
)(ActiveNodeFontChange);

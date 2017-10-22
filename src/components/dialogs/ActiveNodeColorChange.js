import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { map } from "lodash";
import classNames from "classnames";

import DialogContainer from "./DialogContainer";

import { activeNodeChangeColor } from "../../actions/activeMapActions";
import { setDialog } from "../../actions/appActions";

const colors = [
  "#001f3f",
  "#0074D9",
  "#7FDBFF",
  "#39CCCC",
  "#3D9970",
  "#2ECC40",
  "#01FF70",
  "#FFDC00",
  "#FF851B",
  "#FF4136",
  "#85144b",
  "#F012BE",
  "#B10DC9",
  "#111111",
  "#AAAAAA",
  "#DDDDDD",
  "#FFFFFF"
];

const ActiveNodeColorChange = ({ handleSubmit, color, data, setDialog }) => (
  <DialogContainer
    title="Změnit barvu uzlu"
    name="ActiveNodeColorChange"
    handleSubmit={handleSubmit}
    submitLabel="Změnit"
  >
    {data && (
      <div className="dialog-color-change">
        {map(colors, (c, i) => (
          <div
            key={i}
            className={classNames("btn-color", { active: c === data.color })}
            style={{ backgroundColor: c }}
            onClick={() => setDialog("ActiveNodeColorChange", { color: c })}
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
      activeNodeChangeColor,
      setDialog
    }
  ),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { activeNodeChangeColor, data } = props;
      activeNodeChangeColor(data.color);
      dialog.closeDialog();
    }
  }),
  reduxForm({
    form: "activeNodeColorChangeForm"
  })
)(ActiveNodeColorChange);

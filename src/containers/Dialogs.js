import React from "react";
import { connect } from "react-redux";

import RenameMap from "../components/dialogs/RenameMap";

import { setDialog, closeDialog } from "../actions/appActions";

const Dialogs = props => {
  return (
    <div>
      <RenameMap {...props} />
    </div>
  );
};

export default connect(({ app: { dialog } }) => ({ dialog }), {
  setDialog,
  closeDialog
})(Dialogs);

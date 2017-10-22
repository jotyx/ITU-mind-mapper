import React from "react";
import { connect } from "react-redux";

import RenameMap from "../components/dialogs/RenameMap";
import Info from "../components/dialogs/Info";
import ActiveNodeTitleChange from "../components/dialogs/ActiveNodeTitleChange";
import ActiveNodeColorChange from "../components/dialogs/ActiveNodeColorChange";
import ActiveNodeFontChange from "../components/dialogs/ActiveNodeFontChange";

import { closeDialog } from "../actions/appActions";

const Dialogs = props => {
  return (
    <div>
      <RenameMap {...props} />
      <Info {...props} />
      <ActiveNodeTitleChange {...props} />
      <ActiveNodeColorChange {...props} />
      <ActiveNodeFontChange {...props} />
    </div>
  );
};

export default connect(({ app: { dialog } }) => ({ dialog }), {
  closeDialog
})(Dialogs);

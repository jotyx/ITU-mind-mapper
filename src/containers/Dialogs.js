import React from "react";
import { connect } from "react-redux";

import RenameMap from "../components/dialogs/RenameMap";
import Info from "../components/dialogs/Info";
import Help from "../components/dialogs/Help";
import ActiveNodeTitleChange from "../components/dialogs/ActiveNodeTitleChange";
import ActiveNodeColorChange from "../components/dialogs/ActiveNodeColorChange";
import ActiveNodeFontChange from "../components/dialogs/ActiveNodeFontChange";
import DefaultNodeColorChange from "../components/dialogs/DefaultNodeColorChange";
import DefaultNodeFontChange from "../components/dialogs/DefaultNodeFontChange";
import DefaultNodeSizeChange from "../components/dialogs/DefaultNodeSizeChange";
import BackgroundColorChange from "../components/dialogs/BackgroundColorChange";

import { closeDialog } from "../actions/appActions";

const Dialogs = props => {
  return (
    <div>
      <RenameMap {...props} />
      <Info {...props} />
      <Help {...props} />
      <ActiveNodeTitleChange {...props} />
      <ActiveNodeColorChange {...props} />
      <ActiveNodeFontChange {...props} />
      <DefaultNodeColorChange {...props} />
      <DefaultNodeFontChange {...props} />
      <DefaultNodeSizeChange {...props} />
      <BackgroundColorChange {...props} />
    </div>
  );
};

export default connect(({ app: { dialog } }) => ({ dialog }), {
  closeDialog
})(Dialogs);

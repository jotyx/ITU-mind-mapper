import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { find } from "lodash";
import { DropdownButton, MenuItem } from "react-bootstrap";

import { newMap } from "../../actions/mapsActions";
import { setDialog } from "../../actions/appActions";

const Menu = ({ newMap, setDialog, list }) => {
  return (
    <div className="menu">
      <DropdownButton
        title="Menu"
        bsStyle="primary"
        noCaret
        id="drop-down-menu"
      >
        <MenuItem eventKey="1" onClick={() => newMap()}>
          Nová mapa
        </MenuItem>
        <MenuItem eventKey="2">Načíst ze souboru</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="3">Uložit do souboru</MenuItem>
        <MenuItem
          eventKey="4"
          onClick={() =>
            setDialog("RenameMap", {
              name: find(list, m => m.active).name
            })}
        >
          Přejmenovat
        </MenuItem>
        <MenuItem eventKey="5">Exportovat do obrázku</MenuItem>
      </DropdownButton>
    </div>
  );
};

export default compose(
  connect(({ maps: { list } }) => ({ list }), { newMap, setDialog })
)(Menu);

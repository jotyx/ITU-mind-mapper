import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { DropdownButton, MenuItem } from "react-bootstrap";

import { newMap } from "../../actions/mapsActions";

const Menu = ({ newMap }) => {
  return (
    <div className="menu">
      <DropdownButton title="Menu" bsStyle="primary" noCaret id="drop-down-menu">
        <MenuItem eventKey="1" onClick={() => newMap()}>
          Nová mapa
        </MenuItem>
        <MenuItem eventKey="2">Načíst ze souboru</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="3">Uložit do souboru</MenuItem>
        <MenuItem eventKey="4">Přejmenovat</MenuItem>
        <MenuItem eventKey="5">Exportovat do obrázku</MenuItem>
      </DropdownButton>
    </div>
  );
};

export default compose(connect(null, { newMap }))(Menu);

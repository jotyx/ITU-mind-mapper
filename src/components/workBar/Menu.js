import React from "react";
import { SplitButton, MenuItem } from "react-bootstrap";

const Menu = () => {
  return (
    <div className="menu">
      <SplitButton title="Menu" id="drop-down-menu">
        <MenuItem eventKey="1">Nová mapa</MenuItem>
        <MenuItem eventKey="2">Načíst ze souboru</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="3">Uložit do souboru</MenuItem>
        <MenuItem eventKey="4">Přejmenovat</MenuItem>
        <MenuItem eventKey="5">Exportovat do obrázku</MenuItem>
      </SplitButton>
    </div>
  );
};

export default Menu;

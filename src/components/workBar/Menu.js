import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { find } from "lodash";
import { DropdownButton, MenuItem, Glyphicon } from "react-bootstrap";
import ReactTooltip from "react-tooltip";

import { newMap } from "../../actions/mapsActions";
import { setDialog } from "../../actions/appActions";

import { downloadFile } from "../../utils";

const Menu = ({ newMap, setDialog, list }) => {
  const activeMap = find(list, m => m.active);
  return (
    <div className="menu">
      <DropdownButton
        title={<Glyphicon glyph="menu-hamburger" />}
        bsStyle="primary"
        noCaret
        id="drop-down-menu"
        data-tip="Menu"
      >
        <MenuItem eventKey="1" onClick={() => newMap()}>
          Nová mapa
        </MenuItem>
        <MenuItem eventKey="2">Načíst ze souboru</MenuItem>
        <MenuItem divider />
        <MenuItem
          eventKey="3"
          onClick={() =>
            downloadFile(
              `${activeMap.name}.json`,
              JSON.stringify({ ...activeMap, active: false }),
              "text/plain"
            )}
        >
          Uložit mapu
        </MenuItem>
        <MenuItem
          eventKey="4"
          onClick={() =>
            setDialog("RenameMap", {
              name: activeMap.name
            })}
        >
          Přejmenovat
        </MenuItem>
        <MenuItem eventKey="5">Exportovat do obrázku</MenuItem>
        <MenuItem divider />
        <MenuItem
          eventKey="6"
          onClick={() =>
            setDialog("DefaultNodeColorChange", {
              color: activeMap.defaultNodeColor,
              borderColor: activeMap.defaultNodeBorderColor,
              titleColor: activeMap.defaultNodeTitleColor
            })}
        >
          Změnit výchozí barvu uzlů
        </MenuItem>
        <MenuItem
          eventKey="7"
          onClick={() =>
            setDialog("DefaultNodeFontChange", {
              font: activeMap.defaultNodeFont,
              fontSize: activeMap.defaultNodeFontSize
            })}
        >
          Změnit výchozí font uzlů
        </MenuItem>
        <MenuItem
          eventKey="8"
          onClick={() =>
            setDialog("DefaultNodeSizeChange", {
              defaultNodeWidth: activeMap.defaultNodeWidth,
              defaultNodeHeight: activeMap.defaultNodeHeight
            })}
        >
          Změnit výchozí velikost uzlů
        </MenuItem>
      </DropdownButton>
      <ReactTooltip
        className="icon-tooltip"
        type="dark"
        effect="solid"
        place="bottom"
      />
    </div>
  );
};

export default compose(
  connect(({ maps: { list } }) => ({ list }), { newMap, setDialog })
)(Menu);

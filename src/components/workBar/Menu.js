import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { find, isEmpty } from "lodash";
import { DropdownButton, MenuItem, Glyphicon } from "react-bootstrap";
import ReactTooltip from "react-tooltip";

import {
  newNode,
  removeNode,
  undo,
  redo,
  changeZoom,
  newChildNode
} from "../../actions/activeMapActions";
import { newMap } from "../../actions/mapsActions";
import { setDialog } from "../../actions/appActions";

import { downloadFile } from "../../utils";

const Menu = ({
  newMap,
  setDialog,
  list,
  newNode,
  activeNode,
  removeNode,
  undo,
  redo,
  changeZoom,
  newChildNode
}) => {
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
        <MenuItem divider />
        <MenuItem
          eventKey="9"
          onClick={() =>
            setDialog("BackgroundColorChange", {
              backgroundColor: activeMap.backgroundColor
            })}
        >
          Změnit barvu pozadí
        </MenuItem>
        <MenuItem
          eventKey="10"
          onClick={() =>
            setDialog("LineColorChange", {
              lineColor: activeMap.lineColor
            })}
        >
          Změnit barvu spojnic
        </MenuItem>
        <MenuItem divider className="mobile-only" />
        <MenuItem
          eventKey="11"
          onClick={() => newNode()}
          className="mobile-only"
        >
          Přidat uzel
        </MenuItem>
        <MenuItem
          eventKey="12"
          onClick={() => newChildNode()}
          className="mobile-only"
        >
          Přidat potomka
        </MenuItem>
        <MenuItem divider className="mobile-only" />
        <MenuItem eventKey="13" onClick={() => null} className="mobile-only">
          Kopírovat uzel
        </MenuItem>
        <MenuItem
          eventKey="14"
          onClick={() =>
            setDialog("ActiveNodeColorChange", {
              color: activeNode.color,
              borderColor: activeNode.borderColor,
              titleColor: activeNode.titleColor
            })}
          className="mobile-only"
        >
          Změnit barvu uzlu
        </MenuItem>
        <MenuItem
          eventKey="15"
          onClickAction={() =>
            setDialog("ActiveNodeFontChange", {
              font: activeNode.font,
              fontSize: activeNode.fontSize
            })}
          className="mobile-only"
        >
          Změnit font
        </MenuItem>
        <MenuItem
          eventKey="16"
          onClickAction={() => setDialog("ActiveNodeTitleChange", activeNode)}
          className="mobile-only"
        >
          Upravit uzel
        </MenuItem>
        <MenuItem
          eventKey="17"
          onClickAction={() => removeNode()}
          className="mobile-only"
        >
          Odstranit uzel
        </MenuItem>
        <MenuItem divider className="mobile-only" />
        {!isEmpty(activeMap.undo) && (
          <MenuItem
            eventKey="18"
            onClickAction={() => !isEmpty(activeMap.undo) && undo()}
            className="mobile-only"
          >
            Zpět
          </MenuItem>
        )}
        {!isEmpty(activeMap.redo) && (
          <MenuItem
            eventKey="19"
            onClickAction={() => !isEmpty(activeMap.redo) && redo()}
            className="mobile-only"
          >
            Opakovat
          </MenuItem>
        )}
        <MenuItem divider className="mobile-only" />
        <MenuItem
          eventKey="20"
          onClickAction={() =>
            activeMap.zoom < 500 && changeZoom(activeMap.zoom + 25)}
          className="mobile-only"
        >
          Přiblížit
        </MenuItem>
        <MenuItem
          eventKey="21"
          onClickAction={() => changeZoom(100)}
          className="mobile-only"
        >
          Původní přiblížení
        </MenuItem>
        <MenuItem
          eventKey="22"
          onClickAction={() =>
            activeMap.zoom > 25 && changeZoom(activeMap.zoom - 25)}
          className="mobile-only"
        >
          Oddálit
        </MenuItem>
        <MenuItem divider className="mobile-only" />
        <MenuItem
          eventKey="23"
          onClickAction={() => setDialog("Help")}
          className="mobile-only"
        >
          Nápověda
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
  connect(({ maps: { list } }) => ({ list }), {
    newMap,
    setDialog,
    newNode,
    removeNode,
    undo,
    redo,
    changeZoom,
    newChildNode
  })
)(Menu);

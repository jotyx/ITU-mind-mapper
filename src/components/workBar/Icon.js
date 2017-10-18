import React from "react";
import { FontIcon } from "react-md";
import ReactTooltip from "react-tooltip";

const Icon = ({ iconType, tooltipLabel, onClickAction }) => {
  return (
    <div>
      <FontIcon
        iconClassName={`fa ${iconType} icon`}
        data-tip={tooltipLabel}
        onClick={() => onClickAction()}
      />
      <ReactTooltip
        className="icon-tooltip"
        type="dark"
        effect="solid"
        place="bottom"
      />
    </div>
  );
};

export default Icon;

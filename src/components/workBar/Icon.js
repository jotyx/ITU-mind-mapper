import React from "react";
import classNames from "classnames";
import { FontIcon } from "react-md";
import ReactTooltip from "react-tooltip";

const Icon = ({ iconType, tooltipLabel, onClickAction, disabled }) => {
  return (
    <div>
      <FontIcon
        iconClassName={classNames(`fa ${iconType} icon`, { disabled })}
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

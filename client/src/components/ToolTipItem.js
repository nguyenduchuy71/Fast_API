import React from "react";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function ToolTipItem({ Icon }) {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="button-tooltip-2">Add friends</Tooltip>}
    >
      {({ ref, ...triggerHandler }) => (
        <Button
          variant="dark"
          {...triggerHandler}
          className="d-inline-flex align-items-center"
        >
          <Icon
            className="w-6 h-6 text-white font-bold"
            ref={ref}
            roundedCircle
          />
        </Button>
      )}
    </OverlayTrigger>
  );
}

export default ToolTipItem;

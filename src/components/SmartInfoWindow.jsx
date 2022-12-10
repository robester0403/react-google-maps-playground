import { Card } from "@mui/material";
import { InfoWindow } from "@react-google-maps/api";
import React, { Children } from "react";

const SmartInfoWindow = ({
  open,
  position,
  onCloseClick,
  children,
  ...rest
}) => {
  return (
    <>
      {open && (
        <InfoWindow position={position} onCloseClick={onCloseClick} {...rest}>
          <Card>{children}</Card>
        </InfoWindow>
      )}
    </>
  );
};

export default SmartInfoWindow;

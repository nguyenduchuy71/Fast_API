import React from "react";
import { ListItem, ListItemPrefix } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function CustomIconItem({ CustomIconImage, path, name }) {
  return (
    <Link to={path}>
      <ListItem className="py-3">
        <ListItemPrefix>
          <CustomIconImage className="h-5 w-5 mr-1" />
        </ListItemPrefix>
        {name}
      </ListItem>
    </Link>
  );
}

export default CustomIconItem;

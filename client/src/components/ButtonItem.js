import React from "react";

function ButtonItem({ typeValue, classNameValue, name }) {
  return (
    <button type={typeValue} className={classNameValue}>
      {name}
    </button>
  );
}

export default ButtonItem;

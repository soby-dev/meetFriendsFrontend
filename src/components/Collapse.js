import * as React from "react";

function Collapse(props) {
  const { show, children } = props;

  return <div>{show && <div>{children}</div>}</div>;
}

export default Collapse;

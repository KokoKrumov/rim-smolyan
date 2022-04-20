import React from "react";
const utilizeScroll = () => {
  const elRef = React.createRef();
  const executeScroll = () => elRef.current.scrollIntoView();

  return { executeScroll, elRef };
};
export default utilizeScroll;

import React from "react";

function ArrowLeft({ color, width }) {
  return (
    <svg
      length="auto"
      width={width}
      height="100%"
      viewBox="0 0 21 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.439223 21.0975L18.4397 39.5679C19.0357 40.1585 19.9853 40.1415 20.5608 39.5301C21.1222 38.9336 21.1222 37.988 20.5608 37.3915L3.62078 20.0093L20.5608 2.62711C21.1464 2.0261 21.1464 1.05171 20.5608 0.450699C19.975 -0.150223 19.0255 -0.150223 18.4397 0.450699L0.439222 18.9211C-0.14641 19.5222 -0.14641 20.4965 0.439223 21.0975Z"
        fill={color}
      />
    </svg>
  );
}

export default ArrowLeft;

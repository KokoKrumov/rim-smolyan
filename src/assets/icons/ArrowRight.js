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
        d="M20.5608 18.9025L2.56026 0.432053C1.96435 -0.158495 1.01475 -0.14154 0.439224 0.469932C-0.122238 1.06643 -0.122238 2.01205 0.439224 2.60846L17.3792 19.9907L0.439217 37.3729C-0.146415 37.9739 -0.146415 38.9483 0.439217 39.5493C1.02502 40.1502 1.97453 40.1502 2.56025 39.5493L20.5608 21.0789C21.1464 20.4778 21.1464 19.5035 20.5608 18.9025Z"
        fill={color}
      />
    </svg>
  );
}

export default ArrowLeft;

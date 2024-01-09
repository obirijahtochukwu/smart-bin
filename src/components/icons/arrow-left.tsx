import { className } from "@/utils/types";
import React from "react";

export const ArrowleftIcon = ({ ...props }: any) => {
  return (
    <svg
      {...props}
      // className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <g opacity="0.9">
        <path
          d="M7.97508 4.94165L2.91675 9.99998L7.97508 15.0583"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.0833 10H3.05835"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

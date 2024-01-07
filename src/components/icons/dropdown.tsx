import { className } from "@/utils/types";
import React from "react";

export const DropdownIcon: React.FC<className> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <g opacity="0.5">
        <path
          d="M10.0003 14C9.41693 14 8.83359 13.775 8.39193 13.3333L2.95859 7.9C2.71693 7.65833 2.71693 7.25834 2.95859 7.01667C3.20026 6.775 3.60026 6.775 3.84193 7.01667L9.27526 12.45C9.67526 12.85 10.3253 12.85 10.7253 12.45L16.1586 7.01667C16.4003 6.775 16.8003 6.775 17.0419 7.01667C17.2836 7.25834 17.2836 7.65833 17.0419 7.9L11.6086 13.3333C11.1669 13.775 10.5836 14 10.0003 14Z"
          fill="#1D1D1D"
        />
      </g>
    </svg>
  );
};

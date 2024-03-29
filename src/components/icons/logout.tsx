import { className } from "@/utils/types";
import React from "react";

export const LogoutIcon: React.FC<className> = ({
  onClick,
  className,
  ...props
}) => {
  return (
    <svg
      {...props}
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7.2 2H9.8C13 2 15 4 15 7.2V11.25H8.75C8.34 11.25 8 11.59 8 12C8 12.41 8.34 12.75 8.75 12.75H15V16.8C15 20 13 22 9.8 22H7.21C4.01 22 2.01 20 2.01 16.8V7.2C2 4 4 2 7.2 2Z"
        fill="white"
      />
      <path
        d="M19.4401 11.25L17.3701 9.18C17.2201 9.03 17.1501 8.84 17.1501 8.65C17.1501 8.46 17.2201 8.26 17.3701 8.12C17.6601 7.83 18.1401 7.83 18.4301 8.12L21.7801 11.47C22.0701 11.76 22.0701 12.24 21.7801 12.53L18.4301 15.88C18.1401 16.17 17.6601 16.17 17.3701 15.88C17.0801 15.59 17.0801 15.11 17.3701 14.82L19.4401 12.75H15.0001V11.25H19.4401Z"
        fill="white"
      />
    </svg>
  );
};

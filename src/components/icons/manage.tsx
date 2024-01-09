import { className } from "@/utils/types";
import React from "react";

export const ManageIcon: React.FC<className> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M22 9.00002V15C22 17.5 21.5 19.25 20.38 20.38L14 14L21.73 6.27002C21.91 7.06002 22 7.96002 22 9.00002Z"
        stroke="#66A57E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.73 6.27L6.26999 21.73C3.25999 21.04 2 18.96 2 15V9C2 4 4 2 9 2H15C18.96 2 21.04 3.26 21.73 6.27Z"
        stroke="#66A57E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.38 20.38C19.25 21.5 17.5 22 15 22H9.00003C7.96003 22 7.06002 21.91 6.27002 21.73L14 14L20.38 20.38Z"
        stroke="#66A57E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.24002 7.98C6.92002 5.05 11.32 5.05 12 7.98C12.39 9.7 11.31 11.16 10.36 12.06C9.67001 12.72 8.58003 12.72 7.88003 12.06C6.93003 11.16 5.84002 9.7 6.24002 7.98Z"
        stroke="#66A57E"
        strokeWidth="1.5"
      />
      <path
        d="M9.0946 8.70001H9.10359"
        stroke="#66A57E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

import { className } from "@/utils/types";
import React from "react";

export const CloseIcon: React.FC<className> = ({ className, onClick }) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        d="M21.0539 9.17421L9.17532 21.0528C8.56654 21.6616 7.55686 21.6616 6.94809 21.0528C6.33931 20.444 6.33931 19.4343 6.94809 18.8255L18.8267 6.94698C19.4354 6.33821 20.4451 6.33821 21.0539 6.94698C21.6627 7.55576 21.6627 8.56544 21.0539 9.17421Z"
        fill="#292D32"
      />
      <path
        d="M21.0539 21.053C20.4451 21.6618 19.4354 21.6618 18.8267 21.053L6.94809 9.17445C6.33931 8.56568 6.33931 7.556 6.94809 6.94722C7.55686 6.33844 8.56654 6.33844 9.17532 6.94722L21.0539 18.8258C21.6627 19.4346 21.6627 20.4442 21.0539 21.053Z"
        fill="#292D32"
      />
    </svg>
  );
};

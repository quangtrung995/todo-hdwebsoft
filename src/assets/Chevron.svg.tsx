import React from 'react';

type SvgType = {
  size?: number;
  className?: string;
};

export const My_ChevronLeftSvg = ({ size, className }: SvgType) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M15 18L9 12 15 6"></path>
    </svg>
  );
};

export const My_ChevronRightSvg = ({ size, className }: SvgType) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="rgba(0,0,0,0.5)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M9 18L15 12 9 6"></path>
    </svg>
  );
};

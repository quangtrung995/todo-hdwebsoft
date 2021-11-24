import React from 'react';

type TrimmingTextProps = {
  className?: string;
  lines: number;
  children: any;
};

export const My_TrimmingText = ({
  className = '',
  lines,
  children,
}: TrimmingTextProps) => {
  const styles: any = {
    display: '-webkit-box',
    WebkitLineClamp: `${lines}`,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
  };
  return (
    <p style={styles} className={`${className}`}>
      {children}
    </p>
  );
};

import React from 'react';
import { cn } from './index';

export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl bg-white/5",
        className
      )}
      {...props}
    />
  );
};

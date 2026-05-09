import React from 'react';

interface LoadingSkeletonProps { className?: string; count?: number; }

export const Skeleton: React.FC<LoadingSkeletonProps> = ({ className = '', count = 1 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className={`shimmer rounded-xl ${className}`} />
    ))}
  </>
);

export const ProjectCardSkeleton: React.FC = () => (
  <div className="glass-card p-5 space-y-4 animate-pulse">
    <div className="shimmer rounded-xl h-48 w-full" />
    <div className="shimmer rounded h-5 w-3/4" />
    <div className="shimmer rounded h-4 w-full" />
    <div className="shimmer rounded h-4 w-2/3" />
    <div className="flex gap-2">
      <div className="shimmer rounded-full h-6 w-16" />
      <div className="shimmer rounded-full h-6 w-16" />
      <div className="shimmer rounded-full h-6 w-16" />
    </div>
  </div>
);

export const SectionLoader: React.FC = () => (
  <div className="flex items-center justify-center py-20">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
      <div className="w-10 h-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin absolute top-3 left-3" style={{ animationDirection: 'reverse' }} />
    </div>
  </div>
);

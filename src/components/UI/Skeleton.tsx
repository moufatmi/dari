import React from 'react';

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
    );
}

export function PropertyCardSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <Skeleton className="h-48 w-full" />
            <div className="p-5 space-y-4">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-8 w-1/2" />
                </div>
                <div className="flex space-x-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-1/3" />
                </div>
                <div className="flex justify-between pt-2">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-10 w-full rounded-lg" />
            </div>
        </div>
    );
}

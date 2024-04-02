import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export const PostPageSkeletonLoader = () => {
  return (
    <div className="flex flex-col px-4">
      <div className="flex flex-col gap-2">
        <div className="py-4">
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex flex-col gap-2 py-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-8 w-[60%]" />
          <div className="flex flex-row gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <div className="py-2">
          <Skeleton className="h-8 w-32" />
        </div>
        <Separator />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[60%]" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[70%]" />
        </div>
      </div>
    </div>
  );
};
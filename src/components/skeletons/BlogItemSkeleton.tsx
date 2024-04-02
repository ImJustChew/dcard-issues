import { Skeleton } from '@/components/ui/skeleton';

const BlogsItemSkeleton = () => {
  return (
    <div className="flex flex-col py-3 px-4">
      <div className="flex flex-row gap-1 text-sm items-center mb-2">
        <Skeleton className="h-6 w-6 rounded-full mr-1" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-6 w-[60%] mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-[80%] mb-1" />
      <Skeleton className="h-4 w-[60%]" />
    </div>
  );
};


export default BlogsItemSkeleton;
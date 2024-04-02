import BlogsItemSkeleton from "./BlogItemSkeleton";

const BlogsStreamSkeleton = () => {
  return (
    <div className="flex flex-col max-w-[70ch]">
      <BlogsItemSkeleton />
      <BlogsItemSkeleton />
      <BlogsItemSkeleton />
      <BlogsItemSkeleton />
    </div>
  );
};

export default BlogsStreamSkeleton;
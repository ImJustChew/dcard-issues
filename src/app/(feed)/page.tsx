import BlogsStream from "../../components/blog/BlogsStream";
import {getPostByPage} from '@/lib/posts';


const BlogsHomepage = async () => {
    const data = await getPostByPage(1);
    
    return <div>
        <BlogsStream initialData={data} />
    </div>;
}

export default BlogsHomepage;
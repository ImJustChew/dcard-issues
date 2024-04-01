import { Octokit } from "octokit";
import BlogsStream from "./BlogsStream";
import {getPostByPage} from '@/lib/posts';


const BlogsHomepage = async () => {
    const octokit = new Octokit();
    // initial data, get first 10 issues from ImJustChew/dcard-issues
    const data = await getPostByPage(1);
    return <div>
        <BlogsStream initialData={data} />
    </div>;
}

export default BlogsHomepage;
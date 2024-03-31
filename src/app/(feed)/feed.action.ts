'use server';
import { getPostByPage } from '@/lib/posts';

const loadPosts = async (page: number) => {
    return getPostByPage(page);
}

export default loadPosts;
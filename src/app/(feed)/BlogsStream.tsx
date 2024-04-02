'use client';;
import { useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';
import {IssuesResponseType} from '@/types/posts';
import loadPosts from './page.action';
import { BlogsItem } from './BlogsItem';


export const useTime = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return time;
}

const BlogsStream = ({ initialData }: { initialData: IssuesResponseType }) => {
    const [displayData, setDisplayData] = useState(initialData);

    const loadMorePosts = async () => {
        const nextPage = Math.ceil(displayData.length / 10) + 1;
        const posts = await loadPosts(nextPage);
        // merge the new posts with the old posts, prevent duplicates
        setDisplayData([...displayData, ...posts.filter((post) => !displayData.some((oldPost) => oldPost.id === post.id))]);
    }

    return <div className='flex flex-col max-w-[70ch]'>
        {displayData.map((issue) => <BlogsItem key={issue.id} issue={issue} />)}
        <InView threshold={0.1} onChange={(inView) => inView && loadMorePosts()}>
            <p></p>
        </InView>
    </div>
}

export default BlogsStream;
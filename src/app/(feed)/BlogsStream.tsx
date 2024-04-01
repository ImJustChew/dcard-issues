'use client';;
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceStrict } from 'date-fns';
import { InView } from 'react-intersection-observer';
import {IssueResponseType, IssuesResponseType} from '@/types/posts';
import loadPosts from './page.action';


const useTime = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return time;
}

const BlogsItem = ({ issue }: { issue: IssueResponseType }) => {
    const time = useTime();
    return <Link className='flex flex-col py-3 hover:bg-gray-50 transition-colors px-4' href={`/post/${issue.number}`}>
        {issue.user && <div className='flex flex-row gap-2'>
            <Image src={issue.user.avatar_url} alt='avatar' width={24} height={24} className='rounded-full ' />
            <p>{issue.user.login}</p>
            -
            <p>{formatDistanceStrict(time, new Date(issue.created_at), { addSuffix: false })}</p>
        </div>}
        <h1 className='font-bold text-lg'>{issue.title}</h1>
        <p className='line-clamp-3'>{issue.body}</p>
    </Link>;
}

const BlogsStream = ({ initialData }: { initialData: IssuesResponseType }) => {
    const [displayData, setDisplayData] = useState(initialData);

    const loadMorePosts = async () => {
        const nextPage = Math.ceil(displayData.length / 10) + 1;
        const posts = await loadPosts(nextPage);
        // merge the new posts with the old posts, prevent duplicates
        setDisplayData([...displayData, ...posts.filter((post) => !displayData.some((oldPost) => oldPost.id === post.id))]);
    }

    console.log(displayData)

    return <div className='flex flex-col'>
        {displayData.map((issue) => <BlogsItem key={issue.id} issue={issue} />)}
        <InView threshold={0.1} onChange={(inView) => inView && loadMorePosts()}>
            <p></p>
        </InView>
    </div>
}

export default BlogsStream;
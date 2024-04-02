'use client';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceStrict } from 'date-fns';
import { IssueResponseType } from '@/types/posts';
import { useTime } from './BlogsStream';
import removeMarkdown from "markdown-to-text";

export const BlogsItem = ({ issue }: { issue: IssueResponseType; }) => {
    const time = useTime();
    const body = removeMarkdown(issue.body ?? "");
    return <Link className='flex flex-col py-3 hover:bg-gray-50 transition-colors px-4' href={`/post/${issue.number}`}>
        {issue.user && <div className='flex flex-row gap-1 text-sm items-center'>
            <Image src={issue.user.avatar_url} alt='avatar' width={24} height={24} className='rounded-full mr-1' />
            <p>{issue.user.login}</p>
            -
            <p>{formatDistanceStrict(time, new Date(issue.created_at), { addSuffix: false })} </p>
        </div>}
        <h1 className='font-bold text-lg'>{issue.title}</h1>
        <p className='line-clamp-3 text-sm text-neutral-700'>{body}</p>
    </Link>;
};

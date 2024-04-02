import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { DeletePostDialogButton } from './DeletePostDialogButton';
import Link from 'next/link';

export const PostEditingToolbar = ({ issueId }: { issueId: string; }) => {
    return <div className='flex flex-row gap-2'>
        <Link href={`/post/${issueId}/edit`}>
            <Button variant='secondary' size="icon"><Edit /></Button>
        </Link>
        <DeletePostDialogButton issueId={issueId} />
    </div>;
};

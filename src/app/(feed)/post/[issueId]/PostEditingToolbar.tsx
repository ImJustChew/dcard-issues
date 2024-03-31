import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { DeletePostDialogButton } from './DeletePostDialogButton';

export const PostEditingToolbar = ({ issueId }: { issueId: string; }) => {
    return <div className='flex flex-row gap-2'>
        <Button variant='secondary' size="icon"><Edit /></Button>
        <DeletePostDialogButton issueId={issueId} />
    </div>;
};

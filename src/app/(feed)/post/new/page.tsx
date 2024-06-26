import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { PostEditorContainer } from '../../../../components/editor/PostEditorContainer';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const NewPostPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/404');
    }
    return <PostEditorContainer />
}

export default NewPostPage;
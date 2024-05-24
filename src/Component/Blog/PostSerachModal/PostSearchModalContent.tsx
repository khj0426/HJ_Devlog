import Spinner from '@/Component/Common/Spinner/Spinner';
import PostList from '@/Component/Post/PostList';
import useSearchPostQuery from '@/hooks/queries/useSearchPostQuery';

const PostSearchModalContent = ({ keyword }: { keyword: string }) => {
  const { data: posts, isFetching } = useSearchPostQuery(keyword);

  return (
    <>
      {isFetching ? (
        <Spinner timing={1} color="blue" />
      ) : (
        <PostList posts={posts} />
      )}
    </>
  );
};
export default PostSearchModalContent;

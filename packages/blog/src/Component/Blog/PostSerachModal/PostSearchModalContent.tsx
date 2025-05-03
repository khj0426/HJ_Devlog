import Spinner from "~/packages/shared/src/components/Spinner/Spinner";
import PostList from "~/packages/blog/src/Component/Post/PostList";
import useSearchPostQuery from "~/packages/blog/src/hooks/queries/useSearchPostQuery";

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

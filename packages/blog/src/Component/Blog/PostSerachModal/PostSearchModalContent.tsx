import Spinner from "@hj-devlog/shared/src/components/Spinner/Spinner";

import useSearchPostQuery from "~/src/hooks/queries/useSearchPostQuery";

import PostList from "../../Post/PostList";

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

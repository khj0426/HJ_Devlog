import { useState, useEffect } from 'react';

type Item = {
  [key: string]: string;
};

export default function useSearchPost(searchInput: string) {
  const [posts, setPosts] = useState<Item[]>([]);

  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      fetchAllPosts();
    }, 1000);

    const fetchAllPosts = async () => {
      const allPostResponse = await fetch('/api/slugs');
      const allPosts: Item[] = await allPostResponse.json();
      if (allPostResponse.ok && searchInput.length > 0) {
        setPosts(
          allPosts.filter((post) =>
            post?.title
              ?.trim()
              ?.toLowerCase()
              ?.includes(searchInput?.trim()?.toLowerCase())
          )
        );
      }
    };

    return () => {
      clearTimeout(debounceHandler);
    };
  }, [searchInput]);

  return {
    posts,
  };
}

import { useState, useEffect } from 'react';

type Item = {
  [key: string]: string;
};

export default function useSearchPost(searchInput: string) {
  const [posts, setPosts] = useState<Item[]>([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const allPostResponse = await fetch('/api/slugs');
      const allPosts: Item[] = await allPostResponse.json();
      if (allPostResponse.ok) {
        setPosts(allPosts.filter((post) => post.title.includes(searchInput)));
      }
    };

    fetchAllPosts();
  }, [searchInput]);

  return {
    posts,
  };
}

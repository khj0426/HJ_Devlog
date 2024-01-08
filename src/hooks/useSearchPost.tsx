import { useState, useEffect } from 'react';

type Item = {
  [key: string]: string;
};

export default function useSearchPost(searchInput: string) {
  const [posts, setPosts] = useState<Item[]>([]);
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      fetchAllPosts();
    }, 1000);

    const fetchAllPosts = async () => {
      setIsLoading(() => true);
      const allPostResponse = await fetch(`/api/slugs/${searchInput}`);
      if (allPostResponse.ok && searchInput.length > 0) {
        setIsLoading(() => false);
        setPosts(await allPostResponse.json());
      }
    };

    return () => {
      clearTimeout(debounceHandler);
    };
  }, [searchInput]);

  return {
    posts,
    loading,
  };
}

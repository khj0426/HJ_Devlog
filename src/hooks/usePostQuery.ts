import { useState, useEffect } from 'react';

type Item = {
  [key: string]: string;
};

export default function usePostQuery([start,end]:[string,string]) {
  const [posts, setPosts] = useState<Item[]>([]);

  useEffect(() => {

    const fetchAllPosts = async () => {
      const allPostResponse = await fetch(`api/posts?start=${start}&end=${end}`);
      const allPosts: Item[] = await allPostResponse.json();
      return allPosts;
    };

    fetchAllPosts().then((data) => setPosts(data));
    
  }, [start , end]);

  return {
    posts,
  };
}

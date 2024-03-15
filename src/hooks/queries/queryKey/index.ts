const postQueryKey = {
  all: ['allPosts'] as const,
  filteredCategoryPost: (category: string) =>
    [...postQueryKey.all, category] as const,
  searchInputPost: (input: string) => [...postQueryKey.all, input] as const,
};

const guestBookQueryKey = {
  all: ['guestBook'] as const,
};

export { postQueryKey, guestBookQueryKey };

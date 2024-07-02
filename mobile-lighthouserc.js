const makeURLS = () => {
  const Prefix = 'https://hj-devlog.vercel.app/';

  const postPath = join(process.cwd(), 'posts');
  const postSlug = fs.readdirSync(postPath);
  const allPostPath = postSlug.map((post) => {
    return (
      Prefix + 'blog/' + encodeURIComponent(post.replace('.md', '')) + '?mobile'
    );
  });

  return {
    allPostPaths: [
      ...allPostPath,
      Prefix + `${'?mobile'}`,
      Prefix + 'about?mobile',
    ],
  };
};

module.exports = {
  ci: {
    collect: {
      settings: {
        startServerCommand: 'npm run start',
        additive: 'true',
      },
      url: makeURLS().allPostPaths,
    },
  },
};

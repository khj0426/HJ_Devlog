const fs = require('fs');
const { join } = require('path');
const makeURLS = () => {
  const Prefix = 'https://hj-devlog.vercel.app/';

  const postPath = join(process.cwd(), 'posts');
  const postSlug = fs.readdirSync(postPath);
  const allPostPath = postSlug.map((post) => {
    return (
      Prefix +
      'blog/' +
      encodeURIComponent(post.replace('.md', '')) +
      '?desktop'
    );
  });

  return {
    allPostPaths: [
      ...allPostPath,
      Prefix + `${'?desktop'}`,
      Prefix + 'about?desktop',
    ],
  };
};

module.exports = {
  ci: {
    collect: {
      settings: {
        startServerCommand: 'npm run start',
        additive: 'true',
        preset: 'desktop',
      },
      url: makeURLS().allPostPaths,
    },
  },
};

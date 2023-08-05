const { basename, join } = require('path');
const fs = require('fs');

const makeUrls = () => {
  const localServerPrefix = 'http://localhost:3000/';

  const postPath = join(process.cwd(), 'posts');
  const postSlug = fs.readdirSync(postPath);
  const allPostPath = postSlug.map((post) => {
    return (
      localServerPrefix + 'blog/' + encodeURIComponent(post.replace('.md', ''))
    );
  });

  return {
    allPostPaths: [
      ...allPostPath,
      localServerPrefix,
      localServerPrefix + 'about',
    ],
  };
};

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run dev',
      url: makeUrls().allPostPaths,
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci_reports',
    },
  },
};

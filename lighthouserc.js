const { basename, join } = require('path');
const fs = require('fs');

const makeURLS = () => {
  const Prefix = 'https://hj-devlog.vercel.app/';

  const postPath = join(process.cwd(), 'posts');
  const postSlug = fs.readdirSync(postPath);
  const allPostPath = postSlug.map((post) => {
    return Prefix + 'blog/' + encodeURIComponent(post.replace('.md', ''));
  });

  return {
    allPostPaths: [...allPostPath, Prefix, Prefix + 'about'],
  };
};

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      url: makeURLS().allPostPaths,
    },
    upload: {
      target: 'temporary-public-storage',
      outputDir: '/lhci_reports',
    },
  },
};

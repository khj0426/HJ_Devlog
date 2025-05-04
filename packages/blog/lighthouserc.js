const fs = require('fs');
const { basename, join } = require('path');

const { createServer } = require('@lhci/server');

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
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
    server: {},
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

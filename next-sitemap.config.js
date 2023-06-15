/** @type {import('next-sitemap').IConfig}*/

module.exports = {
  siteUrl: 'https://hj-devlog.vercel.app',
  changefreq: 'daily',
  priority: 1,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};

import { BetaAnalyticsDataClient } from '@google-analytics/data';

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY?.split(
      String.raw`\n`
    ).join('\n'),
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.NEXT_PUBLIC_PRIVATE_KEY_ID,
    universe_domain: 'googleapis.com',
    forceRefreshOnFailure: false,
  },
});

export default analyticsDataClient;

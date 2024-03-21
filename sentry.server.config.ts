// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { init } from '@sentry/nextjs';

init({
  dsn: 'https://4b6a5c9b4d17bd0e5e3b8913c66c9a34@o4505749556363264.ingest.sentry.io/4505749558591488',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});

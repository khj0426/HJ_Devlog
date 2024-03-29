'use client';
import React from 'react';

import { Hydrate as HydrationBoundary } from '@tanstack/react-query';

function Hydrate(props: any) {
  return <HydrationBoundary {...props} />;
}

export default Hydrate;

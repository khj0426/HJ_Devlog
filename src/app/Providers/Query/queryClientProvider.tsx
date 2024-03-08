// Provider.tsx

'use client';

import React from 'react';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ToastManager } from '@/Component/Common/Toast';

type Props = {
  children: React.ReactNode;
};

function Providers({ children }: Props) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: Infinity,
          staleTime: Infinity,
          suspense: true,
        },
      },
    })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default Providers;

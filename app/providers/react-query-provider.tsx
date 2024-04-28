"use client";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useState} from "react";

import type {PropsWithChildren} from "react";

export const getQueryClientForDashboard = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchIntervalInBackground: false,
        refetchOnMount: true,
        retry(failureCount, error) {
          // @ts-ignore
          if (error.status === 500) {
            return  false;
          }
          return failureCount < 2;
        },
      },
    },
  });

export const ReactQueryProviderForDashboard = ({children}: PropsWithChildren) => {
  return (
    <QueryClientProvider client={useState(getQueryClientForDashboard)[0]}>
      {children}
    </QueryClientProvider>
  );
};

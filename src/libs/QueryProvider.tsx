'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                suspense: false,
                staleTime: 1000 * 60 * 60,
                retryOnMount: false,
            },
            mutations: {
                onError: (error) => {
                    alert(error.message);
                },
            },
        },
    });
}

export let queryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (typeof window === 'undefined') {
        return makeQueryClient();
    } else {
        if (!queryClient) queryClient = makeQueryClient();
        return queryClient;
    }
}

const QueryProvider = ({
                           children,
                           devtools,
                       }: React.PropsWithChildren & {
    devtools?: boolean;
}) => {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default QueryProvider;

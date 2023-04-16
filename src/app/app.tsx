import React, { FC, Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import { AppError } from '@/app/config/app-error';
import { RoutesViews } from '@/app/config/routing/init';


import './styles/global.scss';

const ErrorFallback = ({ error }: FallbackProps) => {
    console.log(error, 'error boundary');
    return <AppError />;
};

export const App: FC = () => {
    return (
        <>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<div >Loading...</div>}>
                    <RoutesViews />
                </Suspense>
            </ErrorBoundary>
        </>
    );
};

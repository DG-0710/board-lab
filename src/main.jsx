import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Sentry from '@sentry/react';
import './index.css';
import App from './App.jsx';

Sentry.init({
  dsn: "https://448a409be1b4378ddf1e74cd0bbfa974@o4512491197562881.ingest.us.sentry.io/4512491207655424",
});

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => Sentry.captureException(error),
  }),
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Sentry.ErrorBoundary
      fallback={<p className="panel">문제가 생겼습니다. 새로고침해 주세요.</p>}
    >
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Sentry.ErrorBoundary>
  </StrictMode>,
);
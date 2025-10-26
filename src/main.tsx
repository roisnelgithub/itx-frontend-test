import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/query-client';
import { TooltipProvider } from './components/ui/tooltip';

import App from './App';
import './index.css';
import { BreadcrumbProvider } from './components/contexts/breadcrumb.context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BreadcrumbProvider>
          <App />
        </BreadcrumbProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

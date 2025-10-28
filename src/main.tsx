import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/query-client';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from "sonner";

import { BreadcrumbProvider } from './contexts/breadcrumb.context';
import App from './App';

import './index.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BreadcrumbProvider>
          <App />
        </BreadcrumbProvider>
      </TooltipProvider>
      <Toaster position="bottom-right" />
    </QueryClientProvider>
  </React.StrictMode>
);

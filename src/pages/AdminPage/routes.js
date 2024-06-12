import React from 'react';

// Wrap the import statement inside React.lazy()

const Dashboard = React.lazy(() => import('./dashboard/Dashboard'))

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // Add other routes here
];

export default routes;

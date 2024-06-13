import React from 'react';

// Wrap the import statement inside React.lazy()

const Dashboard = React.lazy(() => import('./dashboard/Dashboard'))
const SourceManagement = React.lazy(() => import('./SourceManagement/SourceManagementPage'))
const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/sourcemanagement', name: 'Quản lý nguồn truyện', element: SourceManagement },
  // Add other routes here
];

export default routes;

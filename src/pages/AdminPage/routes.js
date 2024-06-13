import React from 'react';

const Dashboard = React.lazy(() => import('./Dashboard/Dashboard'));
const SourceManagement = React.lazy(() => import('./SourceManagement/SourceManagementPage'))
const ExporterManagement = React.lazy(() => import('./ExporterManagement/ExporterManagementPage'))

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/sourcemanagement', name: 'Quản lý nguồn truyện', element: SourceManagement },
  { path: '/exportermanagement', name: 'Quản lý nguồn xuất bản', element: ExporterManagement }
  // Add other routes here
];



export default routes;

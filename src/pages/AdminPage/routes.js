import React from 'react';

const Dashboard = React.lazy(() => import('./dashboard/Dashboard'));
const SourceManagement = React.lazy(() => import('./SourceManagement/SourceManagementPage'))
const ExporterManagement = React.lazy(() => import('./ExporterManagement/ExporterManagementPage'))
const AccountManagement = React.lazy(() => import('./AccountManagement/AccountManagementPage'))
const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/sourcemanagement', name: 'Quản lý nguồn truyện', element: SourceManagement },
  { path: '/exportermanagement', name: 'Quản lý nguồn xuất bản', element: ExporterManagement },
  { path: '/accountmanagement', name: 'Quản lý tài khoản', element: AccountManagement }
  // Add other routes here
];



export default routes;

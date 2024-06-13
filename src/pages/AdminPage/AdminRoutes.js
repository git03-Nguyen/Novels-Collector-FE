import React from 'react';
import { Route, Routes } from "react-router-dom"


const Dashboard = React.lazy(() => import('./dashboard/Dashboard'))


function AdminRoutes(props) {
    return (
        <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />} />

        </Routes>
    );
}

export default AdminRoutes;
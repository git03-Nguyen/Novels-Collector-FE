import { Route, Routes } from "react-router-dom"
import AdminPage from "./AdminPage";
import Dashboard from "../AdminPage/dashboard/Dashboard";

function AdminRoutes(props) {
    return (
        <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />} />

        </Routes>
    );
}

export default AdminRoutes;
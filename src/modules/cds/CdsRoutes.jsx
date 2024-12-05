import { Routes, Route } from "react-router-dom";
import { PageWards } from './containers'

export const CdsRoutes = () => {
    return (
        <Routes>
            <Route path="/wards" element={<PageWards />} />
        </Routes>
    )
}
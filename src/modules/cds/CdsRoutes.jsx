import { Routes, Route } from "react-router-dom";
import { PageWards, CreateWards, UpdateWards, AdsList } from './containers'

export const CdsRoutes = () => {
    return (
        <Routes>
            <Route path="/wards" element={<PageWards />} />
            <Route path="/create" element={<CreateWards />} />
            <Route path="/update" element={<UpdateWards />} />
            <Route path="/ads" element={<AdsList />} />
        </Routes>
    )
}
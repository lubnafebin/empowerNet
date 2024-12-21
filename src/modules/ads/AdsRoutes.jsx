import { Routes, Route } from "react-router-dom";
import { NhgList } from './containers'

export const AdsRoutes = () => {
    return (
        <Routes>
            <Route path="/nhg/list" element={<NhgList />} />
        </Routes>
    )
}
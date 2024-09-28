import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthenticationRoutes } from '../modules/auth'

export const Master = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthenticationRoutes />} />
        </Routes>
    )
}


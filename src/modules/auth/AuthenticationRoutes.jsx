import React from 'react'
import { Routes, Route } from "react-router-dom"
import { PageLogin, PageSignUp } from './containers'

export const AuthenticationRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<PageLogin />} />
            <Route path='/sign-up' element={<PageSignUp />} />
        </Routes>
    )
}


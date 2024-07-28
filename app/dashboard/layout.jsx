'use client'
import React from 'react'
import Header from './_components/Header'
import Footer from './_components/Footer'

function dashboardLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
            <Footer/>
        </div>
    )
}

export default dashboardLayout
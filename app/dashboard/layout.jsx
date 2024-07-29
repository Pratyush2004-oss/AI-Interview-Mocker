'use client'
import React from 'react'
import Header from './_components/Header'
import Footer from './_components/Footer'

function dashboardLayout({ children }) {
    return (
        <div>
            <Header />
            <div className='mx-5 md:mx-20 lg:mx-28'>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default dashboardLayout
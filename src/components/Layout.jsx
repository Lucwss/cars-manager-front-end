import Header from "./Header";
import Footer from "./Footer"
import { Outlet } from "react-router-dom";

import React from 'react'

const Layout = () => {
    return (
        <div className="App flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 min-h-full flex flex-col align-middle justify-center items-center">
                <Outlet/>
            </main>
            <Footer />
        </div>
    )
}

export default Layout
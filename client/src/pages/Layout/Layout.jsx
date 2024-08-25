import { Outlet } from "react-router-dom"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import "./Layout.css"

const Layout = () => {
    return (
        <div className="overflow-x-hidden flex flex-col justify-between h-screen ">
            <div className="fixed top-0 -z-10 h-full w-full bg-hero-pattern bg-cover ">
            </div>
            <Header />
            <div className="container px-14 mx-auto h-full">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout
import { Outlet } from "react-router-dom"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import "./Layout.css"

const Layout = () => {
    return (
        <div className="overflow-x-hidden flex flex-col justify-between h-screen">
            {/* <div className="fixed top-0 -z-10 h-full w-full">
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
            </div> */}
            {/* <div className="fixed top-0 -z-10 h-full w-full blur-2xl">
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#4a49dd_1px,transparent_1px),linear-gradient(to_bottom,#4a49dd_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
            </div> */}
            <div className="fixed top-0 -z-10 h-full w-full bg-[url(../../../public/SVG-background-animation.gif)] animate-slow-gif opacity-55">
                <div className=""></div>
            </div>
            <Header />
            <div className="container px-14 mx-auto">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout
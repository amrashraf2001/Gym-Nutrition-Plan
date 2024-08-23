import { Outlet } from "react-router-dom"
import Header from "../../components/Header"
import Footer from "../../components/footer"

const Layout = () => {
    return (
        <div className="overflow-x-hidden">
            <div className="fixed top-0 -z-10 h-full w-full">
                <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
            </div>
            <div className="container px-14 mx-auto">
                <Header />
                <div className="pb-20">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Layout

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 dark:bg-[#0a3126] text-[#fefefe] bg-[#007654]">
            <aside>
                <h2 className="text-5xl font-bold ">GYMNUT</h2>
                <p className="font-bold">
                    ACME Industries Ltd.
                    <br />
                    Providing reliable tech since 1992
                </p>
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    
                </div>
            </nav>
        </footer>
    )
}

export default Footer
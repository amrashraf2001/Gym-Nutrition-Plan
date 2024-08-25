import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="bg-white rounded-lg shadow-lg shadow-[#007654] space-y-6 px-8 py-6 max-w-md w-3/4">
                <h1 className="text-3xl font-bold text-center mb-4 text-[#95a926]">Welcome Back!</h1>
                <form action="#" className="flex flex-col space-y-3 items-left">
                    <div className="">
                        <input type="text" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#007654] focus:border-[#007654] focus:shadow-sm focus:shadow-[#52c0a7]" placeholder="username or email" required />
                    </div>
                    <div className=" text-right">
                        <input type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#007654] focus:border-[#007654] focus:shadow-sm focus:shadow-[#52c0a7]" placeholder="password" required />

                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-[#bdd367] focus:ring-[#007654]focus:outline-none" />
                            <label htmlFor="remember" className="ml-2 block text-sm text-[#9fb429] ">Remember me</label>
                        </div>
                        <Link to={"#"}
                            className="text-xs text-right text-[#bdd367] hover:text-[#9fb429] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007654] ">Forgot Password?
                        </Link>
                    </div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-[#fefefe] hover:bg-[#105642] bg-[#007654] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007654] transition-all">Login</button>
                    <div className="flex items-center justify-center gap-1">
                        <h6 className="text-sm ">Don't have account? </h6>
                        <Link to={"/register"}
                            className="text-xs text-[#bdd367]  hover:text-[#9fb429] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007654]"> Create
                            Account</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="bg-white shadow-slate-950 rounded-lg space-y-8 px-8 py-6 max-w-md border-2 border-neutral-200 w-3/4">
                <h1 className="text-2xl font-bold text-center ">Welcome Back!</h1>
                <form action="#" className="flex flex-col space-y-3 items-left">
                    <div className="">
                        <input type="text" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="username or email" required />
                    </div>
                    <div className=" text-right">
                        <input type="password" id="password" className="shadow-sm mb-2 rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="password" required />

                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none" />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 ">Remember me</label>
                        </div>
                        <Link to={"#"}
                            className="text-xs text-right text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot
                            Password?
                        </Link>
                    </div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
                    <div className="flex items-center justify-center mt-4 gap-1">
                        <h6 className="text-sm ">forget password? </h6>
                        <Link to={"/register"}
                            className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> Create
                            Account</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
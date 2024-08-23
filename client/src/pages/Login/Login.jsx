import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="bg-white  shadow-md rounded-lg px-8 py-6 max-w-md border-2 border-neutral-400">
                <h1 className="text-2xl font-bold text-center mb-4 ">Welcome Back!</h1>
                <form action="#">
                    <div className="mb-4">
                        <label for="email" className="block text-sm font-medium text-gray-700  mb-2">Email Address</label>
                        <input type="email" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required />
                    </div>
                    <div className="mb-4">
                        <label for="password" className="block text-sm font-medium text-gray-700  mb-2">Password</label>
                        <input type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required />
                        <a href="#"
                            className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot
                            Password?</a>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none" checked />
                            <label for="remember" className="ml-2 block text-sm text-gray-700 ">Remember me</label>
                        </div>
                        <Link to={"#"}
                            className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create
                            Account</Link>
                    </div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
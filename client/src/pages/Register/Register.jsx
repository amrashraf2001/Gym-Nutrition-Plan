import { Link } from "react-router-dom"
const Register = () => {
    return (
        <div className="flex flex-col p-3 items-center justify-center">
            <div className="bg-white shadow-slate-950 rounded-lg space-y-6 px-8 py-6 max-w-md border-2 border-neutral-200 w-3/4">
                <h1 className="text-2xl font-bold text-center mb-4 ">Register</h1>
                <form action="#" className="flex flex-col space-y-3 items-left">
                    <div className="">
                        <input type="text" id="username" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="username" required />
                    </div>
                    <div className="">
                        <input type="email" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required />
                    </div>
                    <div className=" text-right">
                        <input type="password" id="password1" className="shadow-sm mb-2 rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="password" required />
                    </div>
                    <div className=" text-right">
                        <input type="password" id="password2" className="shadow-sm mb-2 rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Rewrite the password" required />
                    </div>
                    <div className="felx space-x-2 items-center">
                        <label htmlFor="gender">Gender</label>
                        <select name="gender" id="gender" className="border-2 border-neutral-700 rounded-md">
                            <option value="">Male</option>
                            <option value="">Female</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register</button>
                    <div className="flex items-center justify-center mt-4 gap-1">
                        <Link to={"/login"}
                            className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Have an account?</Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Register
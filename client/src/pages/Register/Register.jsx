import { Link } from "react-router-dom"
const Register = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-[#fefefe] rounded-lg shadow-lg shadow-[#007654] space-y-6 px-8 py-6 max-w-md w-3/4">
                <h1 className="text-4xl font-extrabold text-center mb-4 text-[#9fb429]">Register</h1>
                <form action="#" className="flex flex-col space-y-3 items-left">
                    <div className="">
                        <input type="text" id="username" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#007654] focus:border-[#007654] focus:shadow-sm focus:shadow-[#52c0a7]" placeholder="username" required />
                    </div>
                    <div className="">
                        <input type="email" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#007654] focus:border-[#007654] focus:shadow-sm focus:shadow-[#52c0a7]" placeholder="your@email.com" required />
                    </div>
                    <div className=" text-right">
                        <input type="password" id="password1" className="shadow-sm mb-2 rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#007654] focus:border-[#007654] focus:shadow-sm focus:shadow-[#52c0a7]" placeholder="password" required />
                    </div>
                    <div className=" text-right">
                        <input type="password" id="password2" className="shadow-sm mb-2 rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#007654] focus:border-[#007654] focus:shadow-sm focus:shadow-[#52c0a7]" placeholder="Rewrite the password" required />
                    </div>
                    <div className="felx space-x-2 items-center">
                        <label htmlFor="gender">Gender</label>
                        <select name="gender" id="gender" required className="border-2 border-[#9fb429] focus:border-[#007654] rounded-md">
                            <option value="">Male</option>
                            <option value="">Female</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-[#105642] bg-[#007654] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007654] transition-all">Register</button>
                    <div className="flex items-center justify-center mt-4 gap-1">
                        <Link to={"/login"}
                            className="text-xs text-[#bdd367]  hover:text-[#9fb429] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007654]">Have an account?</Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Register
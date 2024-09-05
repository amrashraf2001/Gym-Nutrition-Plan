import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section className="flex-col px-14 py-44 pb-10" id="Contact">
      <motion.h2
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 200 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-extrabold text-center ">CONTACT</motion.h2>

      <motion.form
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -200 }}
        transition={{ duration: 0.5 }}
        action="#" method="POST" className="mx-auto mt-16 mb-16 max-w-xl p-14 shadow-2xl rounded-2xl shadow-[#007654] hover:shadow-[#007654] bg-gradient-to-b from-[#398650] to-green-900 sm:mt-20 flex-col space-y-10">
        <div className="sm:col-span-2">
          <label htmlFor="email" className="block text-2xl font-semibold leading-6 text-green-950 ">Email</label>
          <div className="mt-2.5">
            <input type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#007654] sm:text-sm sm:leading-6 " />
          </div>
        </div>

        <div className="sm:col-span-2 space-y-3">
          <label htmlFor="message" className="block text-2xl font-semibold leading-6 text-green-950">Message</label>
          <div className="mt-2.5">
            <textarea name="message" id="message" rows="4" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#007654] sm:text-sm sm:leading-6 "></textarea>
          </div>
          <button type="submit" className="block w-full rounded-md bg-[#80AF81] transition hover:bg-[#105642] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Let's talk</button>
        </div>

      </motion.form>
    </section>
  )
}

export default Contact
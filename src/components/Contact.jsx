import { motion } from "framer-motion";
import contact from "../assets/contact.webp";
export default function Contact({ id }) {
  const Variants = {
    offscreen: {
      opacity: 0,
      y: 200,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.8,
      },
    },
  };
  return (
    <section id={id} className=" pb-8 lg:h-[100vh]bg-midWhite">
      <h3 className="px-4 text-center relative top-16 pt-16 text-3xl font-medium ">
        We would love to here from you
      </h3>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.4 }}
        variants={Variants}
        className="flex flex-col-reverse items-center lg:flex-row lg:justify-around mt-40"
      >
        <aside>
          <form className="grid grid-cols-2 p-8">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className=" gridy w-100 h-16 rounded-xl border-[1px] mt-5  p-4 border-hint"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className=" lg:w-48 h-16 rounded-xl border-[1px] mt-5 p-4 border-hint"
            />
            <input
              type="text"
              name="number"
              placeholder="Phone Number"
              className="lg:w-48 h-16 rounded-xl border-[1px] mt-5 p-4 ml-4 border-hint"
            />
            <input
              type="text"
              name="messages"
              placeholder="Messages"
              className="w-100 gridy h-16 rounded-xl border-[1px]   mt-5 px-4 py-20  border-hint"
            />
            <button className=" gridy rounded-xl px-4 py-4  mt-5 bg-hint text-white">
              Submit
            </button>
          </form>
        </aside>
        <aside>
          <img src={contact} alt="contact" />
        </aside>
      </motion.div>
    </section>
  );
}

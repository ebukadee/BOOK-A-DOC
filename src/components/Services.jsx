import { motion } from "framer-motion";
import { processes } from "./data";
import {Link} from 'react-router-dom'
export default function Services({ id }) {
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
    <section
      id={id}
      className=" h-auto w-full lg:h-[100vh] lg:w-full lg:relative bg-midAsh "
    >
      <h3 className=" text-center relative top-16 pt-12 text-3xl font-medium ">
        Services
      </h3>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={Variants}
        className=" mt-10 lg:mt-20"
      >
        <div className="flex flex-col items-center lg:flex-row lg:justify-around ">
          {processes.map((process) => (
            <div key={process.num}>
              <div className="w-72 h-72 mt-8 rounded-3xl bg-midWhite flex flex-col items-center justify-center shadow-md">
                <div className=" flex justify-center">
                  <div className=" bg-midAsh p-5 rounded-full">
                    <img
                      src={process.icon}
                      alt="hospital"
                      className="h-16 w-16  "
                    />
                  </div>
                </div>
                <div className="pl-5 pt-5">
                  <h3 className="text-hint text-2xl ">{process.title}</h3>
                  <p className="max-w-[230px] text-secondaryText">
                    {process.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8 py-5">
          <Link to='/book-appointment'>
          <button className="bg-hint  px-6 py-4 rounded-3xl mt-3 text-white ">
            Book Appointment
          </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

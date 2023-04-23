import { motion } from "framer-motion";

import { TickCircle } from "iconsax-react";
import { serviceLists } from "./data";
import nurse from "../assets/nurse.jpg";
export default function About({ id }) {
  const VariantOne = {
    offscreen: {
      opacity: 0,
      x: -200,
    },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.2,
      },
    },
  };
  const VariantTwo = {
    offscreen: {
      opacity: 0,
      x: -200,
    },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.2,
      },
    },
  };

  return (
    <section id={id} className=" h-auto bg-midWhite lg:[100vh]">
      <h3 className="text-center relative top-16 pt-12 text-3xl font-medium ">
        About
      </h3>
      <div className="flex flex-col-reverse items-center  p-8 lg:flex-row mt-40 lg:justify-around">
        <motion.aside
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={VariantOne}
          className="lg:ml-32 "
        >
          <h2 className="text-4xl max-w-md font-medium text-hint mt-10">
            Book an appointment today, online, with<br></br>easy steps
          </h2>
          <div className="pt-5">
            {serviceLists.map((serviceList) => (
              <div className="flex items-center pt-6" key={serviceList.num}>
                <TickCircle size="32" color="#014dd5" variant="Outline" />
                <h3 className="pl-2 text-xl max-w-md font-normal">
                  {serviceList.title}
                </h3>
              </div>
            ))}
            <div className="pt-3">
              <button className="bg-hint px-6 py-4 rounded-3xl mt-3 text-white  ">
                View Hospital
              </button>
            </div>
          </div>
        </motion.aside>
        <motion.aside
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={VariantTwo}
          className="lg:mr-32"
        >
          <img
            src={nurse}
            alt="nurse"
            className=" w-[400px] rounded-tl-[100px] rounded-br-[100px]  border-2 border-hint lg:w-96"
          />
        </motion.aside>
      </div>
    </section>
  );
}

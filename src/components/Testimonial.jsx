import { motion } from "framer-motion";

import { testimonials } from "./data";

import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay, Navigation } from "swiper";

export default function Testimonial() {
  const cardVariants = {
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
    <section className="h-[100vh] bg-midAsh">
      <h3 className="text-center pt-20 text-3xl font-medium max-w-xs mx-auto lg:max-w-none">
        See wetin our clients dey yarn
      </h3>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
        variants={cardVariants}
        className="pt-40 "
      >
        <Swiper
          slidesPerView={4}
          spaceBetween={150}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="lg:!mx-16 cursor-grab h-auto lg:!pb-16 "
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.num}>
              <div className="  h-72 rounded-3xl bg-midWhite flex flex-col items-center justify-center shadow-md">
                <div className=" flex justify-center">
                  <img
                    src={testimonial.pic}
                    alt="testifier"
                    className="h-16 w-16"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-hint text-2xl ">{testimonial.name}</h3>
                  <p className="max-w-[300px] text-secondaryText">
                    {testimonial.comment}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
}

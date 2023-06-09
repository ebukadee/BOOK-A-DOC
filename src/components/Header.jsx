import { stats } from "./data";
import hero from "../assets/hero.svg";
import Typer from "./Typer.jsx";
import {Link} from 'react-router-dom'

export default function Header({ id }) {
  return (
    <header
      id={id}
      className="w-full h-auto lg:h-[100vh] lg:w-full bg-midWhite"
    >
      <section className="flex-col-reverse flex pt-32 pb-16 lg:flex-row lg:justify-between lg:items-center lg:pt-40 ">
        <div className="p-8 mt-4 text-center lg:text-left lg:pl-8">
          <h1 className=" text-2xl font-medium lg:text-[44px] lg:leading-[50px] lg:font-[400]">
            Book appointments <br></br>
            <span className="flex justify-center lg:justify-start">
              with top
              <Typer
                messages={[
                  "Doctors",
                  "Nurses",
                  "Cardiologists",
                  "Paeditrists",
                  "Ophtamologists",
                  "Pharmacists",
                  "Optimetrics",
                ]}
                className="text-hint"
              />
            </span>
            at
            <span className="text-hint"> hospitals</span> near you.
          </h1>
          <Link to='/book-appointment'>
          <button className="bg-hint px-6 py-4 rounded-3xl mt-3 text-white ">
            Book Appointment
          </button>
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <img src={hero} alt="Doctor" className="  px-16 lg:w-[600px] " />
          <div className="lg:flex pt-4 hidden lg:text-center lg:pr-20 lg:pt-3">
            {stats.map((stat) => (
              <span
                key={stat.num}
                className={`${stat.num < 3 ? "lg:px-16" : "  lg:pl-8"}`}
              >
                <h2 className=" lg:text-5xl font-bold">{stat.value}</h2>
                <p className="text-secondaryText ">{stat.title}</p>
              </span>
            ))}
          </div>
        </div>
      </section>
    </header>
  );
}

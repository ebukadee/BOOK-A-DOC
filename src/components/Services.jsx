import { processes } from "./data";
export default function Services() {
  return (
    <section className=" h-auto w-full lg:w-full lg:relative bg-midAsh ">
      <h3 className=" text-center top-16 pt-12 text-3xl font-medium ">
        Services
      </h3>
      <div className=" mt-10 lg:mt-40">
        <div className="flex flex-col items-center lg:flex-row lg:justify-around ">
          {processes.map((process) => (
            <div key={process.num}>
              <div className="w-72 h-72 mt-8 rounded-3xl bg-midWhite flex flex-col items-center justify-center shadow-md">
                <div className=" flex justify-center">
                  <img
                    src={process.icon}
                    alt="hospital"
                    className="h-16 w-16  bg-midAsh"
                  />
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
          <button className="bg-hint  px-6 py-4 rounded-3xl mt-3 text-white ">
            Book Appointment
          </button>
        </div>
      </div>
    </section>
  );
}

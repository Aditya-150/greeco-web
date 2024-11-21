/* eslint-disable @next/next/no-img-element */
export default function About() {
    return (
      <div className="max-w-7xl mx-auto px-6 2xl:px-0 sm:py-20 py-10">
        <div className="inline-flex items-center gap-x-2">
          <span className="h-1 w-16 bg-[#4FE309]"></span>
          <h1 className="text-2xl font-semibold">About Us</h1>
        </div>
        <div className="bg-[#045D1D] w-full relative sm:py-36 py-20 sm:px-20 px-4 rounded-tr-3xl rounded-bl-3xl mt-10 flex flex-col justify-center items-center">
          <img
            src="/about-pattern.svg"
            alt="pattern"
            className="absolute right-0 left-0 mx-auto scale-95 z-10 my-auto top-0 bottom-0 hidden xl:block"
          />
          <div className="z-20 flex flex-col gap-y-4 text-center items-center justify-center lg:w-4/5">
            <h3 className="text-brown italic font-semibold text-xl sm:text-4xl lg:w-2/3 mb-8">
              Revolutionizing Sustainable B2B Sourcing in India
            </h3>
            <p className="text-white sm:text-2xl text-sm font-normal relative">
              <span className="sm:text-9xl text-5xl absolute font-bold text-brown left-0 -top-8 sm:-left-10 sm:-top-14">“</span>Greecomart
              is India&apos;s first dedicated B2B marketplace connecting
              businesses with verified suppliers of sustainable products. Our
              platform offers a comprehensive range of eco-friendly solutions,
              empowering businesses to adopt sustainable practices and
              contribute to a greener future.
            </p>
          </div>
        </div>
      </div>
    );
}
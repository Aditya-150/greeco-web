/* eslint-disable @next/next/no-img-element */
export default function Benefits() {
    const Points = [
      {
        icon: "/feat1.svg",
        title: "Enhanced Brand Appeal",
        description:
          "By adopting sustainable and eco-conscious products, businesses can stand out as leaders in the green movement, attracting a more environmentally aware customer base.",
        id: 1,
      },
      {
        icon: "/feat2.svg",
        title: "Reduced Environmental Footprint",
        description:
          "Our products help minimize waste and promote a circular economy, contributing to a healthier planet and a more sustainable future for businesses.",
        id: 2,
      },
      {
        icon: "/feat3.svg",
        title: "Cost-Effective and Sustainable",
        description:
          "Switching to durable, reusable products reduces long-term costs while aligning with global sustainability goals, benefiting both the environment and your bottom line.",
        id: 3,
      },
    ];
    return (
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6 2xl:px-0 pb-8">
          <div className="inline-flex items-center gap-x-2">
            <span className="h-1 w-16 bg-[#4FE309]"></span>
            <h1 className="text-2xl font-semibold">
              Lead the change towards a greener future
            </h1>
          </div>
        </div>
        <div className="bg-light-gray">
          <div className="max-w-7xl mx-auto px-6 2xl:px-0 lg:grid grid-cols-3 gap-4 items-start py-10 hidden">
            {Points.map((point) => (
              <div
                key={point.id}
                className="items-center flex flex-col justify-center text-center"
              >
                <div className="aspect-[4/3] flex justify-center items-center h-72 relative overflow-hidden group mb-4 rounded-tl-3xl rounded-br-3xl">
                  <img src={point.icon} alt={point.title} className="z-30" />
                  <svg
                    height="100"
                    width="100"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-0 left-0 mx-auto z-10 group-hover:scale-[600%] transition-all duration-300 ease-in-out opacity-60"
                  >
                    <circle r="45" cx="50" cy="50" fill="#4FE309" />
                  </svg>
                  <img
                    src="/benefits-pattern.svg"
                    alt="pattern"
                    className="absolute z-20 scale-90 right-0 left-0 mx-auto hidden group-hover:block transition-all duration-300 ease-in-out"
                  />
                </div>
                <h3 className="font-semibold text-lg">{point.title}</h3>
                <p className="mt-4">{point.description}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-8 px-6 items-center justify-center lg:hidden py-10">
            {Points.map((point) => (
              <div
                key={point.id}
                className="flex flex-col items-center justify-center text-center"
              >
                <div className="flex flex-row items-center justify-center gap-4 mb-4">
                  <div className="p-4 aspect-square rounded-full bg-[#4FE309] bg-opacity-40 flex justify-center items-center">
                    <img
                      src={point.icon}
                      alt={point.title}
                      className="size-6"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">{point.title}</h3>
                </div>
                <p>{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}
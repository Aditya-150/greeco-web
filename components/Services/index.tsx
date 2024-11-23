
/* eslint-disable @next/next/no-img-element */
export default function Services() {
    const services = [
      {
        id: 1,
        icon: "/Sustainable-icon.svg",
        title: "100% Sustainable",
      },
      {
        id: 2,
        icon: "/doorstep-icon.svg",
        title: "Doorstep delivery",
      },
      {
        id: 3,
        icon: "/leaf-icon.svg",
        title: "Eco-friendly choices",
      },
      {
        id: 4,
        icon: "/support-icon.svg",
        title: "Dedicated support",
      },
    ];
    return (
      <div className="bg-light-gray" id="services">
        <div className="max-w-7xl mx-auto px-6 2xl:px-0 py-20">
          <div className="inline-flex items-center gap-x-2">
            <span className="h-1 w-16 bg-[#4FE309]"></span>
            <h1 className="text-2xl font-semibold">Why Us?</h1>
          </div>
          <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mt-8">
            {services.map((service) => (
              <div
                className="bg-white p-4 rounded-xl aspect-square flex flex-col justify-center items-center"
                key={service.id}
              >
                <div className="aspect-square rounded-full bg-brown flex justify-center items-center size-32">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="size-10"
                  />
                </div>
                <p className="mt-4 text-center text-xl font-medium w-1/2">
                  {service.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}
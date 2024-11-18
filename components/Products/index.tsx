/* eslint-disable @next/next/no-img-element */

import Carousel from "../ui/carousel";

export default function Products() {
  const Products = [
    { id: 1, name: "Office Supplies", src: "/prod1.webp" },
    { id: 2, name: "Packaging", src: "/prod2.webp" },
    { id: 3, name: "Bags", src: "/prod3.webp" },
    { id: 4, name: "Hygiene Products", src: "/prod4.webp" },
    { id: 5, name: "Clothing", src: "/prod5.webp" },
  ];
  return (
    <div className="max-w-7xl mx-auto px-6 2xl:px-0 py-20">
      <div className="inline-flex items-center gap-x-2 mb-8">
        <span className="h-1 w-16 bg-[#4FE309]"></span>
        <h1 className="text-2xl font-semibold">Products</h1>
      </div>
      <div className="xl:grid grid-cols-5 gap-4 hidden">
        {Products.map((product) => (
          <div className="flex flex-col items-center justify-center gap-y-4 hover:cursor-pointer" key={product.id}>
            <div className="h-80 w-60 overflow-hidden group rounded-2xl">
                <img src={product.src} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300 ease-in-out"/>
            </div>
            <div className="text-center flex bg-brown text-white py-1 px-2 rounded-full"><p>{product.name}</p></div>
          </div>
        ))}
      </div>
      <div className="xl:hidden flex">
        <Carousel items={Products} continuous={true} infinite={true} showDots={false}/>
      </div>
    </div>
  );
}

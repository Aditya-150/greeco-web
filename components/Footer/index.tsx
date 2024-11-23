import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function Footer() {
  return (
    <div className="bg-[#045D1D] rounded-t-3xl relative max-lg:mt-20">
      <div className="max-w-7xl mx-auto 2xl:px-0 px-6 py-20 text-white flex flex-col gap-y-20 relative z-10">
        <div className="flex sm:flex-row sm:items-start sm:justify-between flex-col items-center justify-center sm:gap-y-0 gap-y-10">
          <div className="flex flex-col gap-y-4 max-sm:justify-center max-sm:items-center">
            <img src="/footer-logo.svg" alt="Logo" className="w-40" />
            <p className="text-lg w-2/3 max-sm:text-center">
              Empowering businesses to source eco-friendly products for a
              greener tomorrow.
            </p>
          </div>
          <div className="flex flex-col gap-y-3 items-center">
            <p>Follow us on</p>
            <div className="grid grid-cols-3 gap-3">
              <Link
                href="/"
                className="bg-[#4FE309] aspect-square rounded-full p-3 flex items-center justify-center"
              >
                <img src="/linkedin-icon.svg" alt="linkedin" />
              </Link>
              <Link
                href="/"
                className="bg-[#4FE309] aspect-square rounded-full p-3 flex items-center justify-center"
              >
                <img src="/twitter-icon.svg" alt="linkedin" />
              </Link>{" "}
              <Link
                href="/"
                className="bg-[#4FE309] aspect-square rounded-full p-3 flex items-center justify-center"
              >
                <img src="/instagram-icon.svg" alt="linkedin" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto flex flex-row gap-x-4 items-center justify-center mt-20">
          <p>© 2024</p>
          <Link
            href="/"
            className="hover:underline transition-all duration-300 ease-in-out"
          >
            Privacy-Terms
          </Link>
        </div>
      </div>

      <img
        src="/footer-pattern.svg"
        alt="pattern"
        className="mx-auto mt-auto hidden xl:block absolute left-0 right-0 bottom-0 z-0"
      />
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const contactDetails = [
  {
    id: 1,
    icon: "/mail-icon.svg",
    link: "mailto:info@greecomart.com",
    text: "info@greecomart.com",
    name: "Mail",
  },
  {
    id: 2,
    icon: "/call-icon.svg",
    link: "tel:+919368794828",
    text: "+91 9368794828",
    name: "Call",
  },
];

// Zod schema for validation
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  type: z.string().min(1, "Please specify Buyer or Seller"),
  company: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  // Replace with your Google Apps Script URL
  const googleScriptURL =
    "https://script.google.com/macros/s/AKfycbwFGEcPmE1aTOD7rHFE_jqM2jmYxWtpsv99ST8b7PpWF8QvMbezx9E67oiIImkzwrXkEw/exec";

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch(googleScriptURL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to submit form");
      setSubmitStatus("success");
      reset();
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <div className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 2xl:px-0">
        <div className="inline-flex items-center gap-x-2">
          <span className="h-1 w-16 bg-[#4FE309]"></span>
          <h1 className="text-2xl font-semibold">Contact</h1>
        </div>
      </div>
      <div className="relative h-[800px] max-lg:py-20">
        <div className="max-w-7xl mx-auto px-6 2xl:px-0 flex lg:flex-row flex-col-reverse lg:justify-between max-lg:gap-y-6 items-center h-full z-30 absolute top-0 left-0 right-0">
          <div className="flex flex-col max-lg:text-center max-lg:items-center max-lg:text-white">
            <h3 className="lg:text-3xl text-xl font-semibold mb-4 lg:w-4/5">
              TELL US ABOUT YOUR PROJECT!
            </h3>
            <p className="hidden lg:flex">Reach out to us directly:</p>
            <div className="flex flex-col gap-y-4 lg:mt-8">
              {contactDetails.map((detail) => (
                <Link
                  href={detail.link}
                  key={detail.id}
                  className="inline-flex gap-x-2 items-center"
                >
                  <div className="aspect-square bg-[#4FE309] p-4 flex items-center justify-center rounded-full">
                    <img src={detail.icon} alt={detail.name} />
                  </div>
                  <p className="font-medium">{detail.text}</p>
                </Link>
              ))}
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <div className="bg-brown p-6 rounded-2xl grid grid-cols-2 gap-4">
              <div className="col-span-1 flex flex-col">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="bg-slate-100 text-base placeholder:text-gray-500 p-2 rounded-lg"
                  {...register("name")}
                />
                <p className="col-span-2 text-red-500">
                  {errors.name?.message}
                </p>
              </div>

              <div className="col-span-1 flex flex-col">
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-slate-100 text-base placeholder:text-gray-500 p-2 rounded-lg"
                  {...register("email")}
                />
                <p className="col-span-2 text-red-500">
                  {errors.email?.message}
                </p>
              </div>

              <div className="col-span-1 flex flex-col">
                <input
                  type="text"
                  placeholder="Buyer/Seller"
                  className="bg-slate-100 text-base placeholder:text-gray-500 p-2 rounded-lg"
                  {...register("type")}
                />
                <p className="col-span-2 text-red-500">
                  {errors.type?.message}
                </p>
              </div>
              <div className="col-span-1 flex flex-col">
                <input
                  type="text"
                  placeholder="Company Name"
                  className="bg-slate-100 text-base placeholder:text-gray-500 p-2 rounded-lg"
                  {...register("company")}
                />
              </div>

              <div className="col-span-2 flex flex-col">
                <textarea
                  placeholder="Message"
                  className="bg-slate-100 text-base placeholder:text-gray-500 p-2 w-full rounded-lg h-48 lg:h-72 resize-none"
                  {...register("message")}
                />
                <p className="text-red-500 w-full">{errors.message?.message}</p>
              </div>
            </div>
            <button
              type="submit"
              className="px-32 py-2 border border-black bg-white font-medium rounded-full inline-flex items-center gap-x-2 self-center group hover:bg-brown hover:text-white transition-all duration-300 ease-in-out"
              disabled={isSubmitting}
            >
              Submit
              <span className="bg-brown rounded-full p-1">
                <ArrowRightIcon color="white" className="size-4" />
              </span>
            </button>
            {submitStatus === "success" && (
              <p className="text-green-500 text-center mt-2">
                Form submitted successfully!
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-500 text-center mt-2">
                Failed to submit the form. Please try again.
              </p>
            )}
          </form>
        </div>
        <div className="h-full aspect-square absolute lg:hidden block bg-black bg-opacity-50 left-0 z-20"></div>
        <div className="h-full aspect-square absolute right-0 z-10">
          <img
            src="/contact-bg.webp"
            alt="contact background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

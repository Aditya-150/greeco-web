/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

interface ContactDetail {
  id: number;
  icon: string;
  link: string;
  text: string;
  name: string;
}

interface FormData {
  name: string;
  email: string;
  type: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  type?: string;
  message?: string;
}

const contactDetails: ContactDetail[] = [
  {
    id: 1,
    icon: "/mail-icon.svg",
    link: "mailto:founders@greecomart.com",
    text: "founders@greecomart.com",
    name: "Mail",
  },
  {
    id: 2,
    icon: "/call-icon.svg",
    link: "tel:+919720623941",
    text: "+91 9720623941",
    name: "Call",
  },
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    type: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.type) newErrors.type = "Please specify Buyer or Seller";
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus(null);
    setErrorMessage("");

    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Use FormData for more reliable form submission
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwCT1v8dulLgAsIRaHOYVH2UWQBwk-zwNDjjFdfbIfid8Y74e6aFIhqHmzNWAR07y9J4g/exec",
        {
          method: "POST",
          body: formDataObj,
          mode: "no-cors", // Important for cross-origin requests
        }
      );

      // Since it's no-cors, we'll check network status
      // Note: With no-cors, you can't read the actual response
      if (response.type === "opaque") {
        // Successful submission in no-cors mode
        setFormData({
          name: "",
          email: "",
          type: "",
          company: "",
          message: "",
        });
        setSubmitStatus("success");
      } else {
        // Fallback error handling
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setErrorMessage(
        "Failed to submit the form. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
            <div className="bg-brown p-6 rounded-2xl grid grid-cols-2 gap-4">
              <div className="col-span-1 flex flex-col">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="bg-slate-100 text-base placeholder:text-gray-500 p-2 rounded-lg"
                  aria-label="Full Name"
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>

              <div className="col-span-1 flex flex-col">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="bg-slate-100 text-base placeholder:text-gray-500 p-2 rounded-lg"
                  aria-label="Email"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>

              <div className="col-span-1 flex flex-col">
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  placeholder="Buyer/Seller"
                  className="bg-slate-100 text-base placeholder:text-gray-500 p-2 rounded-lg"
                  aria-label="Buyer/Seller"
                />
                {errors.type && <p className="text-red-500">{errors.type}</p>}
              </div>

              <div className="col-span-1 flex flex-col">
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company Name"
                  className="bg-slate-100 text-base placeholder:text-gray-500 p-2 rounded-lg"
                  aria-label="Company Name"
                />
              </div>

              <div className="col-span-2 flex flex-col">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message"
                  className="bg-slate-100 text-base placeholder:text-gray-500 p-2 w-full rounded-lg h-48 lg:h-72 resize-none"
                  aria-label="Message"
                />
                {errors.message && (
                  <p className="text-red-500">{errors.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-32 py-2 border border-black bg-white font-medium rounded-full inline-flex items-center gap-x-2 self-center group hover:bg-brown hover:text-white transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
              <span className="bg-brown rounded-full p-1">
                <ArrowRightIcon color="white" className="size-4" />
              </span>
            </button>

            {submitStatus === "success" && (
              <p className="text-green-500 text-center mt-2">
                Form submitted successfully! We&apos;ll get back to you soon.
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-500 text-center mt-2">{errorMessage}</p>
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
};

export default Contact;

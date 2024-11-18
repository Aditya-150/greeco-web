import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import Services from "@/components/Services";


export default function Home() {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Products />
        <Contact />
      </main>
    </div>
  );
}

import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";


export default function Home() {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services/>
        <Contact/>
      </main>
    </div>
  );
}

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main className="flex-grow">
        <Hero />
      </main>
    </div>
  );
}

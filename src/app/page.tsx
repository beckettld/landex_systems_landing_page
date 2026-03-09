import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Thesis from "@/components/Thesis";
import Playbook from "@/components/Playbook";
import Capabilities from "@/components/Capabilities";
import Economics from "@/components/Economics";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Thesis />
      <Playbook />
      <Capabilities />
      <Economics />
      <Footer />
    </>
  );
}

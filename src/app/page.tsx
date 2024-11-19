"use client";
import {
  Navbar,
  Hero,
  Features,
  Pricing,
  FAQ,
  Footer,
} from "@/components/landing_page";

const IndexPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
};

export default IndexPage;

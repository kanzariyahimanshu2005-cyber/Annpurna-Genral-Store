import { Hero } from "../components/Hero";
import { Categories } from "../components/Categories";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { AIFeaturesBanner } from "../components/AIFeaturesBanner";
import { HowItWorks } from "../components/HowItWorks";
import { Testimonials } from "../components/Testimonials";
import { Newsletter } from "../components/Newsletter";

export function Home() {
  return (
    <>
      <Hero />
      <AIFeaturesBanner />
      <Categories />
      <HowItWorks />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
    </>
  );
}

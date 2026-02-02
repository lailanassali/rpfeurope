import { Suspense } from "react";
import { Metadata } from "next";
import { GiveLifeForm } from "@/components/forms/GiveLifeForm";
import { AboutCardsCarousel } from "@/components/common/AboutCardsCarousel";
import { getCarouselImages } from "@/lib/image-utils";

export const metadata: Metadata = {
  title: "Give Your Life to Christ | Redeemed Pillar of Fire",
  description: "Start your journey in faith. Whether you are a new believer or rededicating your life, we are so excited that you are ready to take this next step!",
};

export const revalidate = 60;

export default async function GiveLifePage() {
  const images = await getCarouselImages('give_life_carousel', [
    "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
  ]);

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <main className="flex-1">
        {/* Header Section (Text Only) */}
        <section className="md:py-24 py-8 bg-white">
          <div className="container w-11/12 px-4 mx-auto md:text-left text-center">
            <h1 className="md:text-[40px] text-[24px] font-bold text-black mb-6">
              Give Your Life to Christ
            </h1>
            <p className="md:text-[20px] text-[16px] text-black/70 md:w-11/12 w-full mb-6">
              Whether you are a new believer or rededicating your life, we are so excited that you are ready to take this next step!
            </p>
            <p className="md:text-[20px] text-[16px] text-black/70 md:w-11/12 w-full mb-8">
              Say “yes” to Jesus by filling out the form below and one of our team will connect with you, celebrate with you, and help you navigate your new life in Christ.
            </p>
            <p className="text-[18px] md:text-[24px] text-center text-primary leading-relaxed">
              “The effective, fervent prayer of a righteous man avails much. — James 5:16”
            </p>
          </div>
        </section>


        {/* Form Section */}
        <section className="md:pt-24 md:pb-40 pt-5 pb-5 bg-white">
          <div className="container w-11/12 px-4 mx-auto">
            <Suspense fallback={<div>Loading form...</div>}>
              <GiveLifeForm />
            </Suspense>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="pt-20 bg-white">
          <AboutCardsCarousel images={images} />
        </section>
      </main>
    </div>
  );
}

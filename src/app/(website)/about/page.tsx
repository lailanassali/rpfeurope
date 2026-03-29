import { Metadata } from "next";
import { SectionContent } from "@/components/common/SectionContent";
import { ImageTextSection } from "@/components/common/ImageTextSection";
import { FinalCTA } from "@/components/common/FinalCTA";
import { LocationCard } from "@/components/common/LocationCard";
import { AboutCardsCarousel } from "@/components/common/AboutCardsCarousel";
import { LoveCarousel } from "@/components/common/LoveCarousel";
import { getHeroImage, getCarouselImages } from "@/lib/image-utils";

export const metadata: Metadata = {
  title: "About Us | Redeemed Pillar of Fire Europe",
  description: "Learn about RPF Europe's mission to spark revival and restore the early church. Discover our story, values, leadership, and commitment to raising purposeful followers of Christ since 2014.",
  keywords: ["RPF Europe", "about RPF", "Pentecostal church mission", "church history", "Pastor Augustine E-Ben", "revival movement"],
  openGraph: {
    title: "About RPF Europe | Our Mission & Leadership",
    description: "Founded in 2014, RPF is a family consecrated to Christ, sparking revival across UK and beyond.",
    url: "https://RPFeurope.org/about",
    siteName: "Redeemed Pillar of Fire Europe",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About RPF Europe",
    description: "Learn about our mission to spark revival and raise purposeful followers for Christ.",
  },
  alternates: {
    canonical: "https://RPFeurope.org/about",
  },
};

// Revalidate this page every 60 seconds (ISR)
export const revalidate = 60;

export default async function AboutPage() {
  // Fetch images from database
  const aboutCarousel = await getCarouselImages('about_carousel', [
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop"
  ]);
  const aboutMission = await getHeroImage('about_mission', 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&h=1000&fit=crop');
  const aboutBeliefs = await getHeroImage('about_beliefs', 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&h=1000&fit=crop');
  const aboutLove = await getHeroImage('about_love', 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&h=1000&fit=crop');
  const aboutPrayer = await getHeroImage('about_prayer', 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=1000&fit=crop');
  const aboutWorship = await getHeroImage('about_worship', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=1000&fit=crop');
  const aboutLeadership = await getHeroImage('about_leadership', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=1000&fit=crop');
  const aboutSunday = await getHeroImage('about_sunday', 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&h=900&fit=crop');
  const aboutBible = await getHeroImage('about_bible', 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=600&h=900&fit=crop');
  const aboutFirenight = await getHeroImage('about_firenight', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=900&fit=crop');
  const aboutCTA = await getHeroImage('about_cta');

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Top Introductory Text - Centered with Quotes */}
        <section className="container w-full px-4 sm:w-11/12 mx-auto pt-8 md:pt-12 lg:pt-16">
          <h1 className="text-2xl md:text-3xl lg:text-[36px] text-primary font-normal mb-12 md:mb-16 lg:mb-[72px] text-center px-4">
            Founded in 2014, Redeemed Pillar of Fire (RPF) is a family fully consecrated to Jesus Christ and led by the Holy Spirit
          </h1>
        </section>

        {/* Cards Carousel Section - Simple image boxes with gradients */}
        <AboutCardsCarousel
          images={aboutCarousel}
        />

        {/* Our Story Section - with <br/> tags between paragraphs */}
        <section className="container w-full px-4 sm:w-11/12 mx-auto mt-12 md:mt-16 lg:mt-20 mb-12 md:mb-16 lg:mb-20">
          <SectionContent
            heading="Our Story"
            description={`Meet Pastor Augustine E-Ben. The Head Pastor of Redeemed Pillar of Fire Europe. Pastor Austin E-Ben first founded the church in October 2014, since then the ministry has expanded greatly with several branches and university fellowships worldwide. His love for God is reflected in his teaching of the word, love for souls and his dedication to the work of God. His goal is to bring souls from darkness to light, that they may receive forgiveness of sins the inheritance promised to those who are sanctified by faith in Jesus Christ.
With the help of God, RPF Ministry will bring revival that will sweep the nations and restore the fear of the Lord. The ministry was built on love and prayer and as a church, we steadfastly dedicate ourselves to prayer and pour out love into one another, as we all aim to look a little bit more like Christ daily.`}
            alignment="left"
            headingSize="large"
          />
        </section>

        {/* Mission & Values Section - with <br/> tags before paragraphs */}
        <section className="bg-[#CEC3DF33] md:py-24 py-5 md:mb-20 mb-5">
          <ImageTextSection
            heading="Mission & Values"
            image={aboutMission}
            imagePosition="left"
            description={`Our mission is to spark and sustain revival, restoring the early church as revealed in the book of Acts - until the return of Christ.\n\nGrounded in The Gospel of Jesus Christ and empowered by the Holy Spirit, we are called to proclaim the Good News, make disciples of many nations and advance God's Kingdom on earth through lives marked by love, holiness and power. We are committed to raising up zealous believers who walk boldly in their God-given callings and carry the presence of God wherever they go.\n\nWith God's help, Redeemed Pillar of Fire (RPF) will ignite a revival that sweeps across nations and restores the fear of the Lord. Built on a foundation of love and prayer, our ministry is steadfastly committed to continual prayer and pouring out love into one another. Together, we strive each day to reflect Christ more clearly in all we do.`}
          />
        </section>

        {/* What We Believe Section - text and quote in same div, aligned left */}
        <section className="bg-white md:py-24 py-5 md:mb-20 mb-16">
          <div className="container w-11/12 mx-auto px-4">
            <h2 className="text-[24px] md:text-[48px] font-bold text-black mb-8 text-left">
              What We Believe
            </h2>
            <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-12 items-center">
              {/* Image - 45% */}
              <div className="w-full md:w-[45%]">
                <div className="relative h-[400px] md:h-[520px] overflow-hidden rounded-lg">
                  <img
                    src={aboutBeliefs}
                    alt="What We Believe"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Text and Quote - 60%, aligned left */}
              <div className="w-full md:w-[60%] text-left">
                <p className="text-[16px] md:text-[20px] font-normal text-black leading-relaxed mb-8">
                  Redeemed Pillar of Fire (RPF) is a Christ-centered church that believes the Bible is God’s Word—the only
                  true and right way to follow Him. Everything we teach is rooted in Scripture, and we are grateful for the
                  new covenant that Christ has made available to all believers. <br /><br />We believe that Jesus Christ is the way, the truth, and the life (John 14:6), and that through Him alone we
                  find salvation, purpose and hope.
                  In a time when many are turning away from the church, we remain committed to being a true reflection of
                  the Bride and Body of Christ.
                </p>

                <blockquote className="text-primary text-[18px] md:text-[24px] font-normal mt-8">
                  &quot;We are not a remnant so that we can hide; we are a remnant so that we can
                  make a change. &quot;
                  — Pastor Kelvin
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Love Carousel Section - with heading outside box */}
        <section className="container w-11/12 mx-auto px-4 md:mb-[118px] mb-12">
          <LoveCarousel
            items={[
              {
                heading: "Love: Our Highest Calling",
                text: "Love, the highest calling and the foundation of everything we do. Scripture teaches that even the most powerful gifts are meaningless without love (1 Corinthians 13). We are committed to walking in the love of Christ and our desire is for everyone to experience His love through our ministry.",
                image: aboutLove
              },
              {
                heading: "Prayer: Our Foundation",
                text: "Prayer is the foundation of everything we do at Redeemed Pillar of Fire. We believe in the power of continual prayer and intercession, knowing that it is through prayer that we draw closer to God and see His mighty works manifested in our lives and ministry.",
                image: aboutPrayer
              },
              {
                heading: "Worship: Our Expression",
                text: "Worship is at the heart of who we are. We gather to lift high the name of Jesus, to encounter His presence, and to express our love and devotion to Him. Through authentic worship, we experience transformation and renewal.",
                image: aboutWorship
              }
            ]}
          />
        </section>

        {/* Our Leadership Section - Using LoveCarousel in static mode */}
        <section className="bg-[#463460] py-20 mb-20">
          <div className="container w-11/12 mx-auto px-4">
            <LoveCarousel
              items={[
                {
                  heading: "Our Leadership",
                  text: `Meet Pastor Augustine E-Ben, a dedicated servant of Christ who leads Redeemed Pillar of Fire (RPF) with love, unwavering faith and humility. A man who seeks the face of God and carries His presence everywhere he goes.\n\nPastor Austin E-Ben is committed to raising up spiritual soldiers for the End Times - training and equipping everyone in the Redeemed Pillar of Fire (RPF) to walk in their God-given purpose and serve as vessels for His Kingdom. Since founding the church in October 2014, the ministry has grown significantly, expanding to multiple branches and university fellowships around the world. His love for God is evident in his passionate teaching of the Word, his compassion for souls, and his tireless devotion to the work of the ministry.\n\nHis mission is clear: to bring souls out of darkness into the light of Christ — that they may receive the forgiveness of sins and the eternal inheritance promised to all who are sanctified by faith in Jesus Christ.`,
                  image: aboutLeadership,
                  imageTitle: "Senior Pastor E-Ben"
                }
              ]}
              showCarousel={false}
              bgColor="#463460"
              textColor="white"
              borderColor="#59427B"
            />
          </div>
        </section>

        {/* Worship With Us Section - 16px spacing */}
        <section className="container w-11/12 mx-auto px-4 mb-24">
          <SectionContent
            heading="Worship with us"
            description="Always wondered what a Redeemed Pillar of Fire (RPF) service is like? Come and find out. Whether you're just curious, seeking answers or hungry for more of God, you're welcome here — a place where lives are transformed by the power and presence of Jesus Christ."
            alignment="left"
            headingSize="large"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <LocationCard
              location="Sunday Service"
              image={aboutSunday}
              href="#"
              description="Sunday is the Lord’s Day, and at RPF, it’s a joyful celebration of His
presence. Our services are full of vibrant praise, heartfelt worship, and the uncompromised
teaching of God’s Word.
We also share testimonies of what God is doing in our lives, followed by a time of fellowship
where you can connect with others and feel part of a family.
Join us, there’s a seat waiting for you."
            />
            <LocationCard
              location="Bible Study"
              image={aboutBible}
              href="#"
              description="Our Bible Study sessions are a chance to dive deep into the Word in an intimate, welcoming
setting. We gather in breakout groups where people can ask real questions, have honest
conversations and grow together in faith.
Whether you’re just beginning your journey with the Bible or have been studying it for years,
there’s something for everyone — from foundational teachings to more advanced studies."
            />
            <LocationCard
              location="Fire Night"
              image={aboutFirenight}
              href="#"
              description="A truly supernatural experience. Fire Night at Redeemed Pillar of Fire (RPF) is unlike anything else.
It’s a time to press into prayer, encounter the Holy Spirit and experience God in a powerful, lifechanging way.
These evenings are filled with heartfelt worship, the teaching of the Word, powerful praise and
moving testimonies. Every Fire Night is an invitation to go deeper and encounter Jesus like never
before."
            />
          </div>
        </section>

        {/* Final CTA */}
        <FinalCTA backgroundImage={aboutCTA} />
      </main>
    </div>
  );
}

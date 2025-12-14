import { HeroText } from "./HeroText";

interface FinalCTAProps {
 heading?: string;
 subtitle?: string;
 primaryButtonText?: string;
 primaryButtonHref?: string;
 backgroundImage?: string;
}

export function FinalCTA({
 heading = "Ready to take the Next Step?",
 subtitle = "Christ Healing Home (CHH) is a family fully consecrated to Jesus Christ and led by the Holy Spirit. Whether you're new to faith or looking for a church home, we'd love to connect with you.",
 primaryButtonText = "Connect With Us",
 primaryButtonHref = "/connect",
 backgroundImage = "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1920&h=1080&fit=crop"
}: FinalCTAProps) {
 return (
  <section className="py-24 relative flex items-center bg-[#CEC3DF80]">
   <div className="container w-11/12 mx-auto px-4">
    <div className="container relative z-10 px-4">
     <div className="rounded-3xl overflow-hidden">
      <section className="relative h-[550px] w-full flex items-end overflow-hidden">
       {/* Background with overlay */}
       <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
         backgroundColor: "#382a4dff",
         backgroundImage: `linear-gradient(rgba(89, 66, 123, 0.6), rgba(89, 66, 123, 0.6)), url('${backgroundImage}')`
        }}
       />
       <HeroText
        heading={heading}
        subtitle={subtitle}
        primaryButton={{ text: primaryButtonText, href: primaryButtonHref }}
        headingSize={40}
        headingWeight={600}
        subtitleSize={18}
        subtitleWeight={400}
       />
      </section>
     </div>
    </div>
   </div>
  </section>
 );
}

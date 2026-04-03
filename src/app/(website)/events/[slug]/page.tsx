import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MapPin, Handshake } from "lucide-react";
import { HeroText } from "@/components/common/HeroText";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { EventRegistrationButton } from "@/components/events/EventRegistrationButton";
import { supabaseAdmin } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { formatDate } from '@/lib/utils'


// Fetch event from database
async function getEventDetail(slug: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('events')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) return null;
    return data;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventDetail(slug);

  if (!event) {
    return {
      title: 'Event Not Found | RPF Europe',
    };
  }

  return {
    title: `${event.title} | RPF Europe`,
    description: event.description || 'Join us for this upcoming event at RPF Europe',
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventDetail(slug);

  if (!event) {
    notFound();
  }

  // Parse JSON fields if they exist
  const keyHighlights = event.key_highlights || [];
  const whatToExpect = event.what_to_expect || [];
  const faqs = event.faqs || [];

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Back Button */}
        <div className="container w-11/12 px-4 mx-auto md:pt-[120px] pt-[40px] md:pb-[80px] pb-[30px]">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-black hover:text-primary transition-colors"
          >
            <div className="rounded-lg border-[0.5px] border-black p-1 ">
              <ArrowLeft className="size-5 " />
            </div>
            <span>Back to Events</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className='container w-11/12 px-4 mx-auto'>
          <section className="relative md:h-[650px] h-[450px] w-full flex items-end overflow-hidden mb-12">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundColor: "#382a4dff",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${event.image_url || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1920&h=1080&fit=crop'}')`
              }}
            />
            <HeroText heading={event.title} />
          </section>
        </div>

        {/* Main Content - 60/40 Split */}
        <section className="pb-24">
          <div className="container w-11/12 px-4 mx-auto">
            <div className="flex flex-col lg:flex-row md:gap-24 gap-12">
              {/* Left Side - 60% */}
              <div className="lg:w-[60%]">
                {/* Description */}
                <p className="text-[16px] text-black/80 leading-relaxed mb-8 whitespace-pre-wrap">
                  {event.description || 'Join us for this exciting event!'}
                </p>

                {/* Quote */}
                {event.quote && (
                  <div className="text-[#59427B] md:text-[24px] text-[18px] mb-12">
                    "{event.quote}"
                  </div>
                )}

                {keyHighlights.length > 0 && (
                  <div className='py-10 border-b-[0.5px] border-t-[0.5px] border-[#cccccc]'>
                    {/* Key Highlights */}
                    <h3 className="md:text-[24px] text-[18px] font-bold text-black mb-8">
                      Key highlights from this event:
                    </h3>

                    <div className="">
                      {keyHighlights.map((highlight: string, index: number) => (
                        <div key={index} className="flex items-start gap-4 md:py-[13px] py-[6px]">
                          <Handshake className="size-8 text-[#59427B] shrink-0" />
                          <p className="md:text-[20px] text-[16px] text-black">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {event.additional_info && (
                  <p className="text-[20px] text-black mt-10">
                    {event.additional_info}
                  </p>
                )}
              </div>

              {/* Right Side - 40% */}
              <div className="lg:w-[40%]">
                <div
                  className="md:p-8 p-6 rounded-[24px] border border-[#CEC3DF]"
                  style={{ boxShadow: "0px 4px 10px 0px #362C461A" }}
                >
                  <h2 className="md:text-[40px] text-[20px] font-bold text-black md:mb-[20px] mb-[10px]">
                    {event.title}
                  </h2>

                  {/* Location Badge */}
                  <div className="md:mb-12 mb-6">
                    <span className="inline-block border border-[#A25F20] bg-[#FCF5EE] text-[#A25F20] text-[12px] font-medium rounded px-[10px] py-[6px]">
                      {event.category}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 pt-3">
                      <Calendar className="size-6 text-black" />
                      <span className="text-[14px] text-black">{formatDate(event.date)}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-3">
                      <Clock className="size-6 text-black" />
                      <span className="text-[14px] text-black">{event.time}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-3">
                      <MapPin className="size-6 text-black" />
                      <span className="text-[14px] text-black">{event.venue}</span>
                    </div>
                  </div>

                  {/* Register Button */}
                  <EventRegistrationButton
                    eventSlug={event.slug}
                    eventTitle={event.title}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What to Expect Section */}
        {whatToExpect.length > 0 && (
          <section className="md:py-24 py-12 bg-[#FDF8F4]">
            <div className="container w-11/12 px-4 mx-auto">
              <h2 className="md:text-[40px] text-[20px] font-bold text-black mb-12">
                What to Expect
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {whatToExpect.map((item: any, index: number) => (
                  <div key={index}>
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop'}
                      alt={item.title}
                      className="w-full h-[500px] object-cover rounded-[8px]"
                    />
                    <h3 className="text-[22px] font-semibold text-black mt-6">
                      {item.title}
                    </h3>
                    <p className="text-[14px] text-black font-normal mt-2 whitespace-pre-wrap">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="md:py-24 py-12 bg-[#CEC3DF4D]">
            <div className="container w-11/12 mx-auto px-[56px]">
              <div className="text-center mb-8">
                <h2 className="md:text-[40px] text-[20px] font-bold text-black mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="md:text-[18px] text-[14px] text-black">
                  Got questions? We've got answers!
                </p>
              </div>
              <FAQAccordion items={faqs} />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

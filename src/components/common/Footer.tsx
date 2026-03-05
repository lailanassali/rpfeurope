"use client";

import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import Image from "next/image";

interface FooterLinkColumnProps {
  title: string;
  links: Array<{ text: string; href: string }>;
}

function FooterLinkColumn({ title, links }: FooterLinkColumnProps) {
  return (
    <div>
      <h3 className="text-white font-bold text-[15px] mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-white text-[14px] font-normal capitalize hover:text-white/80 transition-colors"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-primary text-white pt-10 pb-6 md:pt-16 md:pb-8">
      <div className="container w-11/12 mx-auto px-4">
        {/* Main Footer Content - First section 50% width (6/12 grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-10 md:mb-16">
          {/* First Part - Logo, Quote, Social Icons (6/12 columns = 50% width) */}
          <div className="lg:col-span-6">
            {/* Logo */}
            <div className="mb-3 md:mb-4">
              <Image
                src="/assets/rpflogo.png"
                alt="RPF Europe Logo"
                width={150}
                height={50}
                className="h-auto w-auto max-w-[120px] md:max-w-[150px]"
              />
            </div>

            {/* Quote - 16px space after logo */}
            <blockquote className="text-white/90 text-xs md:text-sm leading-snug md:leading-relaxed mb-6 md:mb-10 w-full max-w-[22rem] md:max-w-none md:w-[60%] capitalize">
              &quot;And the LORD went before them by day in a pillar of a cloud, to lead them the way: and by night in a Pillar of Fire, to give them light&quot; - Exodus 13:21
            </blockquote>

            {/* Social Icons - 40px space after quote */}
            <div className="flex gap-3 md:gap-4">
              <Link
                href="https://www.instagram.com/rpfeurope"
                target="_blank"
                className="hover:text-white/80 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="size-4 md:size-5" />
              </Link>
              <Link
                href="https://www.tiktok.com/@rpfeurope"
                target="_blank"
                className="hover:text-white/80 transition-colors"
                aria-label="TikTok"
              >
                <svg className="size-4 md:size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </Link>
              <Link
                href="https://www.facebook.com/RPF.UK/"
                target="_blank"
                className="hover:text-white/80 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="size-4 md:size-5" />
              </Link>
              {/* <Link
                href="https://x.com"
                target="_blank"
                className="hover:text-white/80 transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="size-4 md:size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link> */}
            </div>
          </div>

          {/* Quick Links (2/12 columns) */}
          <div className="hidden lg:col-span-2 lg:block">
            <FooterLinkColumn
              title="Quick Links"
              links={[
                { text: "About", href: "/about" },
                { text: "Ministries", href: "/ministries/youth" },
                { text: "Events", href: "/events" },
                { text: "Privacy Policy", href: "/privacy" }
              ]}
            />
          </div>

          {/* Get Involved (2/12 columns) */}
          <div className="hidden lg:col-span-2 lg:block">
            <FooterLinkColumn
              title="Get Involved"
              links={[
                { text: "Baptism", href: "/connect?tab=baptism" },
                { text: "Support & Counseling", href: "/connect?tab=counselling" },
                { text: "Testimonies", href: "/connect?tab=testimonies" },
                { text: "Prayer Requests", href: "/connect?tab=prayer" },
                { text: "Mentorship Group", href: "/connect?tab=mentorship" }
              ]}
            />
          </div>

          {/* Get in Touch (2/12 columns) */}
          <div className="hidden lg:col-span-2 lg:block">
            <FooterLinkColumn
              title="Get in Touch"
              links={[
                { text: "Locations", href: "/join-service" },
                { text: "Resources", href: "/resources" }
              ]}
            />
          </div>
        </div>

        {/* Bottom Section - Copyright and Back to Top */}
        <div className="my-6 md:my-16 border-t border-white pt-4 md:pt-10">
          <div className="flex gap-2 md:gap-3 items-center md:flex-row flex-col md:justify-between">
            <p className="text-white text-sm md:text-left text-center">
              &copy; 2025 Redeemed Pillar of Fire. All Rights Reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="text-white text-sm hover:text-white/80 transition-colors cursor-pointer"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Church, Users, Heart, HandshakeIcon, MessagesSquare, UserPlus, FileText } from "lucide-react";
import { ChhButton } from "./ChhButton";
import { MenuItem, MenuItemProps } from "./MenuItem";

const ministriesDropdown: MenuItemProps[] = [
  {
    title: "Men's and Women's fellowship",
    description: "Men's and Women's Fellowships are for ages 35 and above",
    href: "/ministries/fellowship",
  },
  {
    title: "CHH Children's Ministry",
    description: "Every child is loved, welcomed, and encouraged to grow.",
    href: "/ministries/children",
  },
  {
    title: "CHH Youth",
    description: "Every young person has a voice and a place to belong.",
    href: "/ministries/youth",
  },
  {
    title: "University Fellowships",
    description: "University Fellowships are campus-based communities across the UK and Europe.",
    href: "/ministries/university",
  },
];

const drawerGetInvolvedItems: MenuItemProps[] = [
  {
    title: "Join us for Service",
    description: "Find a location close to you",
    href: "/join-service",
    icon: <Church className="size-5 text-muted-foreground" />,
  },
  {
    title: "Baptism",
    description: "Take your next step in faith",
    href: "/baptism",
    icon: <Users className="size-5 text-muted-foreground" />,
  },
  {
    title: "Join a Department",
    description: "Discover the Joy of Serving",
    href: "/join-department",
    icon: <HandshakeIcon className="size-5 text-muted-foreground" />,
  },
  {
    title: "Prayer requests",
    description: "we believe in the power of intercession.",
    href: "/prayer-requests",
    icon: <Heart className="size-5 text-muted-foreground" />,
  },
  {
    title: "Testimonies",
    description: "What Has God Done for You?",
    href: "/testimonies",
    icon: <MessagesSquare className="size-5 text-muted-foreground" />,
  },
  {
    title: "Join a mentorship group",
    description: "Grow in Faith Together.",
    href: "/mentorship",
    icon: <UserPlus className="size-5 text-muted-foreground" />,
  },
  {
    title: "Support & Counselling",
    description: "we would be honoured to stand with you",
    href: "/support-counselling",
    icon: <Heart className="size-5 text-muted-foreground" />,
  },
];

const drawerDiscoverItems: MenuItemProps[] = [
  {
    title: "Resources",
    description: "Join a department to serve",
    href: "/resources",
    icon: <FileText className="size-5 text-muted-foreground" />,
  },
];

export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <header className="top-0 z-50 w-full bg-background border-b border-border/40">
        {/* Layered Tabs */}
        <div className="flex">
          <ChhButton className="font-bold text-[20px] bg-primary text-primary-foreground w-[220px] p-[10px] h-[70px]">
            CHH Europe
          </ChhButton>
          <ChhButton className="font-medium text-[20px] bg-chh-gold text-white w-[220px] p-[10px] h-[70px]">
            Crusades
          </ChhButton>
        </div>

        {/* Main Header */}
        <div className="flex h-[150px] items-center justify-between px-[80px] py-[40px] bg-[#EAE4DB1A]">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/assets/rpflogo.png"
              alt="CHH Logo"
              width={74}
              height={70}
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-[16px] items-center">
            <MenuItem title="Home" href="/" />
            <MenuItem title="About" href="/about" />
            <MenuItem
              title="Ministries"
              isDropdown={true}
              children={ministriesDropdown}
            />
            <MenuItem title="Events" href="/events" />
          </nav>

          {/* Hamburger Menu - All Screens */}
          <button
            onClick={toggleDrawer}
            className="p-2 hover:bg-muted rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="size-6 text-foreground" />
          </button>
        </div>
      </header>

      {/* Drawer - Visible on All Devices */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={closeDrawer}
          />

          {/* Drawer Panel */}
          <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-background z-50 shadow-2xl overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-end p-4">

              <button
                onClick={closeDrawer}
                className="p-2 hover:bg-muted rounded-md transition-colors"
                aria-label="Close menu"
              >
                <X className="size-6" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 space-y-[24px]">
              {/* Get Involved Section */}
              <div>
                <h3 className="text-[14px] font-medium py-[12px] text-black mb-[12px]" style={{ borderBottom: '0.5px solid #0000001A' }}>Get Involved</h3>
                <div className="">
                  {drawerGetInvolvedItems.map((item, index) => (
                    <MenuItem
                      key={index}
                      {...item}
                      onClick={closeDrawer}
                    />
                  ))}
                </div>
              </div>

              {/* Discover Section */}
              <div>
                <h3 className="text-[14px] font-medium py-[12px] text-black mb-[12px]" style={{ borderBottom: '0.5px solid #0000001A' }}>Discover</h3>
                <div className="">
                  {drawerDiscoverItems.map((item, index) => (
                    <MenuItem
                      key={index}
                      {...item}
                      onClick={closeDrawer}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

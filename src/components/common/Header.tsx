"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
	Menu,
	X,
	Home,
	Info,
	Church,
	Users,
	Heart,
	HandshakeIcon,
	MessagesSquare,
	UserPlus,
	FileText,
	CalendarDays,
	Sparkles,
} from "lucide-react";
import { RPFButton } from "./RPFButton";
import { MenuItem, MenuItemProps } from "./MenuItem";

const ministriesDropdown: MenuItemProps[] = [
	{
		title: "Men and Women",
		description: "Men's and Women's Fellowships are for ages 35 and above",
		href: "/ministries/fellowship",
	},
	{
		title: "Children's Ministry",
		description: "Every child is loved, welcomed, and encouraged to grow.",
		href: "/ministries/children",
	},
	{
		title: "Youth Ministry",
		description: "Every young person has a voice and a place to belong.",
		href: "/ministries/youth",
	},
	{
		title: "University Fellowships",
		description:
			"University Fellowships are campus-based communities across the UK and Europe.",
		href: "/ministries/university",
	},
];

const drawerGiveLifeItems: MenuItemProps[] = [
	{
		title: "Give your life to Christ",
		description: "Start your journey in faith",
		href: "/give-life",
		icon: <Sparkles className="size-5 text-muted-foreground" />,
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
		href: "/connect?tab=baptism",
		icon: <Users className="size-5 text-muted-foreground" />,
	},
	{
		title: "Serve",
		description: "Discover the joy of serving",
		href: "/connect?tab=serve",
		icon: <HandshakeIcon className="size-5 text-muted-foreground" />,
	},
	{
		title: "Prayer requests",
		description: "We believe in the power of intercession",
		href: "/connect?tab=prayer",
		icon: <Heart className="size-5 text-muted-foreground" />,
	},
	{
		title: "Testimonies",
		description: "What has God done for you?",
		href: "/connect?tab=testimonies",
		icon: <MessagesSquare className="size-5 text-muted-foreground" />,
	},
	{
		title: "Join a mentorship group",
		description: "Grow in faith together",
		href: "/connect?tab=mentorship",
		icon: <UserPlus className="size-5 text-muted-foreground" />,
	},
	{
		title: "Support & Counselling",
		description: "We would be honoured to stand with you",
		href: "/connect?tab=counselling",
		icon: <Heart className="size-5 text-muted-foreground" />,
	},
];

const drawerDiscoverItems: MenuItemProps[] = [
	{
		title: "Resources",
		description: "Explore our resources",
		href: "/resources",
		icon: <FileText className="size-5 text-muted-foreground" />,
	},
];

const drawerPrimaryNavItems: MenuItemProps[] = [
	{
		title: "Home",
		href: "/",
		icon: <Home className="size-5 text-muted-foreground" />,
	},
	{
		title: "About",
		href: "/about",
		icon: <Info className="size-5 text-muted-foreground" />,
	},
	{
		title: "Ministries",
		isDropdown: true,
		children: ministriesDropdown,
		icon: <Church className="size-5 text-muted-foreground" />,
	},
	{
		title: "Events",
		href: "/events",
		icon: <CalendarDays className="size-5 text-muted-foreground" />,
	},
];

export function Header() {
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

	const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
	const closeDrawer = () => setIsDrawerOpen(false);

	return (
		<>
			<div className="w-full bg-background hidden">
				{/* Layered Tabs */}
				<div className="flex w-full">
					<RPFButton className="font-bold text-[20px] bg-primary text-primary-foreground w-1/2 md:w-[220px] p-[10px] h-[60px] md:h-[70px]">
						RPF Europe
					</RPFButton>
					<RPFButton className="font-medium text-[20px] bg-chh-gold text-white w-1/2 md:w-[220px] p-[10px] h-[60px] md:h-[70px]">
						Crusades
					</RPFButton>
				</div>
			</div>

			{/* Main Header */}
			<header className="sticky top-0 z-50 w-full bg-background border-b border-border/40">
				<div className="flex h-[70px] md:h-[150px] items-center justify-between px-5 py-0 md:px-20 md:py-10 bg-[#EAE4DB1A]">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-2">
						<Image
							src="/assets/rpflogo.png"
							alt="RPF Logo"
							width={74}
							height={70}
							className="object-contain"
						/>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex gap-4 items-center">
						{drawerPrimaryNavItems.map((item, index) => (
							<MenuItem key={index} {...item} />
						))}
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
							{/* Primary Navigation */}
							<div className="md:hidden">
								<h3
									className="text-[14px] font-medium py-[12px] text-black mb-[12px]"
									style={{ borderBottom: "0.5px solid #0000001A" }}
								>
									Main Menu
								</h3>
								<div className="">
									{drawerPrimaryNavItems.map((item, index) => (
										<MenuItem
											key={index}
											{...item}
											isDrawer={true}
											onClick={closeDrawer}
										/>
									))}
								</div>
							</div>

							{/* Get Involved Section */}
							<div>
								<h3
									className="text-[14px] font-medium py-[12px] text-black mb-[12px]"
									style={{ borderBottom: "0.5px solid #0000001A" }}
								>
									Get Involved
								</h3>
								<div className="">
									{drawerGetInvolvedItems.map((item, index) => (
										<MenuItem
											key={index}
											{...item}
											isDrawer={true}
											onClick={closeDrawer}
										/>
									))}
								</div>
							</div>

							{/* Discover Section */}
							<div>
								<h3
									className="text-[14px] font-medium py-[12px] text-black mb-[12px]"
									style={{ borderBottom: "0.5px solid #0000001A" }}
								>
									Discover
								</h3>
								<div className="">
									{drawerDiscoverItems.map((item, index) => (
										<MenuItem
											key={index}
											{...item}
											isDrawer={true}
											onClick={closeDrawer}
										/>
									))}
								</div>
							</div>

							{/* Give Life Section - Start Here */}
							<div>
								<h3
									className="text-[14px] font-medium py-[12px] text-black mb-[12px]"
									style={{ borderBottom: "0.5px solid #0000001A" }}
								>
									Start Here
								</h3>
								<div className="">
									{drawerGiveLifeItems.map((item, index) => (
										<MenuItem
											key={index}
											{...item}
											isDrawer={true}
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

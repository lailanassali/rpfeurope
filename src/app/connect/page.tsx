import { Metadata } from "next";
import { ConnectTabs } from "@/components/common/ConnectTabs";
import { FAQAccordion } from "@/components/common/FAQAccordion";

export const metadata: Metadata = {
   title: "Connect | CHH Europe",
   description: "Get connected and grow together at Christ Healing Home Europe.",
};

const connectTabs = [
   {
      id: "baptism",
      name: "Baptism",
      title: "Baptism",
      description: [
         "Baptism is a beautiful declaration of your faith in Jesus Christ. It's a public testimony that you have accepted Christ as your Lord and Savior and are committed to following Him.",
         "At CHH, we believe baptism is an important step in your spiritual journey. Our baptism classes will help you understand the significance of this sacred act and prepare you for this special moment.",
         "Whether you're new to faith or have been walking with Christ for years, we welcome you to take this step and celebrate with our church family."
      ],
      quote: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit. - Matthew 28:19",
      image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&h=600&fit=crop",
      formTitle: "Get Baptized",
      formDescription: "Fill out this form to begin your baptism journey with us.",
      formFields: ["fullName", "email", "phone", "gender", "age", "attendsBranch", "baptismClasses", "why"],
      submitText: "I'm ready to get baptized"
   },
   {
      id: "counselling",
      name: "Counselling",
      title: "Counselling",
      description: [
         "Life can be challenging, and sometimes we all need someone to talk to. Our counselling services provide a safe, confidential space where you can share your struggles and receive biblical guidance.",
         "Our trained counsellors are here to walk alongside you through whatever season you're in - whether it's relationship issues, grief, anxiety, or simply needing wisdom for life's decisions.",
         "We're committed to helping you find healing, hope, and wholeness through Christ-centered counselling."
      ],
      quote: "The Lord is close to the brokenhearted and saves those who are crushed in spirit. - Psalm 34:18",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop",
      formTitle: "Request Counselling",
      formDescription: "Let us know how we can support you.",
      formFields: ["fullName", "email", "phone", "message"],
      submitText: "Request a Session"
   },
   {
      id: "mentorship",
      name: "Mentorship",
      title: "Mentorship",
      description: [
         "Grow in your faith journey with personalized mentorship from mature believers who are passionate about seeing you thrive in Christ.",
         "Our mentorship program pairs you with someone who can guide you, pray with you, and help you navigate your spiritual growth. Whether you're new to faith or looking to deepen your walk with God, mentorship provides the accountability and encouragement you need.",
         "Join a community of believers committed to growing together in faith, knowledge, and love."
      ],
      quote: "Iron sharpens iron, and one person sharpens another. - Proverbs 27:17",
      image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&h=600&fit=crop",
      formTitle: "Join Mentorship",
      formDescription: "Start your mentorship journey today.",
      formFields: ["fullName", "email", "phone", "message"],
      submitText: "Get Connected"
   },
   {
      id: "serve",
      name: "Serve",
      title: "Serve",
      description: [
         "God has uniquely gifted you to make a difference in His kingdom. At CHH, we believe everyone has a role to play in advancing the Gospel and serving our community.",
         "Whether it's worship, hospitality, children's ministry, media, or outreach - there's a place for you to use your talents and passions to serve.",
         "Discover your purpose and experience the joy of serving alongside other passionate believers who are making an impact for Christ."
      ],
      quote: "Each of you should use whatever gift you have received to serve others, as faithful stewards of God's grace. - 1 Peter 4:10",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop",
      formTitle: "Start Serving",
      formDescription: "Let us know where you'd like to serve.",
      formFields: ["fullName", "email", "phone", "message"],
      submitText: "I Want to Serve"
   },
   {
      id: "testimonies",
      name: "Testimonies",
      title: "Testimonies",
      description: [
         "Your story matters. God has done amazing things in your life, and sharing your testimony can encourage and inspire others in their faith journey.",
         "We love hearing how God is working in the lives of our church family. Whether it's a testimony of salvation, healing, provision, or answered prayer - we want to celebrate what God has done.",
         "Share your story and let your testimony be a beacon of hope and faith to others."
      ],
      quote: "They triumphed over him by the blood of the Lamb and by the word of their testimony. - Revelation 12:11",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
      formTitle: "Share Your Testimony",
      formDescription: "Tell us what God has done in your life.",
      formFields: ["fullName", "email", "phone", "message"],
      submitText: "Submit Testimony"
   },
   {
      id: "prayer",
      name: "Prayer Request",
      title: "Prayer Request",
      description: [
         "We believe in the power of prayer. Whatever you're facing, you don't have to face it alone. Our prayer team is ready to stand with you in faith and intercede on your behalf.",
         "Whether you need prayer for healing, breakthrough, guidance, or any other need - we're here for you. Every prayer request is handled with care, confidentiality, and compassion.",
         "Let us partner with you in prayer and watch God move in your situation."
      ],
      quote: "The prayer of a righteous person is powerful and effective. - James 5:16",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      formTitle: "Submit Prayer Request",
      formDescription: "Share your prayer needs with us.",
      formFields: ["fullName", "email", "phone", "message"],
      submitText: "Send Prayer Request"
   }
];

const faqItems = [
   {
      question: "How do I get baptized at CHH?",
      answer: "Simply fill out the baptism form above, and our team will contact you with information about upcoming baptism classes and service dates. Baptism classes help you understand the significance of baptism and prepare you for this important step in your faith journey."
   },
   {
      question: "Is counselling confidential?",
      answer: "Yes, absolutely. All counselling sessions are completely confidential. Our counsellors are trained to provide a safe, non-judgmental space where you can share openly. We take your privacy seriously and maintain strict confidentiality in all sessions."
   },
   {
      question: "Do I need to be a member to serve?",
      answer: "No, you don't need to be an official member to start serving! We welcome anyone who wants to use their gifts to serve God and support our church community. However, certain leadership positions may require membership and completion of our servant training."
   }
];

export default function ConnectPage() {
   return (
      <div className="flex min-h-screen flex-col">
         <main className="flex-1">
            {/* Header Section */}
            <section className="py-24 bg-white">
               <div className="container w-11/12 px-4 mx-auto text-left">
                  <h1 className="text-[40px] font-bold text-black mb-6 text-left">
                     We're Here For You - Get Connected. Grow Together.
                  </h1>
                  <p className="text-[20px] text-black/70 text-left w-11/12">
                     Whether you're taking your next step of faith, seeking guidance, or looking to serve — there's a place for you here at RPF. Choose an area below and start your journey.
                  </p>
               </div>
            </section>

            {/* Connect Tabs Section */}
            <section className="pt-24 pb-40 bg-gray-50">
               <div className="container w-11/12 px-4 mx-auto">
                  <ConnectTabs tabs={connectTabs} />
               </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-[#CEC3DF4D]">
               <div className="container w-11/12 mx-auto px-[56px]">
                  <div className="text-center mb-8">
                     <h2 className="text-[40px] font-bold text-black mb-4">
                        Frequently Asked Questions
                     </h2>
                     <p className="text-[18px] text-black">
                        From weekly youth nights to special retreats and community projects, RPF Youth is all about connection
                     </p>
                  </div>
                  <FAQAccordion items={faqItems} />
               </div>
            </section>
         </main>
      </div>
   );
}

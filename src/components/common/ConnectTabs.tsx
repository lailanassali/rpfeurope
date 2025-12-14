"use client";

import { useState } from "react";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { FormTextarea } from "./FormTextarea";
import { ChhButton } from "./ChhButton";

interface ConnectTab {
  id: string;
  name: string;
  title: string;
  description: string[];
  quote: string;
  image: string;
  formTitle: string;
  formDescription: string;
  formFields: string[];
  submitText: string;
}

interface ConnectTabsProps {
  tabs: ConnectTab[];
}

export function ConnectTabs({ tabs }: ConnectTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
  const [attendsBranch, setAttendsBranch] = useState("");

  const currentTab = tabs.find(tab => tab.id === activeTab);

  if (!currentTab) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex gap-2 flex-wrap mb-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === tab.id
              ? "bg-primary text-white"
              : "bg-transparent text-black hover:bg-gray-100"
              }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Content - 50% */}
        <div className="lg:w-1/2">
          <h2 className="text-[32px] font-bold text-black mb-6">{currentTab.title}</h2>

          {currentTab.description.map((paragraph, index) => (
            <p key={index} className="text-[16px] text-black/80 mb-6 leading-relaxed">
              {paragraph}
            </p>
          ))}

          {currentTab.quote && (
            <div className="mb-[64px] mt-[40px] text-[#59427B] text-[24px]">
              "{currentTab.quote}"
            </div>
          )}

          <img
            src={currentTab.image}
            alt={currentTab.title}
            className="w-full h-[434px] object-cover rounded-[12px]"
          />
        </div>

        {/* Right: Form - 50% */}
        <div className="lg:w-1/2 px-[48px]">
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-[24px] font-semibold text-[#211F1F] mb-2">{currentTab.formTitle}</h3>
            <p className="text-[14px] text-[#211F1F] mb-10">{currentTab.formDescription}</p>

            <form onSubmit={handleSubmit}>
              {currentTab.id === "baptism" && (
                <>
                  <FormInput label="Full Name" type="text" required />
                  <FormInput label="Email" type="email" required />
                  <FormInput label="Phone Number" type="tel" required />
                  <FormSelect
                    label="Gender"
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" }
                    ]}
                    required
                  />
                  <FormInput label="Age" type="number" required />
                  <FormSelect
                    label="Do you attend a branch?"
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" }
                    ]}
                    onChange={(e) => setAttendsBranch(e.target.value)}
                    required
                  />
                  {attendsBranch === "yes" && (
                    <FormInput label="Name of Branch" type="text" required />
                  )}
                  <FormSelect
                    label="Will you be available to join baptism classes?"
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" }
                    ]}
                    required
                  />
                  <FormTextarea
                    label="Why do you want to be baptized? (Optional)"
                  />
                </>
              )}

              {currentTab.id !== "baptism" && (
                <>
                  <FormInput label="Full Name" type="text" required />
                  <FormInput label="Email" type="email" required />
                  <FormInput label="Phone Number" type="tel" required />
                  <FormTextarea label="Message" required />
                </>
              )}

              <ChhButton type="submit" className="w-full bg-primary text-white hover:bg-primary/90 h-[57px] rounded-[12px] mt-5">
                {currentTab.submitText}
              </ChhButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

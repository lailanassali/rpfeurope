import { useState } from "react";
import { Info } from "lucide-react";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { FormTextarea } from "./FormTextarea";
import { ChhButton } from "./ChhButton";
import { toast } from 'react-hot-toast';

interface ConnectTab {
  id: string;
  name: string;
  title: string;
  description: string[];
  quote: string[];
  image: string;
  formTitle: string;
  formDescription: string;
  formFields: string[];
  submitText: string;
}

interface ConnectTabsProps {
  tabs: ConnectTab[];
  setActiveTab: (tabId: string) => void;
  activeTab: string;
}

export function ConnectTabs({ tabs, setActiveTab, activeTab }: ConnectTabsProps) {
  const [attendsBranch, setAttendsBranch] = useState("");
  const [attendsGroup, setAttendsGroup] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentTab = tabs.find(tab => tab.id === activeTab);

  if (!currentTab) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data: any = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_type: activeTab,
          data
        }),
      });

      if (!response.ok) throw new Error('Submission failed');

      // Auto-save testimony to testimonials database (pending approval)
      if (activeTab === 'testimonies' && data.fullName && data.testimony) {
        try {
          await fetch('/api/admin/testimonials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: data.fullName,
              testimony: data.testimony,
              is_approved: false
            }),
          });
        } catch (error) {
          console.error('Failed to save testimony:', error);
        }
      }

      toast.success('Form submitted successfully!');
      (e.target as HTMLFormElement).reset();
      setAttendsBranch('');
      setAttendsGroup('');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);

    // Update URL query parameter without triggering a router navigation (avoids twitching)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tabId);
      window.history.pushState({}, '', url);
    }
  };

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex md:gap-3 gap-1 flex-nowrap md:flex-wrap overflow-x-auto md:mb-16 mb-10 pb-2 md:pb-0 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-[10px] h-[44px] min-w-[160px] rounded-[8px] transition-colors ${activeTab === tab.id
              ? "bg-primary text-white font-bold"
              : "bg-transparent text-black hover:bg-gray-100 border border-[#f2f4f6b9]"
              }`}
            style={{
              border: activeTab === tab.id ? 'none' : '0.5px solid rgba(229, 229, 229, 0.5)'
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Content - 50% */}
        <div className="lg:w-1/2">
          <h2 className="md:text-[32px] text-[24px] font-bold text-black md:mb-6 mb-4">{currentTab.title}</h2>

          {currentTab.description.map((paragraph, index) => (
            <p key={index} className="text-[16px] text-black/80 mb-6 leading-relaxed">
              {paragraph}
            </p>
          ))}

          {currentTab.quote && (
            <div className="mb-[64px] mt-[40px]">
              {currentTab.quote.map((quote, index) => (
                <p key={index} className=" text-[#59427B] md:text-[24px] text-[18px] mb-6">
                  "{quote}"
                </p>
              ))}
            </div>
          )}

          <img
            src={currentTab.image}
            alt={currentTab.title}
            className="w-full md:max-h-[534px] max-h-[300px] object-cover rounded-[12px] md:mt-[40px] mt-8"
          />
        </div>

        {/* Right: Form - 50% */}
        <div className="lg:w-1/2 md:px-[48px] py-8 rounded-[16px] md:border border-[#e5e5e5]/50">
          <div className="">
            <h3 className="text-[24px] font-semibold text-[#211F1F] mb-2">{currentTab.formTitle}</h3>
            <p className="text-[14px] text-[#211F1F] mb-10">{currentTab.formDescription}</p>

            <form onSubmit={handleSubmit}>
              {/* Baptism Form */}
              {currentTab.id === "baptism" && (
                <>
                  <FormInput name="fullName" label="Full Name" type="text" required />
                  <FormInput name="email" label="Email" type="email" required />
                  <FormInput name="phone" label="Phone Number" type="tel" required />
                  <FormSelect
                    name="gender"
                    label="Gender"
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" }
                    ]}
                    required
                  />
                  <FormInput name="age" label="Age" type="number" required />
                  <FormSelect
                    name="attendsBranch"
                    label="Do you attend a branch?"
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" }
                    ]}
                    onChange={(e) => setAttendsBranch(e.target.value)}
                    required
                  />
                  {attendsBranch === "yes" && (
                    <FormInput name="branchName" label="Name of Branch" type="text" required />
                  )}
                  <FormSelect
                    name="baptismClasses"
                    label="Will you be available to join baptism classes?"
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" }
                    ]}
                    required
                  />
                  <FormSelect
                    name="preferredContact"
                    label="Preferred Mode of Contact"
                    options={[
                      { value: "email", label: "Email" },
                      { value: "phone", label: "Phone" },
                      { value: "whatsapp", label: "WhatsApp" }
                    ]}
                    required
                  />
                  <FormTextarea
                    name="why"
                    label="Why do you want to be baptized? (Optional)"
                  />
                </>
              )}

              {/* Counselling Form */}
              {currentTab.id === "counselling" && (
                <>
                  <FormInput name="fullName" label="Full Name" type="text" required />
                  <FormInput name="email" label="Email" type="email" required />
                  <FormInput name="phone" label="Phone Number" type="tel" required />
                  <FormSelect
                    name="preferredContact"
                    label="Preferred Mode of Contact"
                    options={[
                      { value: "email", label: "Email" },
                      { value: "phone", label: "Phone" },
                      { value: "whatsapp", label: "WhatsApp" }
                    ]}
                    required
                  />
                  <FormSelect
                    name="attendsBranch"
                    label="Do you attend a branch?"
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" }
                    ]}
                    onChange={(e) => setAttendsBranch(e.target.value)}
                    required
                  />
                  {attendsBranch === "yes" && (
                    <FormInput name="branchName" label="Name of Branch" type="text" required />
                  )}
                  <FormSelect
                    name="hasMentorshipGroup"
                    label="Do you currently have a mentorship group?"
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" }
                    ]}
                    onChange={(e) => setAttendsGroup(e.target.value)}
                    required
                  />
                  {attendsGroup === "yes" && (
                    <FormInput name="groupName" label="Name of Group" type="text" required />
                  )}
                  <FormSelect
                    name="counsellingType"
                    label="What kind of counselling are you requesting?"
                    options={[
                      { value: "spiritual", label: "Spiritual Guidance" },
                      { value: "relationship", label: "Relationship" },
                      { value: "grief", label: "Grief & Loss" },
                      { value: "anxiety", label: "Anxiety & Stress" },
                      { value: "other", label: "Other" }
                    ]}
                    required
                  />
                  <FormSelect
                    name="urgencyLevel"
                    label="How urgent is this request?"
                    options={[
                      { value: "immediate", label: "Immediate (within 24 hours)" },
                      { value: "week", label: "Within a week" },
                      { value: "flexible", label: "Flexible timing" }
                    ]}
                    required
                  />
                  <FormTextarea name="message" label="Please share what you'd like help with" required />
                  <FormTextarea name="additionalNotes" label="Additional Notes (Optional)" />
                </>
              )}

              {/* Mentorship Form */}
              {currentTab.id === "mentorship" && (
                <>
                  <FormInput name="fullName" label="Full Name" type="text" required />
                  <FormInput name="email" label="Email" type="email" required />
                  <FormInput name="phone" label="Phone Number" type="tel" required />
                  <FormSelect
                    name="gender"
                    label="Gender"
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" }
                    ]}
                    required
                  />
                  <FormInput name="age" label="Age" type="number" required />
                  <FormSelect
                    name="newToChurch"
                    label="Are you new to the church?"
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" }
                    ]}
                    required
                  />
                  <FormSelect
                    name="attendsBranch"
                    label="Do you attend a branch?"
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" }
                    ]}
                    onChange={(e) => setAttendsBranch(e.target.value)}
                    required
                  />
                  {attendsBranch === "yes" && (
                    <FormInput name="branchName" label="Name of Branch" type="text" required />
                  )}

                  <FormTextarea name="additionalNotes" label="Anything you would like us to know or consider? (optional)" />
                </>
              )}

              {/* Serve Form */}
              {currentTab.id === "serve" && (
                <>
                  <FormInput name="fullName" label="Full Name" type="text" required />
                  <FormInput name="email" label="Email" type="email" required />
                  <FormInput name="phone" label="Phone Number" type="tel" required />
                  <FormInput name="age" label="Age" type="number" required />
                  <FormSelect
                    name="attendsBranch"
                    label="Do you attend a branch?"
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" }
                    ]}
                    onChange={(e) => setAttendsBranch(e.target.value)}
                    required
                  />
                  {attendsBranch === "yes" && (
                    <FormInput name="branchName" label="Name of Branch" type="text" required />
                  )}

                  <FormSelect
                    name="areasOfInterest"
                    label="Areas of Interest"
                    options={[
                      { value: "worship", label: "Worship & Music" },
                      { value: "hospitality", label: "Hospitality" },
                      { value: "children", label: "Children's Ministry" },
                      { value: "youth", label: "Youth Ministry" },
                      { value: "media", label: "Media & Tech" },
                      { value: "outreach", label: "Outreach & Evangelism" },
                      { value: "admin", label: "Administration" },
                      { value: "other", label: "Other" }
                    ]}
                    required
                  />
                  <FormTextarea name="skillsExperience" label="What skills or experience would you like to share? (Optional)" />
                  <FormSelect
                    name="preferredContact"
                    label="Preferred Mode of Contact"
                    options={[
                      { value: "email", label: "Email" },
                      { value: "phone", label: "Phone" },
                      { value: "whatsapp", label: "WhatsApp" }
                    ]}
                    required
                  />
                  <FormTextarea name="additionalNotes" label="Anything you'd like us to know or consider? (Optional)" />
                </>
              )}

              {/* Testimonies Form */}
              {currentTab.id === "testimonies" && (
                <>
                  <FormInput name="fullName" label="Full Name" type="text" required />
                  <FormInput name="email" label="Email" type="email" required />
                  <FormInput name="phone" label="Phone Number" type="tel" required />
                  <FormInput name="age" label="Age" type="number" required />
                  <FormSelect
                    name="preferredContact"
                    label="Preferred Mode of Contact"
                    options={[
                      { value: "email", label: "Email" },
                      { value: "phone", label: "Phone" },
                      { value: "whatsapp", label: "WhatsApp" }
                    ]}
                    required
                  />
                  <FormSelect
                    name="testimonyCategory"
                    label="What best describes your testimony?"
                    options={[
                      { value: "salvation", label: "Salvation" },
                      { value: "healing", label: "Healing" },
                      { value: "provision", label: "Provision & Breakthrough" },
                      { value: "deliverance", label: "Deliverance" },
                      { value: "answered-prayer", label: "Answered Prayer" },
                      { value: "other", label: "Other" }
                    ]}
                    required
                  />
                  <FormSelect
                    name="attendsBranch"
                    label="Do you attend a branch?"
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" }
                    ]}
                    onChange={(e) => setAttendsBranch(e.target.value)}
                    required
                  />
                  {attendsBranch === "yes" && (
                    <FormInput name="branchName" label="Name of Branch" type="text" required />
                  )}
                  <FormSelect
                    name="sharePublicly"
                    label="Would you be happy for your story to be shared publicly?"
                    options={[
                      { value: "yes", label: "Yes, I'm happy to share publicly" },
                      { value: "anonymous", label: "Yes, but keep my identity anonymous" },
                      { value: "no", label: "No, keep it private" }
                    ]}
                    required
                  />
                  <FormTextarea name="testimony" label="Tell us your testimony" required />
                  <div className="flex gap-2 mt-5">
                    <Info className="size-5 text-[#4469B0] shrink-0 mt-0.5" />
                    <p className="text-[14px] text-[#304A7B]">
                      Our team may reach out to you if we would like to celebrate your story with the wider church family
                    </p>
                  </div>
                </>
              )}

              {/* Prayer Request Form */}
              {currentTab.id === "prayer" && (
                <>
                  <FormInput name="firstName" label="First Name" type="text" required />
                  <FormInput name="surname" label="Surname" type="text" required />
                  <FormInput name="email" label="Email" type="email" required />
                  <FormInput name="phone" label="Phone Number" type="tel" required />
                  <FormSelect
                    name="preferredContact"
                    label="Preferred Mode of Contact"
                    options={[
                      { value: "email", label: "Email" },
                      { value: "phone", label: "Phone" },
                      { value: "whatsapp", label: "WhatsApp" }
                    ]}
                    required
                  />
                  <FormTextarea name="prayerRequest" label="Prayer Request" required />
                  <FormSelect
                    name="prayWithYou"
                    label="Would you like someone to pray with you?"
                    options={[
                      { value: "yes", label: "Yes, please" },
                      { value: "no", label: "No, just prayer coverage" }
                    ]}
                    required
                  />
                </>
              )}

              <ChhButton type="submit" disabled={isSubmitting} className="w-full bg-primary text-white hover:bg-primary/90 h-[57px] rounded-[12px] mt-5">
                {isSubmitting ? 'Submitting...' : currentTab.submitText}
              </ChhButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { ArrowLeft, Check } from "lucide-react";
import { PermissionCheckbox } from "@/components/common/PermissionCheckbox";
import { SubmissionSuccessModal } from "@/components/common/SubmissionSuccessModal";

export default function ChildrenRegisterPage() {
 const router = useRouter();
 const [currentStep, setCurrentStep] = useState(1);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

 // Step 1: Child's Details
 const [childFullName, setChildFullName] = useState("");
 const [childDOB, setChildDOB] = useState("");
 const [childAge, setChildAge] = useState("");
 const [childGender, setChildGender] = useState("");

 // Step 2: Parent/Guardian Details
 const [parentFullName, setParentFullName] = useState("");
 const [relationship, setRelationship] = useState("");
 const [phoneNumber, setPhoneNumber] = useState("");
 const [email, setEmail] = useState("");
 const [emergencyContactName, setEmergencyContactName] = useState("");
 const [emergencyContactNumber, setEmergencyContactNumber] = useState("");

 // Step 3: Medical Information
 const [allergies, setAllergies] = useState("");
 const [medicalConditions, setMedicalConditions] = useState("");
 const [medications, setMedications] = useState("");
 const [doctorName, setDoctorName] = useState("");
 const [doctorContact, setDoctorContact] = useState("");

 // Step 4: Permissions & Consent
 const [permissionActivities, setPermissionActivities] = useState(false);
 const [permissionPhotos, setPermissionPhotos] = useState(false);
 const [permissionSnacks, setPermissionSnacks] = useState(false);
 const [permissionMedical, setPermissionMedical] = useState(false);
 const [signature, setSignature] = useState("");
 const [signatureDate, setSignatureDate] = useState("");

 useEffect(() => {
  if (childDOB) {
   const today = new Date();
   const birthDate = new Date(childDOB);
   let age = today.getFullYear() - birthDate.getFullYear();
   const m = today.getMonth() - birthDate.getMonth();
   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
   }
   setChildAge(Math.max(0, age).toString());
  } else {
   setChildAge("");
  }
 }, [childDOB]);

 const steps = [
  { number: 1, title: "Child's Details" },
  { number: 2, title: "Parent/Guardian Details" },
  { number: 3, title: "Medical Information" },
  { number: 4, title: "Permissions & Consent" }
 ];

 const isStep1Valid = childFullName && childDOB && childAge && childGender;
 const isStep2Valid = parentFullName && relationship && phoneNumber && email && emergencyContactName && emergencyContactNumber;
 const isStep3Valid = allergies && medicalConditions && medications && doctorName && doctorContact;
 const isStep4Valid = permissionActivities && permissionPhotos && permissionSnacks && permissionMedical && signature && signatureDate;

 const canContinue = () => {
  if (currentStep === 1) return isStep1Valid;
  if (currentStep === 2) return isStep2Valid;
  if (currentStep === 3) return isStep3Valid;
  if (currentStep === 4) return isStep4Valid;
  return false;
 };

 const handleContinue = () => {
  if (currentStep < 4) {
   setCurrentStep(currentStep + 1);
  }
 };

 const handleSubmit = async () => {
  setIsSubmitting(true);

  const formData = {
   childFullName,
   childDOB,
   childAge,
   childGender,
   parentFullName,
   relationship,
   phoneNumber,
   email,
   emergencyContactName,
   emergencyContactNumber,
   allergies,
   medicalConditions,
   medications,
   doctorName,
   doctorContact,
   permissionActivities,
   permissionPhotos,
   permissionSnacks,
   permissionMedical,
   signature,
   signatureDate
  };

  try {
   const response = await fetch('/api/submissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
     form_type: 'children_register',
     data: formData
    }),
   });

   if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Submission failed');
   }

   // toast.success('Registration submitted successfully! We will contact you soon.');
   // router.push('/ministries/children');
   setIsSuccessModalOpen(true);
  } catch (error: any) {
   console.error('Error:', error);
   toast.error(error.message || 'Failed to submit registration. Please try again.');
  } finally {
   setIsSubmitting(false);
  }
 };

 return (
  <div className="w-full min-h-screen bg-white font-sans">
   <div className="container w-11/12 mx-auto px-4 py-18">
    {/* Header with Back Button and Title */}
    <div className="relative mb-18">
     <button
      onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : router.back()}
      className="absolute left-0 top-[15%] flex items-center gap-2 text-primary hover:underline"
     >

      <div className="rounded-lg border-[0.5px] border-black p-1 ">
       <ArrowLeft className="size-5 " />
      </div>
      <span>Back</span>
     </button>
     <h1 className="text-[32px] font-bold text-center" style={{ color: "#111111" }}>
      RPF Children's Ministry Preregistration Form
     </h1>
    </div>

    {/* Progress Indicator */}
    <div className="flex items-center justify-center mb-16">
     {steps.map((step, index) => (
      <div key={step.number} className="flex items-center">
       {/* Step Container with absolute title */}
       <div className="relative flex items-center">
        {/* Step Circle */}
        <div
         className="relative flex items-center justify-center"
         style={{
          width: "24px",
          height: "24px"
         }}
        >
         {/* Step Title - Absolutely Positioned */}
         <span
          className="absolute text-sm font-medium whitespace-nowrap"
          style={{
           color: step.number <= currentStep ? "#59427B" : "#E5E5E5",
           top: "-32px",
           left: "50%",
           transform: "translateX(-50%)"
          }}
         >
          {step.title}
         </span>

         {/* Completed step - show checkmark with solid circle */}
         {step.number < currentStep ? (
          <div
           className="flex items-center justify-center"
           style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            backgroundColor: "#59427B"
           }}
          >
           <Check className="size-3 text-white" strokeWidth={3} />
          </div>
         ) : (
          /* Active or inactive step - show nested circles */
          <>
           {/* Outer circle */}
           <div
            style={{
             width: "24px",
             height: "24px",
             borderRadius: "50%",
             backgroundColor: step.number === currentStep ? "#59427B" : "#E5E5E5",
             display: "flex",
             alignItems: "center",
             justifyContent: "center"
            }}
           >
            {/* Inner white circle */}
            <div
             style={{
              width: "11px",
              height: "11px",
              borderRadius: "50%",
              backgroundColor: "white"
             }}
            />
           </div>
          </>
         )}
        </div>

        {/* Connecting Line - extends to touch both circles */}
        {index < steps.length - 1 && (
         <div
          style={{
           width: "250px",
           height: "2px",
           backgroundColor: step.number < currentStep ? "#59427B" : "#E5E5E5"
          }}
         />
        )}
       </div>
      </div>
     ))}
    </div>

    {/* Form Section */}
    <div className="max-w-[800px] mx-auto">
     {/* Step 1: Child's Details */}
     {currentStep === 1 && (
      <div>
       <div className="text-center mb-12">
        <h2 className="text-[32px] font-bold mb-3" style={{ color: "#111111" }}>
         About Your Child
        </h2>
        <p className="text-[18px]" style={{ color: "#373737" }}>
         Tell us a bit about your child so we can prepare to welcome them.
        </p>
       </div>

       <div className="space-y-6">
        <div>
         <label className="block text-[16px] font-medium mb-2" style={{ color: "#373737" }}>
          Full Name *
         </label>
         <input
          type="text"
          value={childFullName}
          onChange={(e) => setChildFullName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          placeholder="Enter child's full name"
         />
        </div>

        <div>
         <label className="block text-[16px] font-medium mb-2" style={{ color: "#373737" }}>
          Date of Birth *
         </label>
         <input
          type="date"
          value={childDOB}
          onChange={(e) => setChildDOB(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
         />
        </div>

        <div>
         <label className="block text-[16px] font-medium mb-2" style={{ color: "#373737" }}>
          Age *
         </label>
         <input
          type="number"
          value={childAge}
          onChange={(e) => setChildAge(e.target.value)}
          disabled
          readOnly
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-gray-100 cursor-not-allowed"
          placeholder="Age will be calculated automatically"
         />
        </div>

        <div>
         <label className="block text-[16px] font-medium mb-3" style={{ color: "#373737" }}>
          Gender *
         </label>
         <div className="flex gap-6">
          {["Male", "Female"].map((gender) => (
           <label key={gender} className="flex items-center gap-3 cursor-pointer">
            <div
             className="relative flex items-center justify-center"
             style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              border: `2px solid ${childGender === gender ? "#59427B" : "#E5E5E5"}`
             }}
             onClick={() => setChildGender(gender)}
            >
             {childGender === gender && (
              <div
               style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#59427B"
               }}
              />
             )}
            </div>
            <span className="text-[16px]" style={{ color: "#373737" }}>
             {gender}
            </span>
           </label>
          ))}
         </div>
        </div>
       </div>
      </div>
     )}

     {/* Step 2: Parent/Guardian Details */}
     {currentStep === 2 && (
      <div>
       <div className="text-center mb-12">
        <h2 className="text-[32px] font-bold mb-3" style={{ color: "#111111" }}>
         Parent / Guardian Details
        </h2>
        <p className="text-[18px]" style={{ color: "#373737" }}>
         We'd love to know how to reach you if needed.
        </p>
       </div>

       <div className="space-y-6">
        <div>
         <label className="block text-[16px] font-medium mb-2" style={{ color: "#373737" }}>
          Full Name *
         </label>
         <input
          type="text"
          value={parentFullName}
          onChange={(e) => setParentFullName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          placeholder="Enter your full name"
         />
        </div>

        <div>
         <label className="block text-[16px] font-medium mb-2" style={{ color: "#373737" }}>
          Relationship to Child *
         </label>
         <input
          type="text"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          placeholder="e.g., Mother, Father, Guardian"
         />
        </div>

        <div>
         <label className="block text-[16px] font-medium mb-2" style={{ color: "#373737" }}>
          Phone Number *
         </label>
         <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          placeholder="Enter phone number"
         />
        </div>

        <div>
         <label className="block text-[16px] font-medium mb-2" style={{ color: "#373737" }}>
          Email Address *
         </label>
         <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          placeholder="Enter email address"
         />
        </div>

        <div>
         <label className="block text-[16px] font-medium mb-2" style={{ color: "#373737" }}>
          Emergency Contact Name *
         </label>
         <input
          type="text"
          value={emergencyContactName}
          onChange={(e) => setEmergencyContactName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          placeholder="Enter emergency contact name"
         />
        </div>

        <div>
         <label className="block text-[16px] font-medium mb-2" style={{ color: "#373737" }}>
          Emergency Contact Number *
         </label>
         <input
          type="tel"
          value={emergencyContactNumber}
          onChange={(e) => setEmergencyContactNumber(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          placeholder="Enter emergency contact number"
         />
        </div>
       </div>
      </div>
     )}

     {/* Step 3: Medical Information */}
     {currentStep === 3 && (
      <div>
       <div className="text-center mb-12">
        <h2 className="text-[32px] font-bold mb-3" style={{ color: "#111111" }}>
         Medical Information
        </h2>
        <p className="text-[18px]" style={{ color: "#373737" }}>
         Tell us a bit about your child so we can prepare to welcome them.
        </p>
       </div>

       <div className="space-y-6">
        <div>
         <label className="block text-[16px] font-medium mb-2" style={{ color: "#373737" }}>
          Allergies (food, medication, environment, etc.) *
         </label>
         <textarea
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          placeholder="Enter any allergies"
          rows={3}
         />
        </div>

        <div>
         <label className="block text-[16px] font-medium mb-2" style={{ color: "#373737" }}>
          Medical Conditions / Special Needs *
         </label>
         <textarea
          value={medicalConditions}
          onChange={(e) => setMedicalConditions(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          placeholder="Enter any medical conditions or special needs"
          rows={3}
         />
        </div>

        <div>
         <label className="block text-[16px] font-medium mb-2" style={{ color: "#373737" }}>
          Medications (currently taking) *
         </label>
         <textarea
          value={medications}
          onChange={(e) => setMedications(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          placeholder="Enter current medications"
          rows={3}
         />
        </div>
       </div>
      </div>
     )}

     {/* Step 4: Permissions & Consent */}
     {currentStep === 4 && (
      <div>
       <div className="text-center mb-12">
        <h2 className="text-[32px] font-bold mb-3" style={{ color: "#111111" }}>
         Permissions & Consent
        </h2>
        <p className="text-[18px]" style={{ color: "#373737" }}>
         Please review and confirm the permissions below.
        </p>
       </div>

       <div className="space-y-6 mb-10">
        <PermissionCheckbox
         title="Permission to Participate in Activities"
         label="I give permission for my child to participate in all Children's Department activities."
         checked={permissionActivities}
         onChange={setPermissionActivities}
        />

        <PermissionCheckbox
         title="Permission to Take Photos/Videos"
         label="I give permission for my child to be photographed or recorded for church publications, social media, or promotional materials."
         checked={permissionPhotos}
         onChange={setPermissionPhotos}
        />

        <PermissionCheckbox
         title="Permission to Provide Snacks, Food & Drinks"
         label="I give permission for my child to receive snacks, food, and drinks provided by the church."
         checked={permissionSnacks}
         onChange={setPermissionSnacks}
        />

        <PermissionCheckbox
         title="Permission for Emergency Medical Treatment"
         label="I authorize RPF staff to seek medical treatment for my child in case of an emergency if I cannot be reached"
         checked={permissionMedical}
         onChange={setPermissionMedical}
        />
       </div>

       {/* Signature Section */}
       <div className="mb-8">
        <h3 className="text-[20px] font-semibold mb-4" style={{ color: "#373737" }}>
         Additional Information / Special Instructions
        </h3>
        <div className="grid grid-cols-2 gap-8">
         <div>
          <label className="block text-[16px] mb-3" style={{ color: "#373737" }}>
           Parent/Guardian Signature
          </label>
          <input
           type="text"
           value={signature}
           onChange={(e) => setSignature(e.target.value)}
           className="w-full pb-2 border-b border-gray-300 focus:outline-none focus:border-primary"
           style={{ fontSize: "16px", color: "#373737" }}
           placeholder=""
          />
         </div>
         <div>
          <label className="block text-[16px] mb-3" style={{ color: "#373737" }}>
           Date
          </label>
          <input
           type="date"
           value={signatureDate}
           onChange={(e) => setSignatureDate(e.target.value)}
           className="w-full pb-2 border-b border-gray-300 focus:outline-none focus:border-primary"
           style={{ fontSize: "16px", color: "#373737" }}
          />
         </div>
        </div>
       </div>
      </div>
     )}

     {/* Action Button */}
     <div className="mt-12 flex justify-center">
      {currentStep < 4 ? (
       <button
        onClick={handleContinue}
        disabled={!canContinue()}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold h-14 px-12 text-[18px] rounded-lg transition-colors"
       >
        Continue
       </button>
      ) : (
       <button
        onClick={handleSubmit}
        disabled={!canContinue() || isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold h-14 px-12 text-[18px] rounded-lg transition-colors"
       >
        {isSubmitting ? 'Submitting...' : 'Submit'}
       </button>
      )}
     </div>
    </div>
    <SubmissionSuccessModal
     isOpen={isSuccessModalOpen}
     onClose={() => {
      setIsSuccessModalOpen(false);
      router.push('/ministries/children');
     }}
     title="Registration Received"
     message="Thank you for registering your child with RPF Children's Ministry. We have received your details and look forward to welcoming you."
    />
   </div>
  </div>
 );
}

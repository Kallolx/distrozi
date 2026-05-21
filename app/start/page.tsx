"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  RiUser3Line,
  RiMusic2Line,
  RiBankCardLine,
  RiCheckboxCircleLine,
  RiArrowRightLine,
  RiArrowLeftLine,
  RiUploadCloud2Line,
  RiCloseLine,
  RiFileTextLine,
  RiAlertLine,
  RiPaypalLine,
  RiBankLine,
  RiCoinsLine,
  RiExchangeFundsLine,
  RiWallet3Line,
} from "react-icons/ri";


import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";

// Onboarding steps enum
type Step = 1 | 2 | 3 | 4;

interface FormState {
  // Step 1: Personal Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  idMethod: "National ID" | "Driving Licence" | "Passport" | "";
  idNumber: string;
  state: string;
  country: string;
  idFile: File | null;

  // Step 2: Professional Info
  professionalRole: "Artist" | "Label" | "Manager" | "Sub-distributor" | "";
  artistName: string;
  genre: string;
  currentDistributor: "DistroKid" | "CD Baby" | "TuneCore" | "Believe" | "Amuse" | "Other" | "";
  reasonForLeaving: string;
  tracksReleased: string;
  monthlyListeners: string;

  // Step 3: Social & Payout Details
  payoutMethod: "PayPal" | "Bank Transfer (ACH/Wire)" | "Payoneer" | "Stripe" | "Crypto (USDT/USDC)" | "";
  paypalEmail: string;
  payoneerEmail: string;
  stripeAccountId: string;
  cryptoWalletAddress: string;
  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankRoutingNumber: string;
  facebookUrl: string;
  youtubeChannelId: string;
  spotifyArtistUrl: string;

  // Step 4: Terms
  agreedToTerms: boolean;
  agreedToAccuracy: boolean;
}

const initialFormState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  idMethod: "",
  idNumber: "",
  state: "",
  country: "",
  idFile: null,
  professionalRole: "",
  artistName: "",
  genre: "",
  currentDistributor: "",
  reasonForLeaving: "",
  tracksReleased: "",
  monthlyListeners: "",
  payoutMethod: "",
  paypalEmail: "",
  payoneerEmail: "",
  stripeAccountId: "",
  cryptoWalletAddress: "",
  bankName: "",
  bankAccountName: "",
  bankAccountNumber: "",
  bankRoutingNumber: "",
  facebookUrl: "",
  youtubeChannelId: "",
  spotifyArtistUrl: "",
  agreedToTerms: false,
  agreedToAccuracy: false,
};

export default function StartOnboarding() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Field change handlers
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm((prev) => ({ ...prev, idFile: file }));
      if (errors.idFile) {
        setErrors((prev) => ({ ...prev, idFile: "" }));
      }
    }
  };

  const removeUploadedFile = () => {
    setForm((prev) => ({ ...prev, idFile: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Step Navigations & Form validations
  const validateStep = (step: Step): boolean => {
    const stepErrors: Record<string, string> = {};

    if (step === 1) {
      if (!form.firstName.trim()) stepErrors.firstName = "Required";
      if (!form.lastName.trim()) stepErrors.lastName = "Required";
      if (!form.email.trim()) {
        stepErrors.email = "Required";
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        stepErrors.email = "Invalid email";
      }
      if (!form.phone.trim()) stepErrors.phone = "Required";
      if (!form.dob) stepErrors.dob = "Required";
      if (!form.idMethod) stepErrors.idMethod = "Required";
      if (!form.idNumber.trim()) stepErrors.idNumber = "Required";
      if (!form.state.trim()) stepErrors.state = "Required";
      if (!form.country.trim()) stepErrors.country = "Required";
      if (!form.idFile) stepErrors.idFile = "ID document file required";
    }

    if (step === 2) {
      if (!form.professionalRole) stepErrors.professionalRole = "Required";
      if (!form.artistName.trim()) stepErrors.artistName = "Required";
      if (!form.genre) stepErrors.genre = "Required";
      if (!form.currentDistributor) stepErrors.currentDistributor = "Required";
      if (!form.tracksReleased.trim()) stepErrors.tracksReleased = "Required";
      if (!form.monthlyListeners.trim()) stepErrors.monthlyListeners = "Required";
    }

    if (step === 3) {
      if (!form.payoutMethod) stepErrors.payoutMethod = "Required";
      
      if (form.payoutMethod === "PayPal" && !form.paypalEmail.trim()) {
        stepErrors.paypalEmail = "Required";
      } else if (form.payoutMethod === "PayPal" && !/\S+@\S+\.\S+/.test(form.paypalEmail)) {
        stepErrors.paypalEmail = "Invalid email";
      }

      if (form.payoutMethod === "Payoneer" && !form.payoneerEmail.trim()) {
        stepErrors.payoneerEmail = "Required";
      } else if (form.payoutMethod === "Payoneer" && !/\S+@\S+\.\S+/.test(form.payoneerEmail)) {
        stepErrors.payoneerEmail = "Invalid email";
      }

      if (form.payoutMethod === "Stripe" && !form.stripeAccountId.trim()) {
        stepErrors.stripeAccountId = "Required";
      }

      if (form.payoutMethod === "Crypto (USDT/USDC)" && !form.cryptoWalletAddress.trim()) {
        stepErrors.cryptoWalletAddress = "Required";
      }

      if (form.payoutMethod === "Bank Transfer (ACH/Wire)") {
        if (!form.bankName.trim()) stepErrors.bankName = "Required";
        if (!form.bankAccountName.trim()) stepErrors.bankAccountName = "Required";
        if (!form.bankAccountNumber.trim()) stepErrors.bankAccountNumber = "Required";
        if (!form.bankRoutingNumber.trim()) stepErrors.bankRoutingNumber = "Required";
      }
    }

    if (step === 4) {
      if (!form.agreedToTerms) stepErrors.agreedToTerms = "Consent required";
      if (!form.agreedToAccuracy) stepErrors.agreedToAccuracy = "Consent required";
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => (prev + 1) as Step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => (prev - 1) as Step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(4)) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 2000);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#f5f5f5] overflow-x-hidden font-sans pb-0">
      {/* Global Fixed Background (Solid Black) */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]" />
      
      <Navbar />

      {/* Immersive Cinematic High-Impact Header Banner - 100% Visible Video, Line-Free */}
      <div className="relative w-full h-[60vh] min-h-[400px] sm:min-h-[500px] overflow-hidden bg-black z-10">
        <video
          src="/start.webm"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-100 z-0"
        />
        {/* Video overlay ONLY from bottom to top: black to transparent */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
      </div>

      <div className="relative z-20 flex flex-col items-center w-full pb-6 px-6 lg:px-8 -mt-20 sm:-mt-28 md:-mt-36">
        
        {/* Success / Final Submission Screen */}
        {isSubmitted ? (
          <div className="w-full max-w-2xl rounded-[36px] bg-[#080808]/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 text-center shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] animate-fade-in relative overflow-hidden">
            <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/5 text-primary mb-6 animate-pulse shadow-[0_0_32px_rgba(243,195,67,0.25)]">
              <RiCheckboxCircleLine size={44} />
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 uppercase font-outfit">
              Application Transmitted
            </h1>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto mb-6">
              Your credentials and royalty payout pathways have been validated. We are initializing your backstage ingestion key and preparing your global catalog ingestion routes. Check your email for direct access portals.
            </p>

            <div className="max-w-md mx-auto rounded-3xl bg-white/[0.02] p-4 sm:p-6 mb-6 text-left text-xs flex flex-col gap-4">
              <div className="text-primary text-[11px] font-medium tracking-widest uppercase pb-2.5 flex items-center justify-between">
                <span>Receipt Summary</span>
                <span className="text-neutral-500">SYS_OK // INGESTION_PENDING</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-neutral-500">Applicant:</span>
                <span className="text-white font-medium">{form.firstName} {form.lastName}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-neutral-500">Artist Alias:</span>
                <span className="text-white font-medium">{form.artistName || "N/A"}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-neutral-500">Primary Genre:</span>
                <span className="text-white font-medium">{form.genre || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Payout Mode:</span>
                <span className="text-primary font-medium">{form.payoutMethod}</span>
              </div>
            </div>

            <a
              href="/"
              className="inline-flex h-14 items-center justify-center rounded-2xl px-12 text-base font-medium bg-primary text-black hover:bg-[#f7d26e] hover:scale-[1.03] transition-all duration-300 shadow-[0_0_24px_rgba(243,195,67,0.3)] cursor-pointer"
            >
              Return Home
            </a>
          </div>
        ) : (
          <div className="w-full max-w-4xl relative">
            {/* Clean, Spacious Widescreen Form Panel with Stepper inside */}
            <form
              onSubmit={handleSubmit}
              className="w-full rounded-[36px] bg-[#080808]/90 backdrop-blur-3xl border border-white/10 pt-6 pb-6 px-6 sm:px-10 md:px-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col gap-6 z-10 text-left relative overflow-hidden"
            >

              {/* Form Landing Section Title with Gradient Text */}
              <div className="text-center w-full z-10 pt-4 pb-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.15] font-sans">
                  Start your <br /> <span className="bg-gradient-to-r from-[#3b82f6] via-[#ec4899] to-[#facc15] bg-clip-text text-transparent font-semibold">global distribution</span>
                </h1>
              </div>

              {/* Clean, Simple, Line-Free Stepper Capsules (Inside Form) */}
              <div className="w-full flex justify-center z-10 mb-2">
                <div className="flex flex-wrap gap-2.5 justify-center">
                  {[
                    { step: 1, label: "Personal Details", icon: RiUser3Line },
                    { step: 2, label: "Professional Details", icon: RiMusic2Line },
                    { step: 3, label: "Payout & Socials", icon: RiBankCardLine },
                    { step: 4, label: "Terms & Submission", icon: RiCheckboxCircleLine },
                  ].map((item) => {
                    const isActive = currentStep === item.step;
                    const isCompleted = currentStep > item.step;
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.step}
                        type="button"
                        disabled={!isCompleted && currentStep !== item.step}
                        onClick={() => setCurrentStep(item.step as Step)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 select-none ${
                          isActive
                            ? "bg-primary text-black shadow-[0_4px_20px_rgba(243,195,67,0.3)] scale-[1.02]"
                            : isCompleted
                            ? "bg-primary/10 text-primary cursor-pointer hover:bg-primary/20 hover:scale-[1.01]"
                            : "bg-white/[0.02] text-neutral-500 cursor-not-allowed"
                        }`}
                      >
                        <Icon size={15} className="shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Step Header at the Middle (No Step Numbers) */}
              <div className="w-full text-center z-10 pt-2 pb-1 select-none animate-fade-in">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-outfit uppercase">
                  {currentStep === 1 && "Personal Details"}
                  {currentStep === 2 && "Professional Details"}
                  {currentStep === 3 && "Payout & Socials"}
                  {currentStep === 4 && "Terms & Submission"}
                </h2>
              </div>

              {/* STEP 1: PERSONAL INFORMATION */}
              {currentStep === 1 && (
                <div className="flex flex-col gap-6 animate-fade-in">


                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* First Name */}
                    <div className="flex flex-col">
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleTextChange}
                        placeholder="First Name"
                        className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300"
                        required
                      />
                      {errors.firstName && <span className="text-[11px] text-red-500 mt-1">{errors.firstName}</span>}
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col">
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleTextChange}
                        placeholder="Last Name"
                        className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300"
                        required
                      />
                      {errors.lastName && <span className="text-[11px] text-red-500 mt-1">{errors.lastName}</span>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleTextChange}
                        placeholder="Email Address"
                        className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300"
                        required
                      />
                      {errors.email && <span className="text-[11px] text-red-500 mt-1">{errors.email}</span>}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col">
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleTextChange}
                        placeholder="Phone Number"
                        className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300"
                        required
                      />
                      {errors.phone && <span className="text-[11px] text-red-500 mt-1">{errors.phone}</span>}
                    </div>

                    {/* Date of Birth */}
                    <div className="flex flex-col">
                      <input
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleTextChange}
                        placeholder="Date of Birth"
                        className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white outline-none transition-all duration-300"
                        required
                        style={{ colorScheme: "dark" }}
                      />
                      {errors.dob && <span className="text-[11px] text-red-500 mt-1">{errors.dob}</span>}
                    </div>

                    {/* ID Method */}
                    <div className="flex flex-col">
                      <select
                        name="idMethod"
                        value={form.idMethod}
                        onChange={handleSelectChange}
                        className="w-full bg-[#0d0d0d] hover:bg-[#151515] focus:bg-[#1a1a1a] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white outline-none transition-all duration-300 cursor-pointer"
                        required
                        style={{ colorScheme: "dark" }}
                      >
                        <option value="" disabled hidden className="bg-[#0c0c0c] text-neutral-400">Select Identification Method</option>
                        <option value="National ID" className="bg-[#0c0c0c] text-white">National ID Card</option>
                        <option value="Driving Licence" className="bg-[#0c0c0c] text-white">Driver's License</option>
                        <option value="Passport" className="bg-[#0c0c0c] text-white">Passport Document</option>
                      </select>
                      {errors.idMethod && <span className="text-[11px] text-red-500 mt-1">{errors.idMethod}</span>}
                    </div>

                    {/* ID Number */}
                    <div className="flex flex-col">
                      <input
                        type="text"
                        name="idNumber"
                        value={form.idNumber}
                        onChange={handleTextChange}
                        placeholder={form.idMethod ? `${form.idMethod} Number` : "Select Identification Method First"}
                        className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                        required
                        disabled={!form.idMethod}
                      />
                      {errors.idNumber && <span className="text-[11px] text-red-500 mt-1">{errors.idNumber}</span>}
                    </div>

                    {/* State */}
                    <div className="flex flex-col">
                      <input
                        type="text"
                        name="state"
                        value={form.state}
                        onChange={handleTextChange}
                        placeholder="State / Province"
                        className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300"
                        required
                      />
                      {errors.state && <span className="text-[11px] text-red-500 mt-1">{errors.state}</span>}
                    </div>

                    {/* Country */}
                    <div className="flex flex-col sm:col-span-2">
                      <input
                        type="text"
                        name="country"
                        value={form.country}
                        onChange={handleTextChange}
                        placeholder="Country of Residence"
                        className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300"
                        required
                      />
                      {errors.country && <span className="text-[11px] text-red-500 mt-1">{errors.country}</span>}
                    </div>
                  </div>

                  {/* ID Uploader Box */}
                  <div className="flex flex-col mt-2">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`rounded-[24px] p-10 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-4 group ${
                        form.idFile 
                          ? "bg-primary/[0.04]" 
                          : errors.idFile 
                          ? "bg-red-500/[0.04]" 
                          : "bg-white/[0.02] hover:bg-white/[0.04]"
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png,.pdf"
                        className="hidden"
                      />

                      {form.idFile ? (
                        <div className="flex items-center justify-between bg-white/[0.02] rounded-2xl p-5 text-left w-full max-w-xl shadow-lg">
                          <div className="flex items-center gap-4 overflow-hidden">
                            <RiFileTextLine size={28} className="text-primary shrink-0" />
                            <div className="flex flex-col overflow-hidden text-xs">
                              <span className="text-white font-medium truncate max-w-[200px] sm:max-w-xs">{form.idFile.name}</span>
                              <span className="text-[10px] text-neutral-500 mt-1">{(form.idFile.size / 1024 / 1024).toFixed(2)} MB</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeUploadedFile();
                            }}
                            className="h-9 w-9 rounded-xl bg-white/[0.04] flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/[0.1] transition-colors cursor-pointer"
                          >
                            <RiCloseLine size={18} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3 py-4">
                          <div className="h-14 w-14 rounded-full bg-white/[0.02] flex items-center justify-center text-neutral-400 group-hover:text-primary transition-all duration-300">
                            <RiUploadCloud2Line size={28} />
                          </div>
                          <span className="text-xs font-medium text-white uppercase tracking-widest mt-1">Upload Identity Verification</span>
                          <span className="text-[10px] text-neutral-500 leading-normal max-w-sm">Select or drag document (JPG, PNG, PDF up to 10MB). Government-issued identification only.</span>
                        </div>
                      )}
                    </div>
                    {errors.idFile && <span className="text-xs text-red-500 flex items-center gap-1.5 mt-2.5"><RiAlertLine size={14}/> {errors.idFile}</span>}
                  </div>
                </div>
              )}

              {/* STEP 2: PROFESSIONAL INFORMATION */}
              {currentStep === 2 && (
                <div className="flex flex-col gap-6 animate-fade-in">


                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Role Selector */}
                    <div className="flex flex-col">
                      <select
                        name="professionalRole"
                        value={form.professionalRole}
                        onChange={handleSelectChange}
                        className="w-full bg-[#0d0d0d] hover:bg-[#151515] focus:bg-[#1a1a1a] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white outline-none transition-all duration-300 cursor-pointer"
                        required
                        style={{ colorScheme: "dark" }}
                      >
                        <option value="" disabled hidden className="bg-[#0c0c0c] text-neutral-400">Professional Role</option>
                        <option value="Artist" className="bg-[#0c0c0c] text-white">Artist / Solo Musician</option>
                        <option value="Label" className="bg-[#0c0c0c] text-white">Label Imprint Owner</option>
                        <option value="Manager" className="bg-[#0c0c0c] text-white">Artist Manager / Executive</option>
                        <option value="Sub-distributor" className="bg-[#0c0c0c] text-white">Sub-distributor Imprint</option>
                      </select>
                      {errors.professionalRole && <span className="text-[11px] text-red-500 mt-1">{errors.professionalRole}</span>}
                    </div>

                    {/* Artist / Band / Label Name */}
                    <div className="flex flex-col">
                      <input
                        type="text"
                        name="artistName"
                        value={form.artistName}
                        onChange={handleTextChange}
                        placeholder="Artist / Band / Label Name"
                        className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300"
                        required
                      />
                      {errors.artistName && <span className="text-[11px] text-red-500 mt-1">{errors.artistName}</span>}
                    </div>

                    {/* Genre */}
                    <div className="flex flex-col">
                      <select
                        name="genre"
                        value={form.genre}
                        onChange={handleSelectChange}
                        className="w-full bg-[#0d0d0d] hover:bg-[#151515] focus:bg-[#1a1a1a] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white outline-none transition-all duration-300 cursor-pointer"
                        required
                        style={{ colorScheme: "dark" }}
                      >
                        <option value="" disabled hidden className="bg-[#0c0c0c] text-neutral-400">Main Music Genre</option>
                        <option value="Pop" className="bg-[#0c0c0c] text-white">Pop</option>
                        <option value="Hip Hop / Rap" className="bg-[#0c0c0c] text-white">Hip Hop / Rap</option>
                        <option value="Electronic / Dance" className="bg-[#0c0c0c] text-white">Electronic / Dance</option>
                        <option value="Rock / Metal" className="bg-[#0c0c0c] text-white">Rock / Metal</option>
                        <option value="R&B / Soul" className="bg-[#0c0c0c] text-white">R&B / Soul</option>
                        <option value="Jazz" className="bg-[#0c0c0c] text-white">Jazz</option>
                        <option value="Latin" className="bg-[#0c0c0c] text-white">Latin</option>
                        <option value="Classical" className="bg-[#0c0c0c] text-white">Classical</option>
                        <option value="Country / Folk" className="bg-[#0c0c0c] text-white">Country / Folk</option>
                        <option value="World / Reggae" className="bg-[#0c0c0c] text-white">World / Reggae</option>
                        <option value="Other" className="bg-[#0c0c0c] text-white">Other / Experimental</option>
                      </select>
                      {errors.genre && <span className="text-[11px] text-red-500 mt-1">{errors.genre}</span>}
                    </div>

                    {/* Current Distributor */}
                    <div className="flex flex-col">
                      <select
                        name="currentDistributor"
                        value={form.currentDistributor}
                        onChange={handleSelectChange}
                        className="w-full bg-[#0d0d0d] hover:bg-[#151515] focus:bg-[#1a1a1a] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white outline-none transition-all duration-300 cursor-pointer"
                        required
                        style={{ colorScheme: "dark" }}
                      >
                        <option value="" disabled hidden className="bg-[#0c0c0c] text-neutral-400">Current Distributor</option>
                        <option value="DistroKid" className="bg-[#0c0c0c] text-white">DistroKid</option>
                        <option value="CD Baby" className="bg-[#0c0c0c] text-white">CD Baby</option>
                        <option value="TuneCore" className="bg-[#0c0c0c] text-white">TuneCore</option>
                        <option value="Believe" className="bg-[#0c0c0c] text-white">Believe Digital</option>
                        <option value="Amuse" className="bg-[#0c0c0c] text-white">Amuse Pro</option>
                        <option value="Other" className="bg-[#0c0c0c] text-white">Other / Independent</option>
                      </select>
                      {errors.currentDistributor && <span className="text-[11px] text-red-500 mt-1">{errors.currentDistributor}</span>}
                    </div>

                    {/* Tracks Released */}
                    <div className="flex flex-col">
                      <input
                        type="number"
                        name="tracksReleased"
                        value={form.tracksReleased}
                        onChange={handleTextChange}
                        placeholder="Number of Tracks Released"
                        className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300"
                        required
                        min="0"
                      />
                      {errors.tracksReleased && <span className="text-[11px] text-red-500 mt-1">{errors.tracksReleased}</span>}
                    </div>

                    {/* Total Monthly Listeners */}
                    <div className="flex flex-col">
                      <input
                        type="number"
                        name="monthlyListeners"
                        value={form.monthlyListeners}
                        onChange={handleTextChange}
                        placeholder="Total Monthly Listeners"
                        className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300"
                        required
                        min="0"
                      />
                      {errors.monthlyListeners && <span className="text-[11px] text-red-500 mt-1">{errors.monthlyListeners}</span>}
                    </div>

                    {/* Reason for leaving */}
                    <div className="flex flex-col sm:col-span-2">
                      <textarea
                        name="reasonForLeaving"
                        value={form.reasonForLeaving}
                        onChange={handleTextChange}
                        placeholder="Reason for leaving current distributor"
                        className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300 resize-none h-28"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: SOCIAL LINKS & PAYOUT DETAILS */}
              {currentStep === 3 && (
                <div className="flex flex-col gap-6 animate-fade-in">


                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Visual Payout Selector Cards */}
                    <div className="flex flex-col sm:col-span-2">
                      <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest mb-3.5 select-none">Preferred Payout Pathway</span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
                        {[
                          { id: "PayPal", label: "PayPal", desc: "Digital wallet" },
                          { id: "Bank Transfer (ACH/Wire)", label: "Bank Transfer", desc: "Direct to bank" },
                          { id: "Payoneer", label: "Payoneer", desc: "Global payouts" },
                          { id: "Stripe", label: "Stripe", desc: "Stripe Connect" },
                          { id: "Crypto (USDT/USDC)", label: "Crypto", desc: "USDT / USDC" },
                        ].map((method) => {
                          const isSelected = form.payoutMethod === method.id;
                          
                          let Icon = RiBankCardLine;
                          if (method.id === "PayPal") Icon = RiPaypalLine;
                          else if (method.id === "Bank Transfer (ACH/Wire)") Icon = RiBankLine;
                          else if (method.id === "Payoneer") Icon = RiExchangeFundsLine;
                          else if (method.id === "Stripe") Icon = RiWallet3Line;
                          else if (method.id === "Crypto (USDT/USDC)") Icon = RiCoinsLine;

                          return (
                            <button
                              key={method.id}
                              type="button"
                              onClick={() => {
                                setForm((prev) => ({ ...prev, payoutMethod: method.id as any }));
                                if (errors.payoutMethod) setErrors((prev) => ({ ...prev, payoutMethod: "" }));
                              }}
                              className={`flex flex-col items-center justify-center text-center p-5 rounded-2xl transition-all duration-300 cursor-pointer select-none gap-2.5 min-h-[110px] ${
                                isSelected
                                  ? "bg-primary text-black shadow-[0_4px_20px_rgba(243,195,67,0.25)] scale-[1.02]"
                                  : "bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                              }`}
                            >
                              <Icon size={22} className={isSelected ? "text-black" : "text-neutral-400"} />
                              <div className="flex flex-col">
                                <span className={`text-xs font-medium tracking-tight leading-none ${isSelected ? "text-black" : "text-white"}`}>{method.label}</span>
                                <span className={`text-[9px] mt-1 ${isSelected ? "text-black/70" : "text-neutral-500"}`}>{method.desc}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      {errors.payoutMethod && <span className="text-[11px] text-red-500 mt-1.5">{errors.payoutMethod}</span>}
                    </div>

                    {/* CONDITIONAL PAYOUT DETAIL SUB-FORMS */}
                    {form.payoutMethod === "PayPal" && (
                      <div className="flex flex-col sm:col-span-2 animate-fade-in">
                        <input
                          type="email"
                          name="paypalEmail"
                          value={form.paypalEmail}
                          onChange={handleTextChange}
                          placeholder="PayPal Email Address"
                          className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300"
                          required
                        />
                        {errors.paypalEmail && <span className="text-[11px] text-red-500 mt-1">{errors.paypalEmail}</span>}
                      </div>
                    )}

                    {form.payoutMethod === "Payoneer" && (
                      <div className="flex flex-col sm:col-span-2 animate-fade-in">
                        <input
                          type="email"
                          name="payoneerEmail"
                          value={form.payoneerEmail}
                          onChange={handleTextChange}
                          placeholder="Payoneer Linked Email"
                          className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300"
                          required
                        />
                        {errors.payoneerEmail && <span className="text-[11px] text-red-500 mt-1">{errors.payoneerEmail}</span>}
                      </div>
                    )}

                    {form.payoutMethod === "Stripe" && (
                      <div className="flex flex-col sm:col-span-2 animate-fade-in">
                        <input
                          type="text"
                          name="stripeAccountId"
                          value={form.stripeAccountId}
                          onChange={handleTextChange}
                          placeholder="Stripe Account ID"
                          className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300"
                          required
                        />
                        {errors.stripeAccountId && <span className="text-[11px] text-red-500 mt-1">{errors.stripeAccountId}</span>}
                      </div>
                    )}

                    {form.payoutMethod === "Crypto (USDT/USDC)" && (
                      <div className="flex flex-col sm:col-span-2 animate-fade-in">
                        <input
                          type="text"
                          name="cryptoWalletAddress"
                          value={form.cryptoWalletAddress}
                          onChange={handleTextChange}
                          placeholder="Crypto Wallet Address"
                          className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300"
                          required
                        />
                        {errors.cryptoWalletAddress && <span className="text-[11px] text-red-500 mt-1">{errors.cryptoWalletAddress}</span>}
                      </div>
                    )}

                    {form.payoutMethod === "Bank Transfer (ACH/Wire)" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 sm:col-span-2 rounded-3xl bg-[#080808]/40 p-5 sm:p-6 animate-fade-in">
                        <div className="sm:col-span-2 text-xs font-medium text-primary uppercase tracking-widest pb-2 mb-1 flex items-center gap-2">
                          <RiBankLine size={16} />
                          <span>Bank Coordinates</span>
                        </div>
                        
                        <div className="flex flex-col">
                          <input
                            type="text"
                            name="bankName"
                            value={form.bankName}
                            onChange={handleTextChange}
                            placeholder="Bank Name"
                            className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300"
                            required
                          />
                          {errors.bankName && <span className="text-[11px] text-red-500 mt-1">{errors.bankName}</span>}
                        </div>

                        <div className="flex flex-col">
                          <input
                            type="text"
                            name="bankAccountName"
                            value={form.bankAccountName}
                            onChange={handleTextChange}
                            placeholder="Account Holder Name"
                            className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300"
                            required
                          />
                          {errors.bankAccountName && <span className="text-[11px] text-red-500 mt-1">{errors.bankAccountName}</span>}
                        </div>

                        <div className="flex flex-col">
                          <input
                            type="text"
                            name="bankAccountNumber"
                            value={form.bankAccountNumber}
                            onChange={handleTextChange}
                            placeholder="Account Number / IBAN"
                            className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300"
                            required
                          />
                          {errors.bankAccountNumber && <span className="text-[11px] text-red-500 mt-1">{errors.bankAccountNumber}</span>}
                        </div>

                        <div className="flex flex-col">
                          <input
                            type="text"
                            name="bankRoutingNumber"
                            value={form.bankRoutingNumber}
                            onChange={handleTextChange}
                            placeholder="Routing Number / Swift"
                            className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300"
                            required
                          />
                          {errors.bankRoutingNumber && <span className="text-[11px] text-red-500 mt-1">{errors.bankRoutingNumber}</span>}
                        </div>
                      </div>
                    )}

                    {/* Social Handles Title */}
                    <div className="sm:col-span-2 pt-5 mt-3">
                      <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest select-none">Social Channels & Verification</span>
                    </div>

                    {/* Facebook URL */}
                    <div className="flex flex-col">
                      <input
                        type="url"
                        name="facebookUrl"
                        value={form.facebookUrl}
                        onChange={handleTextChange}
                        placeholder="Facebook Profile Link"
                        className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300"
                      />
                    </div>

                    {/* YouTube Channel ID */}
                    <div className="flex flex-col">
                      <input
                        type="text"
                        name="youtubeChannelId"
                        value={form.youtubeChannelId}
                        onChange={handleTextChange}
                        placeholder="YouTube Channel ID"
                        className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300"
                      />
                    </div>

                    {/* Spotify Artist URL */}
                    <div className="flex flex-col sm:col-span-2">
                      <input
                        type="url"
                        name="spotifyArtistUrl"
                        value={form.spotifyArtistUrl}
                        onChange={handleTextChange}
                        placeholder="Spotify Artist URL"
                        className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40 rounded-2xl px-5 py-5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: REVIEW & APPLY */}
              {currentStep === 4 && (
                <div className="flex flex-col gap-6 animate-fade-in">


                  {/* Summary Details */}
                  <div className="bg-[#080808]/80 rounded-3xl p-5 sm:p-6 text-sm relative overflow-hidden flex flex-col gap-4 shadow-xl">
                    <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
                    
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[10px] sm:text-xs font-medium text-primary uppercase tracking-widest">Verification Summary</span>
                      <span className="text-[9px] text-neutral-500">SECURE_CATALOG_RECORD // DISTROZI</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Personal Info */}
                      <div className="flex flex-col gap-3">
                        <span className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">Account Registrar</span>
                        <div className="flex flex-col gap-1 bg-white/[0.01] rounded-2xl p-4">
                          <span className="text-white font-medium text-base">{form.firstName} {form.lastName}</span>
                          <span className="text-neutral-400 text-xs mt-0.5">{form.email}</span>
                          <span className="text-neutral-400 text-xs">{form.phone}</span>
                          <span className="text-primary font-medium text-[10px] mt-2 bg-primary/5 rounded px-2 py-0.5 w-fit">
                            {form.idMethod}: {form.idNumber}
                          </span>
                        </div>
                      </div>

                      {/* Sonic Profile */}
                      <div className="flex flex-col gap-3">
                        <span className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">Artist Identity specs</span>
                        <div className="flex flex-col gap-1 bg-white/[0.01] rounded-2xl p-4">
                          <span className="text-white font-medium text-base">{form.artistName || "N/A"}</span>
                          <span className="text-neutral-400 text-xs mt-0.5">Primary Role: {form.professionalRole || "N/A"}</span>
                          <span className="text-neutral-400 text-xs">Genre Anchor: {form.genre || "N/A"}</span>
                          <span className="text-neutral-300 font-medium text-[10px] mt-2 bg-white/5 rounded px-2 py-0.5 w-fit">
                            {form.tracksReleased || 0} Tracks | {parseInt(form.monthlyListeners || "0").toLocaleString()} Monthly Listeners
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Payout Channel */}
                    <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">Royalty Routing Channel</span>
                        <span className="text-white font-medium text-sm mt-0.5">{form.payoutMethod}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-primary/5 px-3.5 py-2 rounded-xl text-primary text-xs font-medium w-fit">
                        <RiBankCardLine size={15} />
                        <span>Direct Channel Ready</span>
                      </div>
                    </div>
                  </div>

                  {/* Consents checkboxes */}
                  <div className="flex flex-col gap-4 pt-4 mt-0 font-sans">
                    
                    {/* Checkbox 1 */}
                    <label className="flex items-start gap-4 cursor-pointer select-none group">
                      <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                        <input
                          type="checkbox"
                          checked={form.agreedToTerms}
                          onChange={(e) => {
                            setForm((prev) => ({ ...prev, agreedToTerms: e.target.checked }));
                            if (errors.agreedToTerms) setErrors((prev) => ({ ...prev, agreedToTerms: "" }));
                          }}
                          className="peer h-6 w-6 opacity-0 absolute cursor-pointer z-20"
                          required
                        />
                        <div className={`h-6 w-6 rounded-lg transition-all duration-200 ${
                          form.agreedToTerms 
                            ? "bg-primary text-black shadow-[0_0_12px_rgba(243,195,67,0.4)]" 
                            : "bg-white/[0.04] group-hover:bg-white/[0.08]"
                        } flex items-center justify-center`}>
                          {form.agreedToTerms && <RiCloseLine size={18} className="text-black rotate-45 stroke-[3]" />}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs sm:text-sm font-medium text-white/90 leading-snug">
                          I agree to the Terms of Service and Privacy Policy of Distrozi.
                        </span>
                        <a 
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="text-[10px] text-primary font-medium hover:underline mt-1.5 uppercase tracking-wider"
                        >
                          [Read terms of service]
                        </a>
                        {errors.agreedToTerms && <span className="text-[11px] text-red-500 mt-1">{errors.agreedToTerms}</span>}
                      </div>
                    </label>

                    {/* Checkbox 2 */}
                    <label className="flex items-start gap-4 cursor-pointer select-none group">
                      <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                        <input
                          type="checkbox"
                          checked={form.agreedToAccuracy}
                          onChange={(e) => {
                            setForm((prev) => ({ ...prev, agreedToAccuracy: e.target.checked }));
                            if (errors.agreedToAccuracy) setErrors((prev) => ({ ...prev, agreedToAccuracy: "" }));
                          }}
                          className="peer h-6 w-6 opacity-0 absolute cursor-pointer z-20"
                          required
                        />
                        <div className={`h-6 w-6 rounded-lg transition-all duration-200 ${
                          form.agreedToAccuracy 
                            ? "bg-primary text-black shadow-[0_0_12px_rgba(243,195,67,0.4)]" 
                            : "bg-white/[0.04] group-hover:bg-white/[0.08]"
                        } flex items-center justify-center`}>
                          {form.agreedToAccuracy && <RiCloseLine size={18} className="text-black rotate-45 stroke-[3]" />}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs sm:text-sm font-medium text-white/90 leading-relaxed">
                          I confirm that all information provided is accurate and I own or control the rights to the music I intend to distribute.
                        </span>
                        {errors.agreedToAccuracy && <span className="text-[11px] text-red-500 mt-1">{errors.agreedToAccuracy}</span>}
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="flex items-center justify-between pt-4 gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={isSubmitting}
                    className="h-12 rounded-2xl px-6 text-lg font-bold bg-white/[0.03] text-white/80 hover:text-white hover:bg-white/[0.06] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2.5 shrink-0 select-none cursor-pointer border-none"
                  >
                    <RiArrowLeftLine size={18} />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="h-12 rounded-2xl px-6 text-lg font-bold bg-primary text-black hover:bg-[#f7d26e] hover:scale-[1.03] transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_0_24px_rgba(243,195,67,0.3)] shrink-0 select-none cursor-pointer border-none"
                  >
                    <span>Next</span>
                    <RiArrowRightLine size={18} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 rounded-2xl px-7 text-lg font-bold bg-primary text-black hover:bg-[#f7d26e] hover:scale-[1.03] transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(243,195,67,0.4)] shrink-0 select-none cursor-pointer border-none disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin shrink-0" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Registration</span>
                        <RiArrowRightLine size={18} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>

          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

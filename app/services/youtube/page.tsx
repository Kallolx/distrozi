"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import {
  RiUploadCloud2Line,
  RiFileTextLine,
  RiCloseLine,
  RiAlertLine,
  RiArrowRightLine,
} from "react-icons/ri";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import BorderGlow from "@/components/BorderGlow";

const Aurora = dynamic(() => import("@/components/Aurora"), { ssr: false });

export default function YouTubeNetworkMCNCMSPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    idMethod: "",
    idNumber: "",
    state: "",
    country: "",
    channelId: "",
  });

  const [idFile, setIdFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [acknowledgments, setAcknowledgments] = useState({
    cond1: false,
    cond2: false,
    cond3: false,
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIdFile(e.target.files[0]);
    }
    if (status === "error") setStatus("idle");
  };

  const removeUploadedFile = () => {
    setIdFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.channelId ||
      !idFile
    ) {
      setStatus("error");
      return;
    }

    if (
      !acknowledgments.cond1 ||
      !acknowledgments.cond2 ||
      !acknowledgments.cond3
    ) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const dataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        dataToSend.append(key, value);
      });
      if (idFile) {
        dataToSend.append("idFile", idFile);
      }
      dataToSend.append("submissionType", "YouTube MCN Application");

      const response = await fetch("/api/send-email", {
        method: "POST",
        body: dataToSend,
      });

      if (!response.ok) throw new Error("Failed to send");

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        idMethod: "",
        idNumber: "",
        state: "",
        country: "",
        channelId: "",
      });
      setIdFile(null);
      setAcknowledgments({
        cond1: false,
        cond2: false,
        cond3: false,
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") setStatus("idle");
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAcknowledgments((prev) => ({ ...prev, [name]: checked }));
    if (status === "error") setStatus("idle");
  };

  return (
    <main className="relative min-h-screen bg-black">
      {/* Global Fixed Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Aurora
          colorStops={[
            "#7042f8",
            "#d159ff",
            "#3b82f6",
            "#14b8a6",
            "#22c55e",
            "#f3c343",
          ]}
          amplitude={1.2}
          blend={0.5}
        />
        <div className="absolute inset-0 bg-black/45 sm:bg-black/25 transition-all duration-300" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.9)_95%)] sm:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.7)_90%)] transition-all duration-300" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[linear-gradient(rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.006)_1px,transparent_1px)] sm:bg-[size:32px_32px] transition-all duration-300" />
      </div>

      <Navbar />

      <div className="relative z-10 flex flex-col items-center w-full pt-32 pb-16">
        <section className="relative w-full overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="flex flex-col items-center text-center gap-2 mb-12 sm:mb-14">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white max-w-2xl leading-[1.15]">
               Scale Your YouTube Channel with{" "}
                <span className="gradient-text font-semibold">
                  Distrozi MCN/CMS
                </span>
              </h1>
              <p className="text-white/60 mt-4 max-w-xl mx-auto text-sm sm:text-base">
                Join the Distrozi MCN/CMS network to protect your rights and monetize
                your music-related content globally.
              </p>
            </div>

            {/* 2-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start w-full">
              {/* Right Column: Read Carefully (Sticky) */}
              <div className="w-full flex flex-col lg:order-last lg:sticky lg:top-32">
                <BorderGlow
                  backgroundColor="#0b0b0b"
                  borderRadius={16}
                  className="w-full h-full flex"
                >
                  <div className="p-6 sm:p-8 flex flex-col gap-6 w-full h-full">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src="/icons/files.png"
                          alt="Terms Icon"
                          className="w-6 h-6 object-contain"
                        />
                        <h3 className="text-xl font-bold text-white">
                          Please Read Carefully
                        </h3>
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed mb-4">
                        Thanks for your interest in linking your channel(s) to
                        Distrozi MCN/CMS.
                      </p>
                      <p className="text-sm text-white/70 leading-relaxed">
                        To ensure linking your channel is beneficial and
                        appropriate for you, please review and acknowledge these
                        points carefully:
                      </p>
                    </div>

                    <div className="flex flex-col gap-5 border-y border-white/5 py-6 my-2">
                      {/* Condition 1 */}
                      <label className="flex items-start gap-4 cursor-pointer group">
                        <div className="relative flex items-center justify-center mt-0.5">
                          <input
                            type="checkbox"
                            name="cond1"
                            checked={acknowledgments.cond1}
                            onChange={handleCheckboxChange}
                            className="peer appearance-none w-5 h-5 border-2 border-white/20 rounded-md bg-black/50 checked:bg-blue-500 checked:border-blue-500 transition-all"
                          />
                          <svg
                            className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-white/80 group-hover:text-white transition-colors leading-relaxed">
                            I have read and understand the Conditions for
                            maintaining your YouTube channel in Distrozi
                            MCN/CMS.
                          </p>
                          <a
                            href="#"
                            className="text-xs font-semibold text-blue-400 hover:text-blue-300 mt-1 inline-block transition-colors"
                          >
                            See full conditions
                          </a>
                        </div>
                      </label>

                      {/* Condition 2 */}
                      <label className="flex items-start gap-4 cursor-pointer group">
                        <div className="relative flex items-center justify-center mt-0.5">
                          <input
                            type="checkbox"
                            name="cond2"
                            checked={acknowledgments.cond2}
                            onChange={handleCheckboxChange}
                            className="peer appearance-none w-5 h-5 border-2 border-white/20 rounded-md bg-black/50 checked:bg-blue-500 checked:border-blue-500 transition-all"
                          />
                          <svg
                            className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-white/80 group-hover:text-white transition-colors leading-relaxed">
                            I understand and acknowledge, to avoid issues with
                            my account, I must only link channels I trust will
                            follow YouTube's requirements and guidelines.
                          </p>
                          <a
                            href="#"
                            className="text-xs font-semibold text-blue-400 hover:text-blue-300 mt-1 inline-block transition-colors"
                          >
                            YouTube Partner Requirements
                          </a>
                        </div>
                      </label>

                      {/* Condition 3 */}
                      <label className="flex items-start gap-4 cursor-pointer group">
                        <div className="relative flex items-center justify-center mt-0.5">
                          <input
                            type="checkbox"
                            name="cond3"
                            checked={acknowledgments.cond3}
                            onChange={handleCheckboxChange}
                            className="peer appearance-none w-5 h-5 border-2 border-white/20 rounded-md bg-black/50 checked:bg-blue-500 checked:border-blue-500 transition-all"
                          />
                          <svg
                            className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-white/80 group-hover:text-white transition-colors leading-relaxed">
                            I will inform channel owners that any valid strike
                            or violation can result in the channel being
                            unlinked, and they must only upload music-related
                            content.
                          </p>
                          <a
                            href="#"
                            className="text-xs font-semibold text-blue-400 hover:text-blue-300 mt-1 inline-block transition-colors"
                          >
                            Avoiding YouTube Copyright Strikes
                          </a>
                        </div>
                      </label>
                    </div>

                    <div className="mt-auto">
                      <p className="text-xs text-white/40 italic">
                        By checking the boxes above, you acknowledge and agree
                        to our terms and conditions.
                      </p>
                    </div>
                  </div>
                </BorderGlow>
              </div>

              {/* Left Column: Submit Form */}
              <div className="w-full flex flex-col">
                <BorderGlow
                  backgroundColor="#0b0b0b"
                  borderRadius={16}
                  className="w-full h-full flex"
                >
                  <div className="p-6 sm:p-8 flex flex-col gap-6 text-left relative overflow-hidden w-full h-full">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <img
                          src="/icons/youtube.png"
                          alt="YouTube Icon"
                          className="w-7 h-7 object-contain"
                        />
                        <h3 className="text-xl font-bold text-white">
                          Submit YouTube Channel
                        </h3>
                      </div>
                      <p className="text-sm text-white/70">
                        Link your channel to our MCN to maximize monetization
                        opportunities.
                      </p>

                      <div className="bg-white/5 rounded-xl p-4 mt-2 border border-white/10">
                        <span className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 block">
                          Conditions for linking & maintaining channels:
                        </span>
                        <ul className="text-sm text-white/80 flex flex-col gap-2 list-disc pl-4 marker:text-white/30">
                          <li>100% of channel content must be music related</li>
                          <li>
                            95% of channel content must be original and fully
                            owned by you
                          </li>
                          <li>
                            Channel must meet YouTube's partner program
                            acceptance criteria
                          </li>
                        </ul>
                        <a
                          href="#"
                          className="text-xs font-semibold text-blue-400 hover:text-blue-300 mt-3 inline-block transition-colors"
                        >
                          See Full Conditions
                        </a>
                      </div>
                    </div>

                    {status === "success" ? (
                      <div className="py-12 flex flex-col items-center justify-center text-center gap-3 w-full h-full">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                          <svg
                            className="w-6 h-6 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        </div>
                        <h4 className="text-lg font-bold text-white">
                          Application Received
                        </h4>
                        <p className="text-sm text-white/50 max-w-sm leading-relaxed">
                          Your YouTube network application has been successfully
                          submitted. We will review your channel and get back to
                          you shortly.
                        </p>
                        <button
                          onClick={() => setStatus("idle")}
                          className="mt-4 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Submit another channel
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 w-full"
                      >
                        {/* Personal Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <input
                              type="text"
                              name="firstName"
                              required
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="First Name *"
                              className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors duration-200 text-sm placeholder-white/30"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              name="lastName"
                              required
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="Last Name *"
                              className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors duration-200 text-sm placeholder-white/30"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <input
                              type="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Email Address *"
                              className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors duration-200 text-sm placeholder-white/30"
                            />
                          </div>
                          <div>
                            <input
                              type="tel"
                              name="phone"
                              required
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="Phone Number *"
                              className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors duration-200 text-sm placeholder-white/30"
                            />
                          </div>
                        </div>

                        {/* Date of Birth & ID Method */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <input
                              type="date"
                              name="dob"
                              required
                              value={formData.dob}
                              onChange={handleInputChange}
                              placeholder="Date of Birth *"
                              className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors duration-200 text-sm placeholder-white/30"
                              style={{ colorScheme: "dark" }}
                            />
                          </div>
                          <div>
                            <select
                              name="idMethod"
                              required
                              value={formData.idMethod}
                              onChange={handleInputChange}
                              className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors duration-200 text-sm cursor-pointer"
                              style={{ colorScheme: "dark" }}
                            >
                              <option
                                value=""
                                disabled
                                hidden
                                className="text-white/30"
                              >
                                ID Method *
                              </option>
                              <option
                                value="National ID"
                                className="bg-[#0b0b0b] text-white"
                              >
                                National ID Card
                              </option>
                              <option
                                value="Driving Licence"
                                className="bg-[#0b0b0b] text-white"
                              >
                                Driver's License
                              </option>
                              <option
                                value="Passport"
                                className="bg-[#0b0b0b] text-white"
                              >
                                Passport Document
                              </option>
                            </select>
                          </div>
                        </div>

                        {/* ID Number */}
                        <div>
                          <input
                            type="text"
                            name="idNumber"
                            required
                            value={formData.idNumber}
                            onChange={handleInputChange}
                            placeholder={
                              formData.idMethod
                                ? `${formData.idMethod} Number *`
                                : "Select ID Method First *"
                            }
                            className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors duration-200 text-sm placeholder-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!formData.idMethod}
                          />
                        </div>

                        {/* Location Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <input
                              type="text"
                              name="state"
                              required
                              value={formData.state}
                              onChange={handleInputChange}
                              placeholder="State / Province *"
                              className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors duration-200 text-sm placeholder-white/30"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              name="country"
                              required
                              value={formData.country}
                              onChange={handleInputChange}
                              placeholder="Country of Residence *"
                              className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors duration-200 text-sm placeholder-white/30"
                            />
                          </div>
                        </div>

                        {/* ID Document Uploader */}
                        <div className="mt-1">
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`rounded-xl border border-dashed p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-3 group ${
                              idFile
                                ? "bg-white/5 border-blue-500/50"
                                : status === "error" && !idFile
                                  ? "bg-red-500/5 border-red-500/30"
                                  : "bg-black/40 border-white/10 hover:border-white/30 hover:bg-black/60"
                            }`}
                          >
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                              accept=".jpg,.jpeg,.png,.pdf"
                              className="hidden"
                            />

                            {idFile ? (
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-3 overflow-hidden">
                                  <RiFileTextLine
                                    size={24}
                                    className="text-blue-400 shrink-0"
                                  />
                                  <div className="flex flex-col text-left overflow-hidden">
                                    <span className="text-sm text-white font-medium truncate max-w-[150px] sm:max-w-[200px]">
                                      {idFile.name}
                                    </span>
                                    <span className="text-xs text-white/50">
                                      {(idFile.size / 1024 / 1024).toFixed(2)}{" "}
                                      MB
                                    </span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeUploadedFile();
                                  }}
                                  className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                  <RiCloseLine size={16} />
                                </button>
                              </div>
                            ) : (
                              <>
                                <RiUploadCloud2Line
                                  size={28}
                                  className="text-white/30 group-hover:text-blue-400 transition-colors"
                                />
                                <div>
                                  <span className="text-sm font-medium text-white block mb-1">
                                    Upload ID Document *
                                  </span>
                                  <span className="text-xs text-white/40 block max-w-[250px] mx-auto leading-relaxed">
                                    JPG, PNG, or PDF up to 10MB. Must match the
                                    ID number provided above.
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Channel ID */}
                        <div>
                          <input
                            type="text"
                            name="channelId"
                            required
                            value={formData.channelId}
                            onChange={handleInputChange}
                            placeholder="YouTube Channel ID or URL *"
                            className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors duration-200 text-sm placeholder-white/30"
                          />
                        </div>

                        {/* Errors / Feedback Notices */}
                        {status === "error" && (
                          <span className="text-xs font-semibold text-rose-500">
                            * Please fill out all required fields and
                            acknowledge the terms.
                          </span>
                        )}

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={status === "sending"}
                          className="w-full mt-2 bg-white text-black hover:bg-white/90 font-bold py-3.5 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2 select-none shadow-md disabled:bg-white/50"
                        >
                          {status === "sending" ? (
                            <>
                              <svg
                                className="animate-spin h-5 w-5 text-black"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                              Submitting Application...
                            </>
                          ) : (
                            "Submit Application"
                          )}
                        </button>
                        
                        {status === "error" && (
                          <div className="flex items-center gap-2 text-red-500 bg-red-500/5 p-3 rounded-xl text-xs border border-red-500/10">
                            <RiAlertLine size={16} className="shrink-0" />
                            <span>Failed to send application. Please ensure all fields are correct and you've accepted all terms.</span>
                          </div>
                        )}
                      </form>
                    )}
                  </div>
                </BorderGlow>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

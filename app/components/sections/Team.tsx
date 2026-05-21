"use client";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  email: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Marcus Sterling",
    role: "Founder & CEO",
    bio: "Ex-rights manager with a decade of catalog acquisition experience. Oversees YouTube CMS licenses and global publisher negotiations.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&h=375&q=80",
    linkedin: "https://linkedin.com",
    email: "marcus@distrozi.com"
  },
  {
    name: "Elena Rostova",
    role: "Chief Product Officer",
    bio: "System architect behind our core real-time ledger. Designed the zero-delay split calculation engine and streaming analytics board.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=375&q=80",
    linkedin: "https://linkedin.com",
    email: "elena@distrozi.com"
  },
  {
    name: "Darnell Vance",
    role: "Director of Artist Services",
    bio: "Manages catalog onboarding and digital ingestion. Works directly with label managers on custom metadata curation and release schedules.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&h=375&q=80",
    linkedin: "https://linkedin.com",
    email: "darnell@distrozi.com"
  },
  {
    name: "Sophia Patel",
    role: "Head of Rights Compliance",
    bio: "Specializes in intellectual property protection and YouTube content claiming. Oversees visual asset conflicts and direct disputes.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&h=375&q=80",
    linkedin: "https://linkedin.com",
    email: "sophia@distrozi.com"
  }
];

import BorderGlow from "@/components/BorderGlow";

export default function Team() {
  return (
    <section className="relative w-full py-16 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-2.5 mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white max-w-2xl leading-[1.15]">
            Meet the <span className="gradient-text font-semibold">Distrozi Team</span>
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {teamMembers.map((member, index) => (
            <BorderGlow
              key={index}
              backgroundColor="#0b0b0b"
              borderRadius={16}
              className="w-full h-full flex"
            >
              <div className="p-3 flex flex-col w-full h-full">
                {/* Profile Image Frame (Consistent aspect ratio, minimal gap) */}
                <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-black border border-white/5 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover select-none pointer-events-none grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>

                {/* Identity details (snug space) */}
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-white mt-3.5 leading-snug">
                  {member.name}
                </h3>
                <span className="text-xs sm:text-sm text-blue-400 font-semibold mt-0.5">
                  {member.role}
                </span>

                {/* Bio description */}
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed mt-2 flex-grow min-h-[64px]">
                  {member.bio}
                </p>

                {/* Subtle Social Action links */}
                <div className="border-t border-white/5 pt-3 mt-3 flex items-center gap-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white transition-colors duration-200"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-white/40 hover:text-white transition-colors duration-200"
                    aria-label={`Email ${member.name}`}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </a>
                  <span className="text-[10px] text-white/20 select-none ml-auto">
                    Distrozi Team
                  </span>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { classNames } from "@/lib/utils";
import { BlurText } from "@/components/ui/BlurText";

interface ProfileSectionProps {
  avatarUrl: string;
  name: string;
  title: string;
  handle: string;
  status: string;
  contactText?: string;
  onContactClick?: () => void;
  className?: string;
}

export function ProfileSection({
  avatarUrl,
  name,
  title,
  handle,
  status,
  contactText = "Contact",
  onContactClick,
  className,
}: ProfileSectionProps) {
  return (
    <div className={className}>
      <div
        className="relative aspect-[0.718] rounded-[30px] overflow-hidden"
      >

        {/* Content container */}
        <div className="relative z-10 h-full flex flex-col p-6 pt-2">
          {/* Welcome and Name at top */}
          <div className="text-center">
            <p className="text-2xl text-text-secondary mb-1">
              <BlurText text="Welcome Back" delay={0} duration={1500} />
            </p>
            <h2 className="text-3xl font-semibold text-text-primary mb-1">
              <BlurText text={name} delay={500} duration={1500} />
            </h2>
            <p className="text-2xl font-semibold text-text-secondary">
              <BlurText text={title} delay={1000} duration={1500} />
            </p>
          </div>

          {/* Avatar - positioned to fill remaining space */}
          <div className="flex-1 flex items-end justify-center overflow-hidden mt-4">
            <div className="relative w-full max-w-[280px] aspect-square">
              <Image
                src={avatarUrl}
                alt={name}
                fill
                className="object-cover object-top rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}

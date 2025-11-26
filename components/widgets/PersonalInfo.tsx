import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { classNames } from "@/lib/utils";
import type { PersonalInfo as PersonalInfoType } from "@/types";

interface PersonalInfoProps extends PersonalInfoType {
  className?: string;
}

export function PersonalInfo({
  name,
  age,
  title,
  company,
  details,
  avatarSrc,
  className,
}: PersonalInfoProps) {
  return (
    <Card className={classNames("flex gap-8", className)} padding="lg">
      {/* Avatar */}
      {avatarSrc && (
        <div className="shrink-0">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-brand-accent/30">
            <Image
              src={avatarSrc}
              alt={name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Info */}
      <div className="flex-1 flex flex-col justify-center">
        {/* Name and Age */}
        <div className="flex items-baseline gap-4 mb-2">
          <h1 className="text-display font-bold text-text-primary">{name}</h1>
          <span className="text-heading text-text-muted">{age} years old</span>
        </div>

        {/* Title and Company */}
        <p className="text-body-lg text-text-secondary mb-4">
          <span className="text-brand-accent font-medium">{title}</span>
          {" at "}
          <span className="text-text-primary">{company}</span>
        </p>

        {/* Details Grid */}
        {details.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {details.map((detail, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-label text-text-muted uppercase tracking-wider">
                  {detail.label}
                </span>
                <span className="text-body font-medium text-text-primary">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

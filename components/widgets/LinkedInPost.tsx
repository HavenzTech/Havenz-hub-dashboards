import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { formatRelativeTime, formatNumber, classNames } from "@/lib/utils";
import type { LinkedInPost as LinkedInPostType } from "@/types";

interface LinkedInPostProps extends LinkedInPostType {
  className?: string;
}

export function LinkedInPost({
  author,
  content,
  timestamp,
  likes,
  comments,
  shares,
  imageUrl,
  className,
}: LinkedInPostProps) {
  return (
    <Card
      className={classNames("flex flex-col h-full min-h-[380px]", className)}
      padding="md"
    >
      {/* Author Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
          <Image
            src={author.avatarUrl}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-heading font-semibold text-text-primary truncate">
            {author.name}
          </h4>
          <p className="text-label text-text-muted truncate">{author.title}</p>
          <p className="text-label text-text-muted">
            {formatRelativeTime(timestamp)}
          </p>
        </div>
      </div>

      {/* Content */}
      <p className="text-label text-text-secondary mb-4 line-clamp-5 flex-1">
        {content}
      </p>

      {/* Image (if any) */}
      {imageUrl && (
        <div className="relative w-full h-28 rounded-lg overflow-hidden mb-3">
          <Image
            src={imageUrl}
            alt="Post image"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Engagement Stats */}
      <div className="flex items-center gap-6 pt-4 border-t border-white/10 mt-auto">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-brand-accent"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
          <span className="text-label text-text-secondary">
            {formatNumber(likes)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-brand-accent-blue"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-label text-text-secondary">
            {formatNumber(comments)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-status-success"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          <span className="text-label text-text-secondary">
            {formatNumber(shares)}
          </span>
        </div>
      </div>
    </Card>
  );
}

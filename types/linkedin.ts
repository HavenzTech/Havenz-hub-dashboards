export interface LinkedInAuthor {
  name: string;
  title: string;
  avatarUrl: string;
}

export interface LinkedInPost {
  id: string;
  author: LinkedInAuthor;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  imageUrl?: string;
}

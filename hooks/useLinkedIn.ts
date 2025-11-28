"use client";

import { useState, useEffect, useCallback } from "react";
import { linkedinService } from "@/lib/api";
import type { LinkedInPost } from "@/types";

interface UseLinkedInPostsResult {
  posts: LinkedInPost[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useLinkedInPosts(): UseLinkedInPostsResult {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await linkedinService.getPosts();
      setPosts(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch LinkedIn posts";
      setError(message);
      console.error("Error fetching LinkedIn posts:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, isLoading, error, refetch: fetchPosts };
}

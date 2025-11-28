import { api } from "../client";
import type { User } from "@/types";

export const usersService = {
  getById: (id: string) => {
    return api.get<User>(`/havenzhub/User/${id}`);
  },
};

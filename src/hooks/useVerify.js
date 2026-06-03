import { getVerify } from "@/Services/auth";
import { useQuery } from "@tanstack/react-query";

export const useVerify = (token) => {
  return useQuery({
    queryKey: ["verifyToken"],
    queryFn: () => getVerify(),
  });
};

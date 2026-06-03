import getsProducts from "@/Services/Products";
import { useQuery } from "@tanstack/react-query";

export default function useProduct() {
  const params = {};
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getsProducts(),
  });
}

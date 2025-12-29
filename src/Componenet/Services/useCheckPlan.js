import { useQuery } from "@tanstack/react-query";
import { checkPlan } from "./paymentApi";
import { getuserid } from "./getAuthToken";

export const useCheckPlan = () => {
  const userId = getuserid(); // ✅ VALUE nikalo

  const query = useQuery({
    queryKey: ["check-plan", userId],
    queryFn: () => checkPlan(userId), 
    enabled: !!userId,               
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 5 * 60 * 1000,
  });

  return {
    ...query,
    hasActivePlan: query.data?.data?.has_active_plan ?? false,
    reason: query.data?.data?.reason,
  };
};

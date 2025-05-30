import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

// fetch data from an API using useQuery hook
export function useCabins() {
  const { isPending, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, isPending };
}

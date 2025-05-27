import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Doing the Filter and Sort in useBookings custom hook instead of in the BookingTable likes what be done in the CabinTable because: we don't want to receive all the bookings data (in case of Cabin, the data is simple so we can do the filter/sort on the client-side when we received the data) and then do the filter/sort on the client-side => do this on the server-side, then we will get the data that is filtered/sorted from Supabase API

  // FILTER
  const filteredValue = searchParams.get("status"); // for the first render: filteredValue = null
  const filter = !filteredValue || filteredValue === "all" ? null : { field: "status", value: filteredValue }; // filter is an object

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-descending";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const { isPending, data: { data: bookings, count } = {} } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    // whenever the filter change, React Query will re-fetch the data, it acts as the dependency array of useQuery hook  (similar to the dependency array of useEffect hook)
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isPending, bookings, count };
}

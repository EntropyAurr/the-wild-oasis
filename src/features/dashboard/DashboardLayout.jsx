import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useRecentBookings } from "../dashboard/useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 40rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isPendingBookings, bookings } = useRecentBookings();
  const { isPendingStays, confirmedStays, numDays } = useRecentStays();
  const { cabins, isPending: isPendingCabins } = useCabins();

  if (isPendingBookings || isPendingStays || isPendingCabins) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length} />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

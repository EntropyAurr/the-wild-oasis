import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  const allDays = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDays.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings.filter((booking) => isSameDay(date, new Date(booking.created_at))).reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings.filter((booking) => isSameDay(date, new Date(booking.created_at))).reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#22c55e", fill: "#22c55e" },
        extrasSales: { stroke: "#bdd106", fill: "#dcfce7" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#22c55e", fill: "#22c55e" },
        extrasSales: { stroke: "#bdd106", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDays.at(0), "MMM dd yyyy")} &mdash; {format(allDays.at(-1), "MMM dd yyyy")}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis dataKey="label" tick={{ fill: colors.text }} tickLine={{ stroke: colors.stroke }} />
          <YAxis unit="$" tick={{ fill: colors.text }} tickLine={{ stroke: colors.stroke }} />
          <CartesianGrid />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area dataKey="totalSales" type="monotone" stroke={colors.totalSales.stroke} fill={colors.totalSales.fill} strokeWidth={2} name="Total Sales" unit="$" />
          <Area dataKey="extrasSales" type="monotone" stroke={colors.extrasSales.stroke} fill={colors.extrasSales.fill} strokeWidth={2} name="Extras Sales" unit="$" />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;

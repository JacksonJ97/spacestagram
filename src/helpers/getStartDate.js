import { format, fromUnixTime, getUnixTime, subDays } from "date-fns";

const getStartDate = (timestamp) => {
  const date = fromUnixTime(timestamp);
  const startDate = subDays(date, 5);
  const startDateTimestamp = getUnixTime(startDate);
  const startDateParam = format(startDate, "yyyy-MM-dd");

  return { timestamp: startDateTimestamp, param: startDateParam };
};

export default getStartDate;

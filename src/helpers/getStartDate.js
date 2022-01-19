import { format, subDays } from "date-fns";

const getStartDate = (date) => {
  const startDate = subDays(date, 7);
  const startDateString = format(startDate, "yyyy-MM-dd");

  return [startDate, startDateString];
};

export default getStartDate;

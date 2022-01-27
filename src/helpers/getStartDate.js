import { format, subDays } from "date-fns";

const getStartDate = (date) => {
  const startDate = subDays(date, 5);
  const startDateParam = format(startDate, "yyyy-MM-dd");

  return { date: startDate, param: startDateParam };
};

export default getStartDate;

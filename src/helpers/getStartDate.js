import { format, subDays } from "date-fns";

const getStartDate = (date) => {
  const startDate = subDays(date, 7);
  const formattedDate = format(startDate, "yyyy-MM-dd");

  return formattedDate;
};

export default getStartDate;

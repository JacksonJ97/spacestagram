import { format, subDays } from "date-fns";

const getStartDate = (date, amount) => {
  const startDate = subDays(date, amount);
  const formattedDate = format(startDate, "yyyy-MM-dd");

  return formattedDate;
};

export default getStartDate;

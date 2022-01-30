import { useState, useEffect } from "react";

// Hooks
import useLocalStorage from "./useLocalStorage";

// Helpers
import formatData from "../helpers/formatData";
import getStartDate from "../helpers/getStartDate";

const useFetch = (url) => {
  const [data, setData] = useLocalStorage("data", []);
  const [error, setError] = useState(null);
  const { param } = getStartDate(new Date());
  const storedDate = localStorage.getItem("date");
  const checkStrings = param.localeCompare(storedDate);

  useEffect(() => {
    const getData = async () => {
      try {
        if (checkStrings !== 0) {
          const response = await fetch(url);
          localStorage.setItem("date", param);

          if (response.status >= 200 && response.status <= 299) {
            const fetchedData = await response.json();
            const formattedData = formatData(fetchedData);
            setData(formattedData);
          } else {
            console.log(response.status, response.statusText);
          }
        }
      } catch (error) {
        setError(error);
      }
    };

    getData();
  }, [url, checkStrings, param, setData]);

  const getMoreData = async (url) => {
    try {
      const response = await fetch(url);

      if (response.status >= 200 && response.status <= 299) {
        const fetchedData = await response.json();
        const formattedData = formatData(fetchedData);
        setData(formattedData);
      } else {
        console.log(response.status, response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  return { data, setData, error, getMoreData };
};

export default useFetch;

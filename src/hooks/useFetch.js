import { useState, useEffect } from "react";

// Helpers
import getStartDate from "../helpers/getStartDate";

const API_KEY = "vpfxs1OC6eDlkX7dTgWIOefdmQ6R81WZ48g4LneR";
const BASE_URL = "https://api.nasa.gov/planetary/apod?api_key=";

const useFetch = () => {
  const [initialStartDate, initialStartDateString] = getStartDate(new Date());
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState([initialStartDate, initialStartDateString]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${BASE_URL}${API_KEY}&start_date=${initialStartDateString}`);

        if (response.status >= 200 && response.status <= 299) {
          const fetchedData = await response.json();
          setData(fetchedData.reverse());
          setStartDate((prevState) => {
            const [newStartDate, newStartDateString] = getStartDate(prevState[0]);
            return [newStartDate, newStartDateString];
          });
        } else {
          console.log(response.status, response.statusText);
        }
      } catch (e) {
        setError(e);
      }
    };

    getData();
  }, [initialStartDateString]);

  const getMoreData = async () => {
    try {
      const response = await fetch(`${BASE_URL}${API_KEY}&start_date=${startDate[1]}`);

      if (response.status >= 200 && response.status <= 299) {
        const fetchedData = await response.json();
        setData(fetchedData.reverse());
        setStartDate((prevState) => {
          const [newStartDate, newStartDateString] = getStartDate(prevState[0]);
          return [newStartDate, newStartDateString];
        });
      } else {
        console.log(response.status, response.statusText);
      }
    } catch (e) {
      setError(e);
    }
  };

  return { data, error, getMoreData };
};

export default useFetch;

import { useState, useEffect } from "react";

// Helpers
import getStartDate from "../helpers/getStartDate";
import formatData from "../helpers/formatData";

const API_KEY = "vpfxs1OC6eDlkX7dTgWIOefdmQ6R81WZ48g4LneR";
const BASE_URL = "https://api.nasa.gov/planetary/apod?api_key=";

const useFetch = () => {
  const { date, param } = getStartDate(new Date());
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState({ date, param });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${BASE_URL}${API_KEY}&start_date=${param}`);

        if (response.status >= 200 && response.status <= 299) {
          const fetchedData = await response.json();
          const formattedData = formatData(fetchedData);
          setData(formattedData.reverse());
          setStartDate((prevState) => {
            const { date, param } = getStartDate(prevState.date);
            return { date, param };
          });
        } else {
          console.log(response.status, response.statusText);
        }
      } catch (error) {
        setError(error);
      }
    };

    getData();
  }, [param]);

  const getMoreData = async () => {
    try {
      const response = await fetch(`${BASE_URL}${API_KEY}&start_date=${startDate.param}`);

      if (response.status >= 200 && response.status <= 299) {
        const fetchedData = await response.json();
        const formattedData = formatData(fetchedData);
        setData(formattedData.reverse());
        setStartDate((prevState) => {
          const { date, param } = getStartDate(prevState.date);
          return { date, param };
        });
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

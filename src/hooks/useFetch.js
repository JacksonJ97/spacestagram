import { useState, useEffect } from "react";

// Helpers
import getStartDate from "../helpers/getStartDate";
import formatData from "../helpers/formatData";

const API_KEY = "vpfxs1OC6eDlkX7dTgWIOefdmQ6R81WZ48g4LneR";
const BASE_URL = "https://api.nasa.gov/planetary/apod?api_key=";

const useFetch = () => {
  const [initialStartDate, initialStartDateParam] = getStartDate(new Date());
  const [newStartDate, newStartDateParam] = getStartDate(initialStartDate);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState([newStartDate, newStartDateParam]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}${API_KEY}&start_date=${initialStartDateParam}`);
        if (response.status >= 200 && response.status <= 299) {
          const fetchedData = await response.json();
          const formattedData = formatData(fetchedData);
          setData(formattedData.reverse());
        } else {
          console.log(response.status, response.statusText);
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [initialStartDateParam]);

  const getMoreData = async () => {
    try {
      const response = await fetch(`${BASE_URL}${API_KEY}&start_date=${startDate[1]}`);
      if (response.status >= 200 && response.status <= 299) {
        const fetchedData = await response.json();
        const formattedData = formatData(fetchedData);
        setData(formattedData.reverse());
        setStartDate((prevState) => {
          const [newStartDate, newStartDateParam] = getStartDate(prevState[0]);
          return [newStartDate, newStartDateParam];
        });
      } else {
        console.log(response.status, response.statusText);
      }
    } catch (e) {
      setError(e);
    }
  };

  return { data, loading, error, getMoreData };
};

export default useFetch;

import { useState, useEffect } from "react";

// Helpers
import getStartDate from "../helpers/getStartDate";

const API_KEY = "vpfxs1OC6eDlkX7dTgWIOefdmQ6R81WZ48g4LneR";
const BASE_URL = "https://api.nasa.gov/planetary/apod?api_key=";

const useFetch = () => {
  const [initialStartDate, initialStartDateParam] = getStartDate(new Date());
  const [newStartDate, newStartDateParam] = getStartDate(initialStartDate);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState([newStartDate, newStartDateParam]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}${API_KEY}&start_date=${initialStartDateParam}`);
        const data = await response.json();
        setData(data.reverse());
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [initialStartDateParam]);

  const getMoreData = async () => {
    try {
      const response = await fetch(`${BASE_URL}${API_KEY}&start_date=${startDate[1]}`);
      const data = await response.json();
      setData(data.reverse());
      setStartDate((prevState) => {
        const [newStartDate, newStartDateParam] = getStartDate(prevState[0]);
        return [newStartDate, newStartDateParam];
      });
    } catch (error) {
      setError(error);
    }
  };

  return { data, loading, error, getMoreData };
};

export default useFetch;

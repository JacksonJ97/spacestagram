import { useState, useEffect } from "react";

// Helpers
import getStartDate from "../helpers/getStartDate";

const API_KEY = "vpfxs1OC6eDlkX7dTgWIOefdmQ6R81WZ48g4LneR";
const BASE_URL = "https://api.nasa.gov/planetary/apod";

const useFetch = () => {
  const [initialStartDate, initialStartDateString] = getStartDate(new Date());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(initialStartDate);

  useEffect(() => {
    let controller = new AbortController();

    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&start_date=${initialStartDateString}`, { signal: controller.signal });
        const data = await response.json();
        setData(data.reverse());
      } catch (error) {
        if (controller.signal.abort) {
          console.log(error);
        }
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // getData();

    return () => controller.abort();
  }, [initialStartDateString]);

  const getMoreData = async () => {
    try {
      const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&start_date=2022-01-05`);
      const data = await response.json();
      setData(data.reverse());
    } catch (error) {
      setError(error);
    }
  };

  return { data, loading, error, getMoreData };
};

export default useFetch;

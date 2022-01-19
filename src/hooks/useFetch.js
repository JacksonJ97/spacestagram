import { useState, useEffect } from "react";

const API_KEY = "vpfxs1OC6eDlkX7dTgWIOefdmQ6R81WZ48g4LneR";
const BASE_URL = "https://api.nasa.gov/planetary/apod";

const useFetch = (startDate) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let controller = new AbortController();

    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&start_date=${startDate}`, { signal: controller.signal });
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

    getData();

    return () => controller.abort();
  }, [startDate]);

  const refetch = async (startDate) => {
    try {
      const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&start_date=${startDate}`);
      const data = await response.json();
      setData(data.reverse());
    } catch (error) {
      setError(error);
    }
  };

  return [data, loading, error, refetch];
};

export default useFetch;

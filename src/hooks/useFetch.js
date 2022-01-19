import { useState, useEffect } from "react";

const API_KEY = "vpfxs1OC6eDlkX7dTgWIOefdmQ6R81WZ48g4LneR";
const BASE_URL = "https://api.nasa.gov/planetary/apod";

const useFetch = (startDate) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&start_date=${startDate}`);
      const data = await response.json();
      setData(data.reverse());
    };

    setIsLoading(false);
    getData();
  }, [startDate]);

  return [data, isLoading];
};

export default useFetch;

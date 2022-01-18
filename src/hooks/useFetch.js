import { useState, useEffect } from "react";

const API_KEY = "vpfxs1OC6eDlkX7dTgWIOefdmQ6R81WZ48g4LneR";
const BASE_URL = "https://api.nasa.gov/planetary/apod";

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&start_date=2022-01-16`);
      const data = await response.json();
      setData(data.reverse());
    };

    setIsLoading(false);
    getData();
  }, []);

  return [data, isLoading];
};

export default useFetch;

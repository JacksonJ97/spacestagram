import { useState, useEffect } from "react";

const API_KEY = "vpfxs1OC6eDlkX7dTgWIOefdmQ6R81WZ48g4LneR";

const useFetch = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=2022-01-10`);
      const data = await response.json();
      setData(data);
    };

    getData();
  }, []);

  return [data];
};

export default useFetch;

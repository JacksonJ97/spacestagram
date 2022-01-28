import { useState, useEffect } from "react";

// Helpers
import formatData from "../helpers/formatData";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);

        if (response.status >= 200 && response.status <= 299) {
          const fetchedData = await response.json();
          const formattedData = formatData(fetchedData);
          setData(formattedData.reverse());
        } else {
          console.log(response.status, response.statusText);
        }
      } catch (error) {
        setError(error);
      }
    };

    getData();
  }, [url]);

  const getMoreData = async (url) => {
    try {
      const response = await fetch(url);

      if (response.status >= 200 && response.status <= 299) {
        const fetchedData = await response.json();
        const formattedData = formatData(fetchedData);
        setData(formattedData.reverse());
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

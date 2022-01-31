import { useState, useEffect } from "react";

// Hooks
import useLocalStorage from "./useLocalStorage";

// Helpers
import formatData from "../helpers/formatData";

const useFetch = (url, shouldFetch) => {
  const [data, setData] = useLocalStorage("data", []);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        if (shouldFetch) {
          const response = await fetch(url);
          if (response.status >= 200 && response.status <= 299) {
            const fetchedData = await response.json();
            const formattedData = formatData(fetchedData);
            setData(formattedData);
          } else {
            console.log(response.status, response.statusText);
          }
        }
      } catch (error) {
        setError(error);
      }
    };

    getData();
  }, [url, shouldFetch, setData]);

  const getMoreData = async (url) => {
    try {
      const response = await fetch(url);
      console.log("Fetched More");
      if (response.status >= 200 && response.status <= 299) {
        const fetchedData = await response.json();
        const formattedData = formatData(fetchedData);
        setData(formattedData);
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

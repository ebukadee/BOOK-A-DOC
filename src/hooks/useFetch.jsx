import { useEffect, useState } from "react";

const useFetch = (url, settings = {}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url, settings)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
    setLoading(false);
  }, []);

  return { data, loading, error };
};

export default useFetch;

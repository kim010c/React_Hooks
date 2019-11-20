import defaultAxios from "axios";
import { useState, useEffect } from "react";

const useAxios = (opts, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null
  });

  if (!opts.url) {
    return;
  }

  useEffect(() => {});
  return state;
};
export default useAxios;

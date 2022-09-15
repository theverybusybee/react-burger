import { baseUrl, checkResponce } from "./constants";

const fetchOrderDetails = (ingredients) => {

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  };

  return fetch(`${baseUrl}/orders`, requestOptions).then(checkResponce);
};

export default fetchOrderDetails;

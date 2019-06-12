import axios from "axios";

const BASE_URL = "http://shyndard.eu:8080/api";

export const fetchApi = async (method, url, token, args) => {
  const response = await axios({
    url: `${BASE_URL}/${url}`,
    method: method,
    headers: {
      authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8"
    },
    data: JSON.stringify(args)
  });
  if (!response) {
    throw new Error("Aucune réponse du serveur");
  }
  if (response.status >= 400) {
    throw new Error(response.statusText);
  }
  return response.data;
};

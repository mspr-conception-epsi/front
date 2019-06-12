const BASE_URL = "http://shyndard.eu:8080/api";

export const fetchApi = async (method, url, token, args) => {
  const response = await fetch(`${BASE_URL}/${url}`, {
    method: method,
    headers: {
      authorization: `Bearer ${token}`
    },
    data: JSON.stringify(args)
  });
  if (!response) {
    throw new Error("Aucune réponse du serveur");
  }
  if (response.status >= 400) {
    throw new Error(response.json());
  }
  return response.json();
};

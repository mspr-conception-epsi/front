const BASE_URL = "http://shyndard.eu:8080/api";

export const fetchApi = async (method, url, token, args) => {
  const response = await fetch(`${BASE_URL}/${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(args)
  });
  if (!response) {
    throw new Error("Aucune réponse du serveur");
  }
  if (response.status >= 400) {
    throw new Error(await response.json());
  }
  return response.json();
};

const BASE_URL = "http://shyndard.eu:8080/api";
// eslint-disable-next-line space-before-function-paren
export const fetchApi = async (method, url, token, args) => {
  const response = await fetch(`${BASE_URL}/${url}`, {
    method: method,
    headers: {
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(args)
  });
  if (!response) {
    throw new Error("Aucune réponse du serveur");
  }
  if (response.status >= 400) {
    throw new Error((await response.json()).error);
  }
  return response.json();
};

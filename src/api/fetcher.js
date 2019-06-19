const BASE_URL = "https://mspr-conception-back.ked.ovh/api";

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
    throw new Error(await (response ? response.json() : undefined));
  }
  return response.json();
};

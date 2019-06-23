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
  if (!response.ok) {
    throw new Error(
      `Erreur en contactant le serveur, statut ${response.status} : ${
        response.statusText
      }`
    );
  }
  if (
    response.headers.get("Content-Length") &&
    Number(response.headers.get("Content-Length")) <= 0
  ) {
    return;
  }
  try {
    return await response.json();
  } catch (err) {
    console.error("Error parsing JSON, returned nothing", err);
    return;
  }
};

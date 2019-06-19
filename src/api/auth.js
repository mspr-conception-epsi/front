const BASE_URL = "https://mspr-conception-back.ked.ovh/api";
// eslint-disable-next-line space-before-function-paren
export const auth = async (username, password) => {
  const credentials = window.btoa(
    unescape(encodeURIComponent(`${username}:${password}`))
  );
  const response = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: {
      authorization: `Basic ${credentials}`
    }
  });
  if (!response) {
    throw new Error("Aucune réponse du serveur");
  }
  if (response.status >= 400) {
    throw new Error(await (response ? response.json() : undefined));
  }
  return response.json();
};

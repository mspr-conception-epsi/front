const BASE_URL = "http://shyndard.eu:8080/api";
// eslint-disable-next-line space-before-function-paren
export const auth = async (username, password) => {
  const credentials = window.btoa(
    unescape(encodeURIComponent(`${username}:${password}`))
  );

  console.log(`Basic ${credentials}`);
  const response = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: {
      authorization: `Basic ${credentials}`
    }
  });
  if (!response) {
    throw new Error("Aucune réponse du serveur");
  }
  console.log("status", response.status);
  if (response.status >= 400) {
    throw new Error((await response.json()).error);
  }
  return response.json();
};

const BASE_URL = "http://shyndard.eu:8080/api";
// eslint-disable-next-line space-before-function-paren
export const fetch = async (url, token, args) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(args)
    });
    return response && response.body ? response.json() : "";
  } catch (err) {
    console.error(err);
  }
};

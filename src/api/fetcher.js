// eslint-disable-next-line space-before-function-paren
export const fetcher = async (url, token) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`
    },
    mode: "cors",
    cache: "default"
  });
  if (response.status >= 300 || response.status < 200) {
    console.error(`Error fetching ${url}`, response.statusText);
    return;
  }
  return response.headers.get("Content-Type") === "application/json"
    ? response.json()
    : response.text();
};

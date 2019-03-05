async function get(endpoint: string) {
  const response = await fetch(`http://localhost:5000/${endpoint}`);
  if (response.status >= 400) throw response;
  return response.json();
}

export { get };

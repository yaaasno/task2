export const fetchCommit = async () => {
  const url = 'http://localhost:3000/';
  const response = await fetch(url);

  const data = await response.json();
  return data;
}

fetchCommit();


// frontend/src/services/api.ts
const BASE_URL = 'http://127.0.0.1:8000';

export const fetchFromAPI = async (endpoint: string, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};